# ColumnChart 柱状图

柱状图主要用于表现不同类目间的数据对比，纵向立柱高度直观反映数值多寡。支持单列与多列并排对比、立柱微圆角自适应、入场向上拔高动效与数据数值标注。**uni-app x (UTS/UVUE)**。

---

## 代码演示

### 1. uni-app x (UTS/UVUE) 规范用法

在 uni-app x 环境下，通过内置纯 UTS 原生统一图表渲染引擎（StellarChartEngine）驱动，支持多序列并排柱状对比与圆角定制。

```html
<template>
	<view class="chart-box">
		<ste-column-chart
			:categories="categories"
			:series="seriesList"
			:extra="customColExtra"
			height="420"
		/>
	</view>
</template>

<script setup lang="uts">
const categories = ['北京', '上海', '广州', '深圳', '杭州'];

const seriesList: UTSJSONObject[] = [
	{
		name: '去年同期',
		data: [42, 58, 45, 60, 38],
		color: '#14C9C9'
	},
	{
		name: '今年业绩',
		data: [56, 72, 60, 80, 52],
		color: '#165DFF'
	}
];

// 定制立柱宽度与顶部圆角
const customColExtra: UTSJSONObject = {
	column: {
		width: 20,
		borderRadius: 6
	}
};
</script>
```

## 实现要点

- **底层渲染引擎**：纯 UTS 编写的自研 **StellarChartEngine**，零外部 JS 依赖，100% 静态类型安全
- **数据源格式 (`series`)**：**强类型 `UTSJSONObject[]`**<br/>每项为 `{ name: string, data: number[], color?: string }`
- **圆角立柱与排版**：引擎内置自适应间隙均分算法，顶部细腻圆角（`extra.column.borderRadius`）无锯齿
- **Canvas 模式与高分屏**：强制基于 **W3C 标准 Canvas 2D** 原生上下文，引擎自动通过 `uni.getWindowInfo().pixelRatio` 缩放抗锯齿
- **动画效果 (`animation`)**：内置高帧率 **二次缓出插值动效 (easeOutQuad)**，立柱自 X 轴基线向上平滑拔高
- **手势交互与十字准星**：触控滑动时自动进行 **Hit-test 最近分类维度吸附**，绘制半透明十字准星与防越界气泡卡片
- **图例控制 (`showLegend`)**：新增布尔属性直接控制显示与隐藏，自动排版换行并支持点击置灰重绘

---

<!-- props -->

---
{{xuyajun}}
