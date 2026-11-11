# ScrollTo 滚动锚点

滚动锚点组件，支持通过改变下标自动定位平滑滚动到指定锚点区域，并在用户滚动时反向联动高亮。

---

## 基础用法

```html
<template>
	<view class="scroll-to-demo">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view
				v-for="(title, index) in tabTitles"
				:key="index"
				:class="['nav-item', activeTab == index ? 'nav-item-active' : '']"
				@click="activeTab = index"
			>
				<text :class="['nav-text', activeTab == index ? 'nav-text-active' : '']">{{ title }}</text>
			</view>
		</view>

		<!-- 滚动锚点容器 -->
		<ste-scroll-to v-model:active="activeTab" height="800rpx">
			<ste-scroll-to-item v-for="(item, index) in sections" :key="index">
				<view class="section-card">
					<text class="section-title">{{ item.title }}</text>
					<text class="section-desc">{{ item.desc }}</text>
				</view>
			</ste-scroll-to-item>
		</ste-scroll-to>
	</view>
</template>

<script setup lang="uts">
	import { ref } from 'vue'

	type SectionData = {
		title : string
		desc : string
	}

	const activeTab = ref(0)
	const tabTitles = ref<Array<string>>(['概览', '特性', '规格', '评论', '常见问题'])
	const sections = ref<Array<SectionData>>([
		{ title: '概览介绍', desc: '这里是商品或内容的整体概览说明...' },
		{ title: '核心特性', desc: '具备卓越的高性能原生渲染与平滑滚动体验...' },
		{ title: '详细规格', desc: '产品尺寸、参数及环境兼容指标...' },
		{ title: '用户评论', desc: '来自真实用户的高分好评与反馈记录...' },
		{ title: '常见问题', desc: '解答关于购买、退换和质保的相关疑问...' }
	])
</script>

<style scoped>
	.scroll-to-demo {
		width: 100%;
	}
	.nav-bar {
		flex-direction: row;
		background-color: #ffffff;
		border-bottom: 1px solid #eeeeee;
	}
	.nav-item {
		flex: 1;
		align-items: center;
		padding: 20rpx 0;
	}
	.nav-item-active {
		border-bottom: 2px solid #1890ff;
	}
	.nav-text {
		font-size: 28rpx;
		color: #666666;
	}
	.nav-text-active {
		color: #1890ff;
		font-weight: bold;
	}
	.section-card {
		padding: 40rpx 30rpx;
		margin-bottom: 20rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
	}
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 16rpx;
	}
	.section-desc {
		font-size: 28rpx;
		color: #666666;
	}
</style>
```

---

<!-- props -->

<!-- ste-scroll-to-item/props -->

---
{{xuyajun}}
