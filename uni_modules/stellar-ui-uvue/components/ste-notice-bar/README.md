# NoticeBar 公告栏

用于循环播放展示一组消息通知，支持水平无缝滚动与垂直平滑轮播。

---

## 代码演示

### 基础用法

通过 `list` 数组参数设置需要滚动的内容，默认水平滚动。

```html
<script setup lang="uts">
import { ref } from 'vue'

const list = ref<string[]>([
    '第一条：Stellar UI uvue 现已全面升级适配 uni-app x / UTS！',
    '第二条：高性能跨端组件库，支持 iOS、Android、H5 及各大小程序。',
    '第三条：提供丰富的主题定制与动画效果。'
])
</script>

<template>
    <ste-notice-bar :list="list"></ste-notice-bar>
</template>
```

### 自定义样式

- 通过 `color` 属性设置文字颜色，默认为 `#000000`。
- 通过 `background` 属性设置背景颜色或渐变色，默认为 `#ffffff`。
- 通过 `width` 属性设置宽度，默认为 `100%`。

```html
<script setup lang="uts">
import { ref } from 'vue'

const list = ref<string[]>([
    '重要通知：系统将于今晚 24:00 进行例行维护升级，请提前做好准备。',
    '温馨提示：如遇任何问题请联系客服中心。'
])
</script>

<template>
    <ste-notice-bar :list="list" background="#FFFBE8" color="#ED6A0C"></ste-notice-bar>
</template>
```

### 垂直滚动

通过 `direction="vertical"` 设置纵向轮播模式。

```html
<script setup lang="uts">
import { ref } from 'vue'

const list = ref<string[]>([
    '🔥 热门活动：新用户专享 8.8 折优惠券已到账！',
    '🎉 会员福利：本周五会员日全场双倍积分！',
    '📦 订单提醒：您有 1 个待收货包裹正在配送中。'
])
</script>

<template>
    <ste-notice-bar :list="list" direction="vertical"></ste-notice-bar>
</template>
```

### 滚动速率与翻滚速度

- `acrossSpeed`: 水平方向的滚动速率，单位 `px/s`，默认为 `50`。
- `verticalSpeed`: 垂直方向的翻滚动画时长，单位 `ms`，默认为 `500`。

```html
<script setup lang="uts">
import { ref } from 'vue'

const list1 = ref<string[]>(['水平高速滚动：Stellar UI uvue 超快动画响应与极致流畅体验！'])
const list2 = ref<string[]>(['垂直快速翻滚 1', '垂直快速翻滚 2', '垂直快速翻滚 3'])
</script>

<template>
    <ste-notice-bar :list="list1" :acrossSpeed="100"></ste-notice-bar>
    <ste-notice-bar :list="list2" direction="vertical" :verticalSpeed="300"></ste-notice-bar>
</template>
```

### 延时与停留时间

- `delay`: 首次启动延时时间（ms），默认为 `1000`。
- `standTime`: 垂直模式下每条消息停留时间（ms），默认为 `1000`。

```html
<script setup lang="uts">
import { ref } from 'vue'

const list = ref<string[]>(['停留 3 秒消息 1', '停留 3 秒消息 2', '停留 3 秒消息 3'])
</script>

<template>
    <ste-notice-bar :list="list" direction="vertical" :standTime="3000" :delay="500"></ste-notice-bar>
</template>
```

### 禁用滚动（静态展示）

通过 `scrollable="false"` 可禁用滚动，仅静态展示当前消息。

```html
<script setup lang="uts">
import { ref } from 'vue'

const list = ref<string[]>(['静态消息提示：当前网络连接已恢复正常。'])
</script>

<template>
    <ste-notice-bar :list="list" :scrollable="false"></ste-notice-bar>
</template>
```

### 关闭模式

通过 `closeMode` 属性启用右侧关闭按钮，点击时隐藏公告栏并触发 `close` 事件。

```html
<script setup lang="uts">
import { ref } from 'vue'

const list = ref<string[]>(['点击右侧关闭按钮可以关闭该通知栏。'])

function onClose(e: any) {
    console.log('通知栏已关闭', e)
}
</script>

<template>
    <ste-notice-bar :list="list" closeMode @close="onClose"></ste-notice-bar>
</template>
```

### 自定义插槽

通过 `leftIcon` 和 `rightIcon` 插槽自定义左右两侧图标或操作元素。

```html
<script setup lang="uts">
import { ref } from 'vue'

const list = ref<string[]>(['自定义左侧图标与右侧更多操作按钮。'])

function onMore() {
    console.log('点击更多')
}
</script>

<template>
    <ste-notice-bar :list="list">
        <template #leftIcon>
            <ste-icon code="&#xe682;" size="32" color="#1989FA"></ste-icon>
        </template>
        <template #rightIcon>
            <view @click="onMore">
                <ste-icon code="&#xe696;" size="32" color="#999999"></ste-icon>
            </view>
        </template>
    </ste-notice-bar>
</template>
```

---

<!-- props -->

---
{{xuyajun}}
