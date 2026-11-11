# NumberKeyboard 数字键盘

用于移动端数字、验证码、金额录入等场景的虚拟键盘组件，支持弹出层模式与页面内嵌展示。

---

## 代码演示

### 基础用法

- 通过 `v-model` 双向绑定输入的值。
- 通过 `v-model:show` 控制弹出式键盘的显隐。

```html
<template>
    <view class="test-input" @click="show1 = true">
        <text v-if="value1 !== ''">{{ value1 }}</text>
        <text v-else class="placeholder">点击弹出数字键盘</text>
    </view>
    <ste-number-keyboard v-model="value1" v-model:show="show1" />
</template>

<script setup lang="uts">
import { ref } from 'vue'

const value1 = ref('')
const show1 = ref(false)
</script>

<style scoped>
.test-input {
    height: 72rpx;
    line-height: 72rpx;
    background-color: #f5f5f5;
    padding: 0 20rpx;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
}
.placeholder {
    color: #999999;
    font-size: 28rpx;
}
</style>
```

### 3 列紧凑模式（隐藏右侧功能键）

设置 `:rightKeys="false"` 切换为经典 3 列九宫格紧凑布局。

```html
<template>
    <view class="test-input" @click="show2 = true">
        <text v-if="value2 !== ''">{{ value2 }}</text>
        <text v-else class="placeholder">3列紧凑九宫格键盘</text>
    </view>
    <ste-number-keyboard :rightKeys="false" v-model="value2" v-model:show="show2" />
</template>

<script setup lang="uts">
import { ref } from 'vue'

const value2 = ref('')
const show2 = ref(false)
</script>
```

### 自定义按键与最大长度

- `customKeys`: 自定义按键列表，如 `['.', '00']` 或 `['X']`。
- `maxlength`: 限制最大输入字符数。

```html
<template>
    <view class="test-input" @click="show3 = true">
        <text v-if="value3 !== ''">{{ value3 }}</text>
        <text v-else class="placeholder">自定义键点与双零 (最多6位)</text>
    </view>
    <ste-number-keyboard
        :customKeys="['.', '00']"
        :maxlength="6"
        v-model="value3"
        v-model:show="show3"
    />
</template>

<script setup lang="uts">
import { ref } from 'vue'

const value3 = ref('')
const show3 = ref(false)
</script>
```

### 随机键位乱序

设置 `:randomKeys="true"` 使数字按键随机打乱，提高安全性。

```html
<template>
    <view class="test-input" @click="show4 = true">
        <text v-if="value4 !== ''">{{ value4 }}</text>
        <text v-else class="placeholder">随机乱序键盘</text>
    </view>
    <ste-number-keyboard :randomKeys="true" v-model="value4" v-model:show="show4" />
</template>

<script setup lang="uts">
import { ref } from 'vue'

const value4 = ref('')
const show4 = ref(false)
</script>
```

### 自定义颜色与确定按钮文字

- `textColor`: 按键文字颜色。
- `confirmBg`: 确定按钮背景色。
- `confirmColor`: 确定按钮文字颜色。
- `confirmText`: 确定按钮文本。

```html
<template>
    <view class="test-input" @click="show5 = true">
        <text v-if="value5 !== ''">{{ value5 }}</text>
        <text v-else class="placeholder">自定义主题色键盘</text>
    </view>
    <ste-number-keyboard
        v-model="value5"
        v-model:show="show5"
        textColor="#0958d9"
        confirmBg="#00c250"
        confirmColor="#ffffff"
        confirmText="完成"
    />
</template>

<script setup lang="uts">
import { ref } from 'vue'

const value5 = ref('')
const show5 = ref(false)
</script>
```

### 页面内嵌模式 (mode="page")

设置 `mode="page"` 将键盘直接渲染于页面文档流中。

```html
<template>
    <view class="test-input">
        <text v-if="value6 !== ''">{{ value6 }}</text>
        <text v-else class="placeholder">页面内嵌模式</text>
    </view>
    <view style="margin-top: 20rpx;">
        <ste-number-keyboard mode="page" v-model="value6" />
    </view>
</template>

<script setup lang="uts">
import { ref } from 'vue'

const value6 = ref('')
</script>
```

### 多输入框联动

使用 `activeInputRef` 与 `inputValues` 实现一个键盘控制多个输入框。

```html
<template>
    <view class="test-input" @click="activeRef = 'amount'">
        <text>金额：{{ inputValues['amount'] }}</text>
    </view>
    <view class="test-input" style="margin-top: 16rpx;" @click="activeRef = 'code'">
        <text>验证码：{{ inputValues['code'] }}</text>
    </view>

    <view style="margin-top: 20rpx;">
        <ste-number-keyboard
            mode="page"
            :activeInputRef="activeRef"
            v-model:inputValues="inputValues"
        />
    </view>
</template>

<script setup lang="uts">
import { ref } from 'vue'

const activeRef = ref('amount')
const inputValues = ref<UTSJSONObject>({
    amount: '100',
    code: '8888',
} as UTSJSONObject)
</script>
```

---

<!-- props -->

---
{{xuyajun}}
