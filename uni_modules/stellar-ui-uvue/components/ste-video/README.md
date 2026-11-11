# Video 视频

基于原生 Video 进行增强封装的高性能视频播放组件，支持自定义悬浮控制栏、多清晰度无缝切换、0.5X ~ 1.5X 动态多倍速播放、全屏/退出全屏手势联动及静音控制。**uni-app x (UTS/UVUE)**。

---

## 使用示例

### 基础用法

- 属性 `src` 用于设置视频网络播放源地址。
- 属性 `title` 用于设置全屏时顶部标题栏展示的文本。

```html
<template>
    <ste-video
        title="精选产品演示视频"
        src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
    />
</template>
```

---

### 多清晰度切换

- 配置 `resolution` 数组后，在全屏模式下可通过右侧侧边栏进行清晰度选择；
- 切换清晰度时会自动记录当前播放时间点，实现无缝断点续播。

```html
<template>
    <ste-video
        title="多清晰度演示"
        :resolution="resolutionList"
        :muted="false"
    />
</template>

<script setup lang="uts">
    import { ref } from 'vue'
    import type { VideoResolution } from 'stellar-ui-uvue/components/ste-video/constants.uts'

    const resolutionList = ref<VideoResolution[]>([
        { text: '标清 480P', url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4' },
        { text: '高清 720P', url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4' },
        { text: '超清 1080P', url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4' },
    ])
</script>
```

---

### 自动播放与循环播放

- 属性 `autoplay` 设置是否自动开始播放（部分浏览器与平台受策略限制可能需要配合 `muted` 静音）。
- 属性 `loop` 设置是否在播放结束后自动循环重播。

```html
<template>
    <ste-video
        src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
        :autoplay="true"
        :loop="true"
        :muted="true"
    />
</template>
```

---

### Ref 实例方法调用

- 通过组件 Ref 可命令式调用 `play()`、`pause()`、`seek(position)`、`requestFullScreen()`、`exitFullScreen()`、`playbackRate(rate)` 等方法。

```html
<template>
    <view>
        <ste-video
            ref="videoRef"
            title="Ref 控制演示"
            src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
        />
        <view class="btn-group">
            <ste-button @click="handlePlay" :width="160">播放</ste-button>
            <ste-button @click="handlePause" :width="160" mode="error">暂停</ste-button>
            <ste-button @click="handleSeek10" :width="200">跳转到 10s</ste-button>
            <ste-button @click="handleSpeed15" :width="180">1.5X 倍速</ste-button>
        </view>
    </view>
</template>

<script setup lang="uts">
    import { ref } from 'vue'

    const videoRef = ref<SteVideoComponentPublicInstance | null>(null)

    function handlePlay() {
        videoRef.value?.play()
    }

    function handlePause() {
        videoRef.value?.pause()
    }

    function handleSeek10() {
        videoRef.value?.seek(10)
    }

    function handleSpeed15() {
        videoRef.value?.playbackRate(1.5)
    }
</script>
```

---

<!-- props -->

---
{{xuyajun}}
