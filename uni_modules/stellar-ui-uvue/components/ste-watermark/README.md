# Watermark 水印

采用原生轻量 VDOM 网格平铺引擎的高性能水印组件，支持全屏视口覆盖（滚动锁屏）、局部容器内平铺、多行文本换行、图片水印及自定义旋转角度与字体样式。同时具备原生级 `pointer-events: none` 事件穿透保障。完整适配 **uni-app x (UTS/UVUE)** 架构。

---

## 使用示例

### 基础用法 (全屏水印与点击穿透验证)

- 默认水印会覆盖整个视窗 (`fullPage: true`)，随页面上下滚动保持固定锁定；
- 原生点击穿透保障底层所有按钮、输入框及手势交互 100% 顺畅响应。

```html
<template>
    <view>
        <!-- 全屏水印 -->
        <ste-watermark
            v-if="showWatermark"
            content="Stellar UI uvue"
            :fullPage="true"
        />

        <ste-button @click="toggleWatermark">
            {{ showWatermark ? '关闭水印' : '开启水印' }}
        </ste-button>
        <ste-button @click="handleClick">点击测试 ({{ count }})</ste-button>
    </view>
</template>

<script setup lang="uts">
    import { ref } from 'vue'

    const showWatermark = ref<boolean>(true)
    const count = ref<number>(0)

    function toggleWatermark() {
        showWatermark.value = !showWatermark.value
    }

    function handleClick() {
        count.value++
    }
</script>
```

---

### 局部多行文本水印

- 设置 `:fullPage="false"` 可将水印范围限定在指定的宿主容器内（宿主容器需设置 `position: relative` 与 `overflow: hidden`）；
- 属性 `content` 传入字符串数组可实现多行居中排版。

```html
<template>
    <view class="card-container">
        <!-- 局部多行水印 -->
        <ste-watermark
            :fullPage="false"
            :content="['Stellar UI uvue', 'Confidential 绝密', '2025-09-04']"
            :width="150"
            :height="80"
        />
        <view class="card-content">
            <text class="card-title">保密合同信息</text>
            <text class="card-desc">仅在当前卡片容器内部展示多行水印，不会溢出到卡片外部。</text>
        </view>
    </view>
</template>

<style>
    .card-container {
        position: relative;
        overflow: hidden;
        min-height: 260rpx;
        padding: 24rpx;
        background-color: #ffffff;
        border-radius: 16rpx;
    }
</style>
```

---

### 图片水印

- 通过 `image` 属性指定图片地址，可通过 `imageWidth` 与 `imageHeight` 自定义图片显示尺寸。

```html
<template>
    <view class="card-container">
        <ste-watermark
            :fullPage="false"
            image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
            :imageWidth="64"
            :imageHeight="64"
            :width="120"
            :height="100"
        />
        <text>品牌徽标图片水印区域</text>
    </view>
</template>
```

---

### 自定义旋转角度、间距与字体主题

- 通过 `rotate` 自定义旋转角度（如 `35` 度）；
- 通过 `gapX` 与 `gapY` 控制水印之间的横向与纵向间距；
- 通过 `font` 对象自定义水印文字颜色、字号与粗细。

```html
<template>
    <view class="card-container">
        <ste-watermark
            :fullPage="false"
            content="ST-DESIGN"
            :rotate="35"
            :gapX="30"
            :gapY="30"
            :font="customFont"
        />
        <text>高亮科技蓝主题水印</text>
    </view>
</template>

<script setup lang="uts">
    import type { WatermarkFont } from 'stellar-ui-uvue/components/ste-watermark/types.uts'

    const customFont: WatermarkFont = {
        color: 'rgba(24, 144, 255, 0.28)',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontFamily: 'sans-serif',
        textAlign: 'center'
    }
</script>
```

---

<!-- props -->

---
{{xuyajun}}
