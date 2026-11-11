# AreaChart 面积图

面积图是在折线图的基础上，将折线至下方的坐标轴区域进行半透明渐变填充，强化量级累计与趋势对比。支持平滑曲线填充、入场补间动画与触控十字吸附准星。**uni-app x (UTS/UVUE)**。

---

## 代码演示

### 1. uni-app x (UTS/UVUE) 规范用法

在 uni-app x 环境下，通过纯 UTS 原生统一图表渲染引擎（StellarChartEngine）驱动，区间填充通透的线性渐变色。

```html
<template>
	<view class="chart-box">
		<ste-area-chart
			:categories="categories"
			:series="seriesList"
			:extra="curveAreaExtra"
			height="420"
		/>
	</view>
</template>

<script setup lang="uts">
const categories = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const seriesList: UTSJSONObject[] = [
	{
		name: '浏览量 (PV)',
		data: [120, 180, 150, 260, 210, 310, 280],
		color: '#165DFF'
	}
];

const curveAreaExtra: UTSJSONObject = {
	area: {
		type: 'curve',
		width: 2,
		opacity: 0.4
	}
};
</script>
```

## 实现要点

- **底层渲染引擎**：纯 UTS 编写的自研 **StellarChartEngine**，零外部 JS 依赖，100% 静态类型安全
- **数据源格式 (`series`)**：**强类型 `UTSJSONObject[]`**<br/>每项为 `{ name: string, data: number[], color?: string }`
- **渐变填充渲染**：基于原生 Canvas 2D **纵向线性渐变 (createLinearGradient)**，色彩通透自然
- **Canvas 模式与高分屏**：强制基于 **W3C 标准 Canvas 2D** 原生上下文，引擎自动通过 `uni.getWindowInfo().pixelRatio` 缩放抗锯齿
- **动画效果 (`animation`)**：内置高帧率 **二次缓出插值动效 (easeOutQuad)**，闭合渐变区间平滑生长
- **手势交互与十字准星**：触控滑动时自动进行 **Hit-test 最近分类维度吸附**，绘制半透明十字准星与防越界气泡卡片
- **图例控制 (`showLegend`)**：新增布尔属性直接控制显示与隐藏，自动排版换行并支持点击置灰重绘

---

<!-- props -->

---
{{xuyajun}}
