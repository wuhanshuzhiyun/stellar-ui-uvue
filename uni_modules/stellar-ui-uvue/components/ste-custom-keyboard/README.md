# CustomKeyboard 定制键盘

`ste-custom-keyboard` 定制键盘组件是在基础数字键盘之上的高级业务封装，适用于移动支付、收银结账、会员打折与实名认证（身份证输入）等高频业务场景。原生支持数字键盘、身份证键盘（带 X 键）、折扣键盘（横向折扣胶囊快捷栏）以及安全防窥乱序键盘。已全面支持 **uni-app x (UTS/UVUE)** 原生渲染。

---

## 基础数字键盘 (uni-app x / UTS)

直接从 `stellar-ui-uvue/components/ste-custom-keyboard/constants.uts` 导入类型：

```html
<template>
    <view class="input-display" @click="show = true">
        <text class="input-text">{{ value ? value : '点击唤起数字键盘' }}</text>
    </view>
    <ste-custom-keyboard
        v-model="value"
        v-model:show="show"
        :custom-keys="['.']"
    />
</template>

<script setup lang="uts">
import { ref } from 'vue';

const value = ref('');
const show = ref(false);
</script>

<style scoped>
.input-display {
    height: 80rpx;
    background-color: #f5f5f5;
    border-radius: 12rpx;
    padding: 0 24rpx;
    justify-content: center;
}
.input-text {
    font-size: 30rpx;
    color: #1f2329;
}
</style>
```

---

## 身份证键盘

设置 `type="idcard"`，键盘将自动在左下角补齐 `'X'` 字母按键，并将弹窗标题默认切换为“身份证键盘”：

```html
<template>
    <view class="input-display" @click="showIdCard = true">
        <text class="input-text">{{ idCardVal ? idCardVal : '请输入身份证号' }}</text>
    </view>
    <ste-custom-keyboard
        type="idcard"
        v-model="idCardVal"
        v-model:show="showIdCard"
        :maxlength="18"
    />
</template>

<script setup lang="uts">
import { ref } from 'vue';

const idCardVal = ref('');
const showIdCard = ref(false);
</script>
```

---

## 折扣快捷键盘

设置 `type="discount"`，并通过 `discounts` 传入折扣预设数组（如 `[70, 75, 80, 85, 90]` 对应 7折、7.5折、8折等），键盘正上方将展示横向快捷胶囊标签，点击胶囊可直接填入折扣率并触发 `@click-discount`：

```html
<template>
    <view class="input-display" @click="showDiscount = true">
        <text class="input-text">{{ discountVal ? `${discountVal}折` : '请选择或输入折扣' }}</text>
    </view>
    <ste-custom-keyboard
        type="discount"
        v-model="discountVal"
        v-model:show="showDiscount"
        :discounts="[70, 75, 80, 85, 90]"
        @click-discount="onDiscountClick"
    />
</template>

<script setup lang="uts">
import { ref } from 'vue';

const discountVal = ref('');
const showDiscount = ref(false);

function onDiscountClick(text: string) {
    uni.showToast({ title: '选择折扣: ' + text, icon: 'none' });
}
</script>
```

---

## 文档流内嵌与安全防窥模式

设置 `mode="page"` 可将键盘嵌入页面文档流中常驻展示；配置 `randomKeys="true"` 可将数字按键随机打乱，防止偷窥与按键位置记忆：

```html
<template>
    <ste-custom-keyboard
        mode="page"
        v-model="safeVal"
        :random-keys="true"
        :right-keys="true"
    />
</template>

<script setup lang="uts">
import { ref } from 'vue';

const safeVal = ref('');
</script>
```

---

## 实现说明

| 功能特性 | 实现方式 | 说明 |
| :--- | :--- | :--- |
| **底层组件架构** | 基于 `ste-number-keyboard.uvue` 网格引擎组合 | 复用原生组件，运行效率更高 |
| **类型定义文件** | `constants.uts`（`CustomKeyboardProps`） | 统一从 `constants.uts` 导出强类型契约 |
| **折扣胶囊渲染** | `<template #header>` 插槽 + 内联样式 | 用内联样式渲染，规避动态变量解析问题 |

---

<!-- props -->

## DiscountItem 数据结构

| 属性 | 说明 | 类型 | 示例 |
| :--- | :--- | :--- | :--- |
| `n` | 整数折扣数值 | `number` | 如 `75` 解析为 `7` |
| `d` | 小数折扣数值 | `number` | 如 `75` 解析为 `5`，`70` 为 `0` |
| `v` | 原始折算值 | `number` | 如 `75` |
| `text` | 格式化折扣文本 | `string` | 如 `'7.5折'` 或 `'7折'` |

---
{{xuyajun}}
