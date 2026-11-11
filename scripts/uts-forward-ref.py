#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""UTS 前向引用检查（uni-app x 无函数声明提升）。

对 .uvue / .uts 文件，收集 <script setup lang="uts"> 内顶层声明的标识符及其位置，
再逐块扫描其中的标识符使用；若引用了「在同文件中位置更靠后」的顶层声明，则报错。

UTS 只做词法顺序判定：即使引用位于惰性执行的闭包内（computed / 函数体），
只要声明出现在其后，编译器同样报「找不到名称 XXX」。

用法：
    python scripts/uts-forward-ref.py [文件或目录...]
"""
import io
import os
import re
import sys

DECL = re.compile(
    r'^(?:[ \t]*)'
    r'(?:const|let|var)\s+([A-Za-z_][A-Za-z0-9_]*)'
    r'|^(?:[ \t]*)function\s+([A-Za-z_][A-Za-z0-9_]*)',
    re.M,
)

IDENT = re.compile(r'\b[A-Za-z_][A-Za-z0-9_]*\b')

# 不参与判定的常见全局名（避免噪声）
SKIP = {
    'uni', 'console', 'Math', 'Date', 'JSON', 'Object', 'Array', 'String',
    'Number', 'Boolean', 'Promise', 'RegExp', 'Error', 'Map', 'Set', 'Any',
    'UTSJSONObject', 'UTSJSONArray', 'setTimeout', 'clearTimeout', 'parseInt',
    'parseFloat', 'isNaN', 'typeof', 'if', 'else', 'return', 'const', 'let',
    'var', 'function', 'new', 'this', 'null', 'undefined', 'true', 'false',
    'try', 'catch', 'finally', 'for', 'while', 'do', 'switch', 'case',
    'break', 'continue', 'throw', 'await', 'async', 'import', 'from', 'export',
    'default', 'type', 'interface', 'class', 'extends', 'implements', 'void',
}

SCRIPT_OPEN = re.compile(r'<script[^>]*lang="uts"[^>]*>', re.I)



def blank_out(text):
    """把字符串字面量与注释替换为等长空白，避免其中的标识符被误判。"""
    out = list(text)
    i, n = 0, len(text)
    while i < n:
        ch = text[i]
        # 行注释
        if ch == '/' and i + 1 < n and text[i + 1] == '/':
            while i < n and text[i] != '\n':
                out[i] = ' '
                i += 1
            continue
        # 块注释
        if ch == '/' and i + 1 < n and text[i + 1] == '*':
            while i < n and not (text[i] == '*' and i + 1 < n and text[i + 1] == '/'):
                if text[i] != '\n':
                    out[i] = ' '
                i += 1
            if i < n:
                out[i] = ' '
                if i + 1 < n:
                    out[i + 1] = ' '
                i += 2
            continue
        if ch in ('"', "'", '`'):
            quote = ch
            out[i] = ' '
            i += 1
            while i < n:
                if text[i] == '\\':
                    out[i] = ' '
                    if i + 1 < n:
                        out[i + 1] = ' '
                    i += 2
                    continue
                if text[i] == quote:
                    out[i] = ' '
                    i += 1
                    break
                if text[i] != '\n':
                    out[i] = ' '
                i += 1
            continue
        i += 1
    return ''.join(out)



def script_body(src):
    m = SCRIPT_OPEN.search(src)
    if m is None:
        return None, 0
    end = src.find('</script>', m.end())
    if end < 0:
        return None, 0
    return src[m.end():end], m.end()


def check_file(path):
    src = io.open(path, encoding='utf-8').read()
    body, offset = script_body(src)
    if body is None:
        return []

    decls = {}
    spans = []
    raw = []
    for m in DECL.finditer(body):
        name = m.group(1) or m.group(2)
        matched = m.group(0)
        start = m.start() + (len(matched) - len(matched.lstrip()))
        indent = len(matched) - len(matched.lstrip())
        raw.append((name, start, indent))

    if not raw:
        return []

    # 只保留最外层（最小缩进）的声明，忽略函数体 / 对象内部声明
    min_indent = min(r[2] for r in raw)
    for name, start, indent in raw:
        if indent != min_indent:
            continue
        decls.setdefault(name, start)
        spans.append((name, start))

    # 为每个声明划出「到下一个声明之前」的文本范围
    order = sorted(spans, key=lambda x: x[1])
    problems = []
    for idx, (name, start) in enumerate(order):
        stop = order[idx + 1][1] if idx + 1 < len(order) else len(body)
        chunk = body[start:stop]
        scan = blank_out(chunk)
        for im in IDENT.finditer(scan):
            ident = im.group(0)
            if ident in SKIP or ident == name:
                continue
            # 跳过成员访问（a.b 中的 b）与对象字面量键（k: v 中的 k）
            before = chunk[:im.start()].rstrip()
            if before.endswith('.'):
                continue
            after = chunk[im.end():].lstrip()
            if after.startswith(':') and (before.endswith('{') or before.endswith(',')):
                continue
            later = decls.get(ident)
            if later is not None and later > start:
                line = body.count('\n', 0, start + im.start()) + 1
                # 换算到整文件行号
                base = offset + start + im.start()
                fline = src.count('\n', 0, base) + 1
                problems.append(
                    (fline, name, ident, body.count('\n', 0, later) + src.count('\n', 0, offset) + 1)
                )
    # 去重
    seen = set()
    out = []
    for p in problems:
        key = (p[0], p[2])
        if key in seen:
            continue
        seen.add(key)
        out.append(p)
    return out


def walk(target):
    if os.path.isfile(target):
        return [target]
    hits = []
    for root, _dirs, files in os.walk(target):
        for f in files:
            if f.endswith('.uvue') or f.endswith('.uts'):
                hits.append(os.path.join(root, f))
    return hits


def main():
    targets = sys.argv[1:] or ['uni_modules/stellar-ui-uvue/components']
    files = []
    for t in targets:
        files.extend(walk(t))

    total = 0
    for f in sorted(files):
        probs = check_file(f)
        if not probs:
            continue
        total += len(probs)
        print('### %s' % f)
        for fline, holder, ident, dline in probs:
            print('  L%-5s 在 `%s` 中引用 `%s`（后者声明于 L%s）' % (fline, holder, ident, dline))
    print('\n共 %d 处疑似前向引用（检查 %d 个文件）' % (total, len(files)))


if __name__ == '__main__':
    main()
