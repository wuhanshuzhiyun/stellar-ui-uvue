# CouponList 券列表

`ste-coupon-list` 优惠券卡片组件常用于电商、生活服务与营销裂变场景中，展示限时抢购券、满减券、折扣券等卡片列表项。支持内置倒计时引擎、异步 Canvas 半圆环形抢购进度条、使用门槛、行动按钮以及底部规则列表。已全面支持 **uni-app x (UTS/UVUE)** 原生渲染。

---

## 基础用法 (uni-app x / UTS)

在 `uni-app x` 中，直接从 `stellar-ui-uvue/components/ste-coupon-list/constants.uts` 导入 `CouponData` 强类型接口：

```html
<template>
    <ste-coupon-list :data="couponData" @buttonClick="onUse" />
</template>

<script setup lang="uts">
import { ref } from 'vue';
import type { CouponData } from 'stellar-ui-uvue/components/ste-coupon-list/constants.uts';

const couponData = ref<CouponData>({
    title: '满11-5乐事组合【外卖】',
    desc: '截至日期 2025.11.30',
    image: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
    price: 500,
    constraint: '满11可用',
    footers: ['1、本券不可用于部分特惠商品、特殊商品及其他券看加使']
} as CouponData);

function onUse() {
    uni.showToast({ title: '去使用', icon: 'none' });
}
</script>
```

---

## 限时抢购倒计时

传入 `endTime` 属性即可自动驱动秒级递减倒计时，当倒计时结束时自动派发 `@countDown` 事件：

```html
<template>
    <ste-coupon-list :data="couponData" :endTime="endTime" />
</template>

<script setup lang="uts">
import { ref } from 'vue';
import type { CouponData } from 'stellar-ui-uvue/components/ste-coupon-list/constants.uts';

const couponData = ref<CouponData>({
    title: '生鲜特惠立减大额券',
    image: 'https://image.whzb.com/chain/StellarUI/image/img5.jfif',
    price: 29.9,
    constraint: '满99可用'
} as CouponData);

// 2小时后截止倒计时
const endTime = ref(Date.now() + 2 * 3600 * 1000);
</script>
```

---

## 半圆环形进度条

通过 `progress`（0 - 100）与 `progressText` 即可在右上角激活异步半圆环形抢购进度条：

```html
<template>
    <ste-coupon-list
        :data="couponData"
        :progress="70"
        progressText="已抢70%"
    />
</template>
```

---

## 按钮文案与禁用

通过 `buttonText` 可自定义按钮文字（如“立即抢购”、“去使用”），通过 `buttonDisabled` 控制禁用状态：

```html
<template>
    <ste-coupon-list
        :data="couponData"
        buttonText="已抢光"
        :buttonDisabled="true"
    />
</template>
```

---

## 自定义 Position 插槽

通过 `position` 插槽可在卡片右上角或特定位置自由堆叠贴纸、角标（如“售罄”印章）：

```html
<template>
    <ste-coupon-list :data="couponData">
        <template #position>
            <view class="position-slot">
                <ste-image src="https://image.whzb.com/chain/StellarUI/售罄.png" width="130" height="92" />
            </view>
        </template>
    </ste-coupon-list>
</template>

<style scoped>
.position-slot {
    position: absolute;
    top: 6rpx;
    right: 6rpx;
}
</style>
```

---

## 实现说明

| 功能特性 | 实现方式 | 说明 |
| :--- | :--- | :--- |
| **背景色渲染** | 内联样式 `:style="{ backgroundColor: ... }"` 直接绑定 | 动态颜色直出，避免变量解析失效 |
| **类型定义文件** | `constants.uts`（`CouponData`） | 统一从 `constants.uts` 绝对路径导入强类型 |
| **半圆环进度条绘制** | `uni.createCanvasContextAsync` 异步渲染上下文 | 采用官方标准异步渲染管线，保证渲染一致 |

---

<!-- props -->

## CouponData 数据结构

| 属性 | 说明 | 类型 | 必填 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| `title` | 优惠券主标题 | `string` | 是 | - |
| `image` | 优惠券左侧主图地址 | `string` | 是 | 支持网络 URL 与本地路径 |
| `price` | 券面金额或折扣额度 | `string \ | number` | 是 | 传递至 `ste-price` 渲染 |
| `desc` | 优惠券副标题描述 | `string` | 否 | 未设置倒计时时展示 |
| `constraint` | 使用门槛限制文本 | `string` | 否 | 如 `满100可用` |
| `footers` | 底部使用规则须知列表 | `string[]` | 否 | 逐行展示并带展开图标 |

---
{{xuyajun}}
