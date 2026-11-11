# Progress 进度条

用于展示任务当前执行状态、上传加载进度、分段阶梯与里程碑达成情况。支持线性渐变（linear-gradient）、线条粗细自适应、文字对齐、阈值控制、分段里程碑与平滑原生过渡动画。

---

## 代码演示

### 1. 基础用法与动态步进

通过 `percentage` 属性控制当前进度百分比（0 ~ 100）。组件内置原生平滑过渡动画（通过 `duration` 控制时长）。

```html
<template>
	<ste-progress :percentage="45" :duration="0.3" />
</template>
```

### 2. 渐变色彩与主题定制

通过 `activeBg` 可以传入任意纯色十六进制、RGB/RGBA，或完整的 CSS 线性渐变 `linear-gradient(...)`；通过 `inactiveBg` 可自定义底轨背景色。

```html
<template>
	<!-- 科技蓝绿渐变 -->
	<ste-progress
		:percentage="70"
		activeBg="linear-gradient(to right, #1890ff, #52c41a)"
	/>

	<!-- 日落暖橙渐变 -->
	<ste-progress
		:percentage="85"
		activeBg="linear-gradient(to right, #fa8c16, #ff4d4f)"
	/>

	<!-- 高雅紫韵纯色 -->
	<ste-progress
		:percentage="60"
		activeBg="#722ed1"
		inactiveBg="#f9f0ff"
	/>
</template>
```

### 3. 线条高度与粗细控制

通过 `strokeWidth` 属性定制进度条的高度，支持传入数字（默认单位为 `rpx`）或携带 `px`、`rpx` 单位的字符串。两端始终保持全圆角胶囊形态。

```html
<template>
	<!-- 极细迷你线条 (strokeWidth="10") -->
	<ste-progress :percentage="45" :strokeWidth="10" />

	<!-- 标准常规高度 (strokeWidth="24") -->
	<ste-progress :percentage="60" :strokeWidth="24" />

	<!-- 宽大醒目粗线条 (strokeWidth="36", textSize="20") -->
	<ste-progress :percentage="80" :strokeWidth="36" :textSize="20" />
</template>
```

### 4. 文字展示与对齐模式

- 通过 `pivotText` 可以自定义内部显示的文字内容（默认自动显示当前百分比 `${percentage}%`）；
- 通过 `textAlign` 可以设置文字在激活条内的水平对齐方式（支持 `'left'`、`'center'`、`'right'`）；
- 当进度较小时（如小于 15%），激活条宽度较窄容易造成文字挤压溢出，此时可通过 `displayTextThreshold="15"` 在低于阈值时自动隐藏文字。

```html
<template>
	<!-- 自定义提示文字 -->
	<ste-progress :percentage="90" pivotText="已就绪 90%" :strokeWidth="28" />

	<!-- 文字居中排列 -->
	<ste-progress :percentage="50" textAlign="center" :strokeWidth="28" />

	<!-- 文字居左排列 -->
	<ste-progress :percentage="65" textAlign="left" :strokeWidth="28" />

	<!-- 阈值保护：进度小于 15% 时自动隐藏文字 -->
	<ste-progress :percentage="10" :displayTextThreshold="15" :strokeWidth="28" />
</template>
```

### 5. 分段多阶段展示 (stageData)

传入 `stageData` 配置对象，可将进度条升级为阶段里程碑模式，常用于订单支付履约、物流配送等场景。

```html
<template>
	<ste-progress
		:strokeWidth="32"
		:textSize="18"
		:stageData="logisticsStage"
	/>
</template>

<script setup lang="uts">
import { ref } from 'vue'

const logisticsStage = ref<UTSJSONObject>({
	'25': {
		label: '已支付',
		style: { background: '#1890ff' }
	},
	'60': {
		label: '运输中',
		style: { background: '#fa8c16' }
	},
	'100': {
		label: '已签收',
		style: { background: '#52c41a' }
	}
})
</script>
```

### 6. 禁用状态

设置 `:disabled="true"` 时，底轨与激活条整条置灰，提示当前处于禁用或中断状态。

```html
<template>
	<ste-progress :percentage="55" :disabled="true" :strokeWidth="24" />
</template>
```

---

<!-- props -->

---
{{xuyajun}}
