#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""检测「字号丢失」风险：<text> 使用了某 class，但该 class 在 <style> 中已无 font-size，
且元素本身没有 :style 绑定 —— 说明原本靠 CSS 的字号被移除后没有补上内联字号。

用法：
    python scripts/text-fs-audit.py [目录...]
"""
import io
import os
import re
import sys

# 注意：属性值里可能出现 ">"（如 progress >= 0），必须跳过引号内内容
TEXT_TAG = re.compile(r'<text\b(?:[^>"\']|"[^"]*"|\'[^\']*\')*>', re.S | re.I)
CLASS_ATTR = re.compile(r'\bclass\s*=\s*"([^"]*)"', re.I)
STYLE_BIND = re.compile(r':style\s*=|v-bind:style', re.I)
STYLE_BLOCK = re.compile(r'<style[^>]*>([\s\S]*?)</style>', re.I)
RULE = re.compile(r'([^{}]+)\{([^{}]*)\}')


def style_font_classes(css):
    """返回在 CSS 中声明了 font-size 的类名集合。"""
    hit = set()
    for m in RULE.finditer(css):
        sel, body = m.group(1), m.group(2)
        if 'font-size' not in body:
            continue
        for c in re.findall(r'\.([A-Za-z0-9_-]+)', sel):
            hit.add(c)
    return hit


def audit(path):
    src = io.open(path, encoding='utf-8').read()
    sb = STYLE_BLOCK.search(src)
    if sb is None:
        return []
    css = sb.group(1)
    with_fs = style_font_classes(css)

    tpl_end = sb.start()
    tpl = src[:tpl_end]
    out = []
    for tm in TEXT_TAG.finditer(tpl):
        tag = tm.group(0)
        cm = CLASS_ATTR.search(tag)
        if cm is None:
            continue
        classes = cm.group(1).split()
        if not classes:
            continue
        if STYLE_BIND.search(tag):
            continue
        if any(c in with_fs for c in classes):
            continue
        line = tpl.count('\n', 0, tm.start()) + 1
        out.append((line, classes, tag.replace('\n', ' ')[:70]))
    return out


def walk(target):
    if os.path.isfile(target):
        return [target]
    hits = []
    for root, _d, files in os.walk(target):
        for f in files:
            if f.endswith('.uvue'):
                hits.append(os.path.join(root, f))
    return hits


def main():
    targets = sys.argv[1:] or ['uni_modules/stellar-ui-uvue/components']
    files = []
    for t in targets:
        files.extend(walk(t))

    total = 0
    for f in sorted(files):
        res = audit(f)
        if not res:
            continue
        total += len(res)
        print('### %s' % f)
        for line, classes, snippet in res:
            print('  L%-5s %-40s %s' % (line, ' '.join(classes), snippet))
    print('\n共 %d 处无字号来源的 <text>（检查 %d 个文件）' % (total, len(files)))


if __name__ == '__main__':
    main()
