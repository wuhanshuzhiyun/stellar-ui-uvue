# LineChart 折线图

折线图主要用来展示数据项随着时间推移的趋势或变化。支持直线折线、三次贝塞尔平滑曲线 (curve)、入场补间动画与触控十字吸附准星。**uni-app x (UTS/UVUE)**。

---

## 代码演示

### 1. uni-app x (UTS/UVUE) 规范用法

在 uni-app x 环境下，通过内置纯 UTS 原生统一图表渲染引擎（StellarChartEngine）驱动，支持多序列对比、贝塞尔平滑曲线与触摸十字准星吸附。

```html
<template>
	<view class="chart-box">
		<ste-line-chart
			:categories="categories"
			:series="seriesList"
			:extra="curveExtra"
			height="420"
		/>
	</view>
</template>

<script setup lang="uts">
const categories = ['2019', '2020', '2021', '2022', '2023'];

const seriesList: UTSJSONObject[] = [
	{
		name: '目标值',
		data: [35, 45, 52, 60, 78],
		color: '#165DFF'
	},
	{
		name: '完成值',
		data: [30, 48, 46, 65, 85],
		color: '#14C9C9'
	}
];

// 平滑曲线配置
const curveExtra: UTSJSONObject = {
	line: {
		type: 'curve',
		width: 3
	}
};
</script>
```

## 实现要点

- **底层渲染引擎**：纯 UTS 编写的自研 **StellarChartEngine**，零外部 JS 依赖，100% 静态类型安全
- **数据源格式 (`series`)**：**强类型 `UTSJSONObject[]`**<br/>每项为 `{ name: string, data: number[], color?: string }`
- **平滑曲线算法 (`extra.line`)**：纯原生 **三次贝塞尔平滑插值 (Cubic Bezier Smoothing)**，曲率自然柔和
- **Canvas 模式与高分屏**：强制基于 **W3C 标准 Canvas 2D** 原生上下文，引擎自动通过 `uni.getWindowInfo().pixelRatio` 缩放抗锯齿
- **动画效果 (`animation`)**：内置高帧率 **二次缓出插值动效 (easeOutQuad)**，线条从 X 轴基线向上平滑展开
- **手势交互与十字准星**：触控滑动时自动进行 **Hit-test 最近分类维度吸附**，绘制半透明十字准星与防越界气泡卡片
- **图例控制 (`showLegend`)**：新增布尔属性直接控制显示与隐藏，自动排版换行并支持点击置灰重绘

---

<!-- props -->

---
{{xuyajun}}
