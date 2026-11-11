# PieChart 饼图

主要用于表现不同类目的数据在总和中的占比，每个扇区的弧度表示对应数据在总量中的比例。**uni-app x (UTS/UVUE)**。

---

## 代码演示

### 1. uni-app x (UTS/UVUE) 规范用法

在 uni-app x 下，组件通过内置纯原生统一图表渲染引擎（StellarChartEngine）驱动，支持极坐标扇区计算、顺时针弧度展开动画、百分比文案与手势拾取。

```html
<template>
	<view class="chart-box">
		<ste-pie-chart :series="seriesList" height="420" />
	</view>
</template>

<script setup lang="uts">
const seriesList: UTSJSONObject[] = [
	{ name: '移动端流量', value: 55, color: '#165DFF' },
	{ name: '桌面端流量', value: 30, color: '#14C9C9' },
	{ name: '平板端流量', value: 15, color: '#F7BA1E' }
];
</script>
```

## 实现要点

- **底层渲染引擎**：纯 UTS 编写的自研 **StellarChartEngine**，零第三方 JS 依赖，100% 静态类型安全
- **数据源格式 (`series`)**：**强类型 `UTSJSONObject[]`**<br/>每项为 `{ name: string, value: number, color?: string }`
- **Canvas 模式与高分屏**：强制基于 **W3C 标准 Canvas 2D** 原生上下文，引擎自动通过 `uni.getWindowInfo().pixelRatio` 缩放抗锯齿
- **动画效果 (`animation`)**：内置高帧率 **二次缓出插值动效 (easeOutQuad)**，顺时针展开
- **数据标签 (`dataLabel`)**：默认开启，当扇区占比 $\ge 5\%$ 且动画接近尾声时自动居中展示百分比
- **图例控制 (`showLegend`)**：新增布尔属性直接控制显示与隐藏，自动排版折行并支持点击置灰重绘

---

<!-- props -->

---
{{xuyajun}}
