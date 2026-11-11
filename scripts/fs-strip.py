#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""从 .uvue 的 <style> 块中移除指定选择器的 font-size 声明（改为 JS 侧内联下发）。

用法：
    python scripts/fs-strip.py <file.uvue> "sel1=font-size:32rpx" "sel2=font-size:24rpx"

第二个及之后的参数为 `<选择器>=<font-size 声明>`，选择器需与文件中的完全一致。
仅删除该规则块内完全匹配的 font-size 行，其余声明原样保留。
"""
import io
import re
import sys


def strip(path, pairs):
    src = io.open(path, encoding='utf-8').read()
    for item in pairs:
        sel, decl = item.split('=', 1)
        sel = sel.strip()
        decl = decl.strip()
        # 定位选择器规则块：<sel> {  ... }
        pat = re.compile(r'(^[ \t]*' + re.escape(sel) + r'\s*\{)([^}]*)(\})', re.M)
        m = pat.search(src)
        if m is None:
            print('  MISS selector %r' % sel)
            continue
        body = m.group(2)
        # 删除完全匹配的 font-size 行
        line_pat = re.compile(r'^[ \t]*' + re.escape(decl) + r'[ \t]*\r?\n', re.M)
        nb, n = line_pat.subn('', body)
        if n == 0:
            print('  MISS decl %r in %r' % (decl, sel))
            continue
        src = src[:m.start(2)] + nb + src[m.end(2):]
        print('  ok  %s <- %s' % (sel, decl))
    io.open(path, 'w', encoding='utf-8').write(src)


if __name__ == '__main__':
    strip(sys.argv[1], sys.argv[2:])
