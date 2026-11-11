# Swiper 轮播组件

轮播组件，基于原生轮播引擎进行现代封装，具备卓越的原生高刷滑动体验、首尾无缝循环与优雅胶囊指示器。

---

## 代码演示

### 基础用法

外层使用 `ste-swiper` 父标签包裹，内层使用 `ste-swiper-item` 子标签描述每一项。

```html
<template>
	<view class="demo-box">
		<ste-swiper v-model:current="current" :indicatorDots="true">
			<ste-swiper-item v-for="(item, index) in bannerList" :key="index">
				<view class="swiper-card" :style="{ backgroundColor: item.bg }">
					<text class="swiper-card-text">{{ item.title }}</text>
				</view>
			</ste-swiper-item>
		</ste-swiper>
	</view>
</template>

<script setup lang="uts">
	import { ref } from 'vue'

	type BannerItem = {
		title : string
		bg : string
	}

	const current = ref(0)
	const bannerList = ref<Array<BannerItem>>([
		{ title: '横幅 1', bg: '#1890ff' },
		{ title: '横幅 2', bg: '#00c250' },
		{ title: '横幅 3', bg: '#faad14' },
		{ title: '横幅 4', bg: '#e02020' }
	])
</script>

<style scoped>
	.demo-box {
		width: 100%;
		height: 320rpx;
	}
	.swiper-card {
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		border-radius: 16rpx;
	}
	.swiper-card-text {
		color: #ffffff;
		font-size: 32rpx;
		font-weight: bold;
	}
</style>
```

### 纵向垂直轮播

设置 `direction="vertical"`，可实现文字公告栏或垂直翻页效果。

```html
<template>
	<view class="vertical-box">
		<ste-swiper direction="vertical" :autoplay="true" :circular="true" height="120rpx">
			<ste-swiper-item v-for="(text, index) in noticeList" :key="index">
				<view class="notice-card">
					<text class="notice-text">🔔 {{ text }}</text>
				</view>
			</ste-swiper-item>
		</ste-swiper>
	</view>
</template>

<script setup lang="uts">
	import { ref } from 'vue'

	const noticeList = ref<Array<string>>([
		'恭喜用户 138****8888 获得特等免单大奖！',
		'年中大促火热进行中，全场满 300 减 50',
		'Stellar UI uvue 原生轮播引擎全面适配发布'
	])
</script>

<style scoped>
	.vertical-box {
		width: 100%;
		height: 120rpx;
	}
	.notice-card {
		width: 100%;
		height: 100%;
		justify-content: center;
		padding: 0 24rpx;
		background-color: #fffbe6;
		border-radius: 12rpx;
	}
	.notice-text {
		color: #d48806;
		font-size: 26rpx;
	}
</style>
```

### 首尾循环与自动轮播

通过 `autoplay` 开启自动播放，`circular` 开启首尾无缝循环衔接，`interval` 控制切换间隔（毫秒）。

```html
<template>
	<ste-swiper :autoplay="true" :circular="true" :interval="2500" :indicatorDots="true" height="320rpx">
		<ste-swiper-item v-for="(item, index) in bannerList" :key="index">
			<view class="swiper-card" :style="{ backgroundColor: item.bg }">
				<text class="swiper-card-text">{{ item.title }}</text>
			</view>
		</ste-swiper-item>
	</ste-swiper>
</template>
```

### 自定义指示器样式与圆角卡片

支持自定义指示器的未激活颜色 `indicatorColor`、激活颜色 `indicatorActiveColor`，并结合子项轻松实现圆角卡片轮播风格。

```html
<template>
	<ste-swiper
		:circular="true"
		:autoplay="true"
		:indicatorDots="true"
		indicatorActiveColor="#ff4d4f"
		indicatorColor="rgba(255, 255, 255, 0.6)"
		height="320rpx"
	>
		<ste-swiper-item v-for="(item, index) in bannerList" :key="index">
			<view class="swiper-card" :style="{ backgroundColor: item.bg }">
				<text class="swiper-card-text">{{ item.title }}</text>
			</view>
		</ste-swiper-item>
	</ste-swiper>
</template>
```

> **说明**：
> `previousMargin`（前边距）、`nextMargin`（后边距）以及 `highlightActive`（卡片突出模式）暂未开放，待官方底层支持后开启，因此本组件的属性文档中未列出这三项。

---

<!-- props -->

<!-- ste-swiper-item/props -->

---
{{xuyajun}}
