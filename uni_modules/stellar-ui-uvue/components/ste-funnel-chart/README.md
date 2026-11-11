# FunnelChart 漏斗图

漏斗图采用梯度梯形截面由上至下层层递减，直观呈现业务流转转化率与流失环节。支持梯度收窄排版、每层文案居中标注与平滑展开动画。**uni-app x (UTS/UVUE)**。

---

## 代码演示

### 1. uni-app x (UTS/UVUE) 规范用法

在 uni-app x 环境下，通过内置纯 UTS 原生统一图表渲染引擎（StellarChartEngine）驱动，各层梯形梯度收窄展示。

```html
<template>
	<view class="chart-box">
		<ste-funnel-chart :series="seriesList" height="420" />
	</view>
</template>

<script setup lang="uts">
const seriesList: UTSJSONObject[] = [
	{ name: '访问商品', value: 1000, color: '#165DFF' },
	{ name: '加入购物车', value: 650, color: '#14C9C9' },
	{ name: '生成订单', value: 420, color: '#F7BA1E' },
	{ name: '完成支付', value: 280, color: '#9FDB1D' }
];
</script>
```

## 实现要点

- **底层渲染引擎**：纯 UTS 编写的自研 **StellarChartEngine**，零外部 JS 依赖，100% 静态类型安全
- **数据源格式 (`series`)**：**强类型 `UTSJSONObject[]`**<br/>每项为 `{ name: string, value: number, color?: string }`
- **梯形截面几何计算**：纯数学梯形顶底边比例自适应算法，支持 `extra.funnel.gap` 缝隙调节与文字居中
- **Canvas 模式与高分屏**：强制基于 **W3C 标准 Canvas 2D** 原生上下文，引擎自动通过 `uni.getWindowInfo().pixelRatio` 缩放抗锯齿
- **动画效果 (`animation`)**：内置高帧率 **二次缓出插值动效 (easeOutQuad)**，梯形自中心向两侧平滑展开
- **图例控制 (`showLegend`)**：新增布尔属性直接控制显示与隐藏，自动排版换行并支持点击置灰重绘

---

<!-- props -->

---
{{xuyajun}}
