# BarChart 条形图

条形图横向展示各类目数值大小，极佳适配移动端长文本排行榜与横向对比场景。支持条柱微圆角自适应、向右展开动效与数据数值标注。**uni-app x (UTS/UVUE)**。

---

## 代码演示

### 1. uni-app x (UTS/UVUE) 规范用法

在 uni-app x 环境下，通过内置纯 UTS 原生统一图表渲染引擎（StellarChartEngine）驱动，支持部门长标签、多维横向柱状对比与向右生长动画。

```html
<template>
	<view class="chart-box">
		<ste-bar-chart
			:categories="categories"
			:series="seriesList"
			height="420"
		/>
	</view>
</template>

<script setup lang="uts">
const categories = ['开发部', '设计部', '市场部', '运营部', '客服部'];

const seriesList: UTSJSONObject[] = [
	{
		name: '绩效得分',
		data: [92, 85, 88, 78, 90],
		color: '#165DFF'
	}
];
</script>
```

## 实现要点

- **底层渲染引擎**：纯 UTS 编写的自研 **StellarChartEngine**，零外部 JS 依赖，100% 静态类型安全
- **数据源格式 (`series`)**：**强类型 `UTSJSONObject[]`**<br/>每项为 `{ name: string, data: number[], color?: string }`
- **长文本 Y 轴与圆角**：Y 轴文字右对齐自适应计算，右侧末端微圆角（`extra.bar.borderRadius`）平滑过渡
- **Canvas 模式与高分屏**：强制基于 **W3C 标准 Canvas 2D** 原生上下文，引擎自动通过 `uni.getWindowInfo().pixelRatio` 缩放抗锯齿
- **动画效果 (`animation`)**：内置高帧率 **二次缓出插值动效 (easeOutQuad)**，条柱自左向右平滑展开
- **手势交互与提示框**：触控滑动时自动进行 **Hit-test 最近 Y 轴维度吸附**，绘制提示卡片
- **图例控制 (`showLegend`)**：新增布尔属性直接控制显示与隐藏，自动排版换行并支持点击置灰重绘

---

<!-- props -->

---
{{xuyajun}}
