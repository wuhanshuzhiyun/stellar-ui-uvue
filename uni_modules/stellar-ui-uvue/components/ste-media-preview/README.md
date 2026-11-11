# MediaPreview 媒体预览

全屏多媒体预览组件，支持图片/视频轮播、双指中心缩放、单指拖拽漫游、双击定点放大。

---

- APP 兼容性说明
    - APP 对于视频预览只支持单个视频预览
    - 不支持视频图片混合预览
    - APP 预览多个媒体时，统一当作图片处理
    - 音频资源会被自动过滤，不参与预览轮播
- 平台差异说明
    - `showmenu` 长按菜单依赖微信小程序 `show-menu-by-longpress` 能力，仅微信小程序端生效
    - 双指缩放严格绕容器中心进行（缩放本身不产生位移），双指整体移动与单指拖拽负责平移，双击定点放大基于同一仿射模型，各端表现一致

## 代码演示

## 基础用法

- `show` 属性控制是否展示预览弹窗，支持 `v-model:show` 双向绑定
- `urls` 属性为要预览的媒体 URL 数组（支持图片与视频）

```html
<template>
    <ste-button @click="show = true">基础预览</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show" />
    </view>
</template>
<script lang="uts" setup>
    import { ref } from 'vue';
    const medias = ref<string[]>([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show = ref(false);
</script>
```

## 自动轮播

- `autoplay` 属性控制自动轮播间隔时间，单位为毫秒，为 `0` 时不轮播

```html
<template>
    <ste-button @click="show1 = true">自动轮播</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show1" :autoplay="3000" />
    </view>
</template>
<script lang="uts" setup>
    import { ref } from 'vue';
    const medias = ref<string[]>([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show1 = ref(false);
</script>
```

## 前后衔接循环播放

- `loop` 属性可开启前后衔接循环播放

```html
<template>
    <ste-button @click="show2 = true">前后衔接循环播放</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show2" loop />
    </view>
</template>

<script lang="uts" setup>
    import { ref } from 'vue';
    const medias = ref<string[]>([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show2 = ref(false);
</script>
```

## 默认展示下标为 2 的媒体资源

- `index` 属性可控制从第几页开始展示（原始 `urls` 下标，若列表含音频会被自动映射到过滤后的位置）

```html
<template>
    <ste-button @click="show3 = true">默认展示下标为2的媒体资源</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show3" :index="2" />
    </view>
</template>

<script lang="uts" setup>
    import { ref } from 'vue';
    const medias = ref<string[]>([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show3 = ref(false);
</script>
```

## 隐藏左下角索引标签

- `showIndex` 属性可控制左下角页签显示，默认显示

```html
<template>
    <ste-button @click="show4 = true">隐藏左下角索引标签</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show4" :showIndex="false" />
    </view>
</template>

<script lang="uts" setup>
    import { ref } from 'vue';
    const medias = ref<string[]>([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show4 = ref(false);
</script>
```

## 双指缩放

- `scale` 属性可开启双指缩放功能
- 开启后支持：双指中心缩放（0.8x ~ 4.5x，松手自动回弹）、双指整体移动平移、放大态单指拖拽漫游、双击定点放大/复位
- 缩放以容器中心为原点，尺寸变化不会导致图片位移；若手指落在黑边上捏合，图片也不会跑

```html
<template>
    <ste-button @click="show5 = true">双指缩放</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show5" scale />
    </view>
</template>

<script lang="uts" setup>
    import { ref } from 'vue';
    const medias = ref<string[]>([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show5 = ref(false);
</script>
```

## 长按触发事件

- 事件 `longpress` 在用户长按媒体项时触发（缩放手势进行中不会误触发）

```html
<template>
    <ste-button @click="show6 = true">长按触发事件</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show6" @longpress="onLongpress" />
    </view>
</template>
<script lang="uts" setup>
    import { ref } from 'vue';
    const medias = ref<string[]>([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show6 = ref(false);

    function onLongpress(index : number) {
        uni.showToast({
            title: '长按了第【' + (index + 1) + '】个媒体资源',
            icon: 'none',
        });
    }
</script>
```

## 关闭前/后事件

- 事件 `beforeClose` 在关闭前触发，`close` 在关闭后触发（仅通知，不支持拦截关闭流程）
- `index` 支持 `v-model:index` 双向绑定，实时同步当前页下标

```html
<template>
    <ste-button @click="show7 = true">关闭前/后事件</ste-button>
    <view style="width: 100%">
        <ste-media-preview :urls="medias" v-model:show="show7" @beforeClose="onBeforeClose" @close="onClose" />
    </view>
</template>

<script lang="uts" setup>
    import { ref } from 'vue';
    const medias = ref<string[]>([
        'https://image.whzb.com/chain/StellarUI/图片.jpg',
        'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
        'https://image.whzb.com/chain/StellarUI/验证码背景.png',
        'https://image.whzb.com/chain/StellarUI/bg4.jpg',
        'https://image.whzb.com/chain/StellarUI/横屏2.mp4',
    ]);
    const show7 = ref(false);

    function onBeforeClose() {
        console.log('关闭前');
    }
    function onClose() {
        uni.showToast({
            title: '弹窗关闭了',
            icon: 'none',
        });
    }
</script>
```

## 自定义底部插槽

- 默认插槽内容展示在预览层底部居中位置，可用于点赞、收藏、下载等自定义操作

```html
<template>
    <ste-media-preview :urls="medias" v-model:show="show8">
        <view class="slot-btn" @click="onSave">
            <text class="slot-btn-text">保存原图</text>
        </view>
    </ste-media-preview>
</template>
```

---

<!-- props -->

---
{{xuyajun}}
