# QRCode 二维码

能够将文本或 URL 转换生成高质量二维码的组件，支持自定义尺寸、前景色/背景色配色以及中心 Logo 图标叠加。

---

## 代码演示

### 基础用法

通过 `content` 属性传入需要编码的内容或链接。

```html
<template>
    <ste-qrcode content="https://stellar-ui.intecloud.com.cn/" />
</template>
```

### 自定义尺寸

通过 `size` 属性设置二维码大小（默认为 `200` px）。

```html
<template>
    <ste-qrcode content="https://stellar-ui.intecloud.com.cn/" :size="150" />
</template>
```

### 自定义前景色与背景色

- `foreground`: 二维码前景色（默认 `#000000`）。
- `background`: 二维码背景色（默认 `#ffffff`）。

```html
<template>
    <ste-qrcode
        content="https://stellar-ui.intecloud.com.cn/"
        foreground="#1890ff"
        background="#f0f7ff"
    />
</template>
```

### 带有中心 Logo 图标

通过 `foregroundImageSrc` 指定中心 Logo 图片链接，支持通过 `foregroundImageWidth` 和 `foregroundImageHeight` 自定义尺寸。

```html
<template>
    <ste-qrcode
        content="https://stellar-ui.intecloud.com.cn/"
        foregroundImageSrc="https://image.whzb.com/chain/StellarUI/logo.png"
    />
</template>
```

---

<!-- props -->

---
{{xuyajun}}
