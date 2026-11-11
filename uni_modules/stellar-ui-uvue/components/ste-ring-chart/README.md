# RingChart 环形图

环形图采用中空圆环结构，中间镂空区域用于展示核心聚合指标、总览数值或层级标题，外侧圆环展示各分项所占比例。支持顺时针弧度展开动画、指标卡片与数据占比呈现。**uni-app x (UTS/UVUE)**。

---

## 代码演示

### 1. uni-app x (UTS/UVUE) 规范用法

在 uni-app x 环境下，通过内置纯 UTS 原生统一图表渲染引擎（StellarChartEngine）驱动，支持直接传入 `title` 和 `subtitle` 进行中心指标渲染。

```html
<template>
	<view class="chart-box">
		<ste-ring-chart
			:series="seriesList"
			title="8,520"
			subtitle="总访问量"
			height="420"
		/>
	</view>
</template>

<script setup lang="uts">
const seriesList: UTSJSONObject[] = [
	{ name: '新访客', value: 5200, color: '#165DFF' },
	{ name: '老访客', value: 3320, color: '#14C9C9' }
];
</script>
```

## 实现要点

- **底层渲染引擎**：纯 UTS 编写的自研 **StellarChartEngine**，零外部 JS 依赖，100% 静态类型安全
- **数据源格式 (`series`)**：**强类型 `UTSJSONObject[]`**<br/>每项为 `{ name: string, value: number, color?: string }`
- **中心指标标题 (`title/subtitle`)**：新增支持直接在 **Props (`:title="str"` / `:subtitle="str"`)** 快捷声明，亦支持 `extra.ring`
- **Canvas 模式与高分屏**：强制基于 **W3C 标准 Canvas 2D** 原生上下文，引擎自动通过 `uni.getWindowInfo().pixelRatio` 缩放抗锯齿
- **动画效果 (`animation`)**：内置高帧率 **二次缓出插值动效 (easeOutQuad)**，圆环顺时针展开
- **数据标签 (`dataLabel`)**：默认开启，当分项占比 $\ge 8\%$ 且动画接近尾声时自动在环带中心展示百分比
- **图例控制 (`showLegend`)**：新增布尔属性直接控制显示与隐藏，自动排版换行并支持点击置灰重绘

---

<!-- props -->

---
{{xuyajun}}
