# ReadMore 展开更多

该组件用于长图文内容预先折叠收起一部分，并在底部叠加渐变遮罩，点击展开全部内容。

---

## 代码演示

### 基础用法

通过包裹需要折叠的内容，当内容超出默认高度（`400rpx`）时自动折叠。

```html
<template>
    <view class="content-wrapper">
        <ste-read-more>
            <text class="text-block">{{ longText }}</text>
        </ste-read-more>
    </view>
</template>

<script setup lang="uts">
import { ref } from 'vue'

const longText = ref(
    '浔阳江头夜送客，枫叶荻花秋瑟瑟。主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。忽闻水上琵琶声，主人忘归客不发。寻声暗问弹者谁，琵琶声停欲语迟。移船相近邀相见，添酒回灯重开宴。千呼万唤始出来，犹抱琵琶半遮面。'
)
</script>
```

### 展开后显示收起按钮

设置 `toggle` 为 `true`，展开后会保留“收起”按钮供用户折叠内容。

```html
<template>
    <view class="content-wrapper">
        <ste-read-more :toggle="true">
            <text class="text-block">{{ longText }}</text>
        </ste-read-more>
    </view>
</template>
```

### 自定义折叠高度与文案配色

- `showHeight`: 自定义折叠展示高度（如 `260` 表示 `260rpx`）。
- `closeText`: 展开按钮文案。
- `openText`: 收起按钮文案。
- `color`: 按钮文字与图标颜色。
- `fontSize`: 按钮字号大小。

```html
<template>
    <view class="content-wrapper">
        <ste-read-more
            :showHeight="260"
            :toggle="true"
            closeText="查看完整诗词"
            openText="折叠内容"
            color="#1890ff"
            :fontSize="30"
        >
            <text class="text-block">{{ longText }}</text>
        </ste-read-more>
    </view>
</template>
```

### 异步数据加载与 init 方法

当展示内容由网络异步请求返回时，可在数据赋值后调用 `init()` 方法重新触发高度测量与折叠计算。

```html
<template>
    <view class="content-wrapper">
        <ste-read-more ref="readMoreRef" :toggle="true">
            <text class="text-block">{{ asyncText }}</text>
        </ste-read-more>
    </view>
</template>

<script setup lang="uts">
import { ref, onMounted, nextTick } from 'vue'

const asyncText = ref('')
const readMoreRef = ref<ComponentPublicInstance | null>(null)

onMounted(() => {
    setTimeout(() => {
        asyncText.value = '异步加载的大段内容...'
        nextTick(() => {
            if (readMoreRef.value != null) {
                // 调用 init 方法重新测量
                (readMoreRef.value as any).init()
            }
        })
    }, 1000)
})
</script>
```

---

<!-- props -->

---
{{xuyajun}}
