# Price 价格展示

用于电商商城、订单交易、购物车结算与清单明细中的金额价格展示组件。支持分转元自动换算、小数精度控制（digits）、三种经典排版风格（styleType）、外币符号自定义、原价划线展示以及移动端原生文本底部基线对齐校准。

---

## 代码演示

### 1. 基础用法与金额单位换算

- 组件默认金额单位为分（`valueUnit="fen"`），会自动将输入的 `value` 数值除以 100 换算为元展示；
- 若输入金额已是元单位，可传入 `valueUnit="yuan"`。

```html
<template>
	<!-- 分单位输入：9527分 -> 自动换算展示为 ¥95.27 -->
	<ste-price :value="9527" />

	<!-- 元单位输入：直接展示为 ¥9527 -->
	<ste-price :value="9527" valueUnit="yuan" />
</template>
```

### 2. 货币符号控制（隐藏 / 自定义符号）

- 设置 `:showUnit="false"` 可隐藏金额前的货币符号；
- 通过 `unitSymbol` 可以自定义货币符号，如美元 `$`、欧元 `€`、英镑 `£` 等。

```html
<template>
	<!-- 隐藏货币符号 -->
	<ste-price :value="8800" :showUnit="false" />

	<!-- 美元符号 -->
	<ste-price :value="1999" unitSymbol="$" />

	<!-- 欧元符号 -->
	<ste-price :value="64800" unitSymbol="€" />
</template>
```

### 3. 小数精度控制（digits）

通过 `digits` 属性控制保留小数位数与四舍五入规则：
- `digits="-1"`（默认）：自动去除末尾连续无意义的 0；
- `digits="0"`：取整，不显示小数部分；
- `digits="1"`：固定保留 1 位小数；
- `digits="2"`：固定保留 2 位小数（规范财务两位角分）。

```html
<template>
	<!-- 自动去 0：9520分 -> ¥95.2 -->
	<ste-price :value="9520" :digits="-1" />

	<!-- 纯整数：9527分 -> ¥95 -->
	<ste-price :value="9527" :digits="0" />

	<!-- 保留一位：9520分 -> ¥95.2 -->
	<ste-price :value="9520" :digits="1" />

	<!-- 保留两位：9500分 -> ¥95.00 -->
	<ste-price :value="9500" :digits="2" />
</template>
```

### 4. 字体尺寸与色彩（fontSize & color）

支持纯数字（默认单位为 `rpx`）或携带 `px`、`rpx` 单位的字号。支持通过 `color` 自定义任意主题色彩。组件内置原生 Flex 与微米级基线位移校准，大字号下符号绝不下沉。

```html
<template>
	<!-- 小号常规 (fontSize="28") -->
	<ste-price :value="3900" :fontSize="28" />

	<!-- 强调翠绿 (fontSize="36") -->
	<ste-price :value="12800" :fontSize="36" color="#07c160" />

	<!-- 大号经典红 (fontSize="52") -->
	<ste-price :value="29900" :fontSize="52" color="#FF1E19" />

	<!-- 加大号商务深蓝 (fontSize="64") -->
	<ste-price :value="99900" :fontSize="64" color="#007aff" />
</template>
```

### 5. 排版风格（styleType）

组件预置三种主流电商排版风格：
- `styleType="1"`：整数与角分小数等大，仅货币符号缩微；
- `styleType="2"`（默认）：经典电商大促排版——符号缩小、整数放大突出、角分缩小；
- `styleType="3"`：货币符号、整数与角分全部保持统一字号。

```html
<template>
	<!-- 风格 1：整数和小数等大，仅符号缩小 -->
	<ste-price :value="9527" :styleType="1" :fontSize="48" />

	<!-- 风格 2：经典电商前大后小（推荐） -->
	<ste-price :value="9527" :styleType="2" :fontSize="48" />

	<!-- 风格 3：全部等大统一字号 -->
	<ste-price :value="9527" :styleType="3" :fontSize="48" />
</template>
```

### 6. 原价划线模式（isSuggestPrice）

- 设置 `:isSuggestPrice="true"` 开启原价划线模式，自动添加删除线；
- 可通过 `linePriceColor` 自定义划线原价的文字颜色。

```html
<template>
	<view style="flex-direction: row; align-items: flex-end;">
		<!-- 当前售价 -->
		<ste-price :value="9900" :fontSize="48" bold color="#FF1E19" />

		<!-- 划线原价 -->
		<ste-price
			:value="19900"
			:fontSize="28"
			:isSuggestPrice="true"
			linePriceColor="#999999"
			marginLeft="16"
		/>
	</view>
</template>
```

### 7. 文字加粗与自定义格式化

- 设置 `:bold="true"` 支持加粗展示；
- 通过 `formatter` 属性可传入自定义格式化函数（例如支持“万/亿”等大额财务单位缩略展示）。

```html
<template>
	<ste-price :value="9527" :bold="true" :fontSize="40" />
	<ste-price :value="12850000" :formatter="formatBigPrice" :fontSize="40" />
</template>

<script setup lang="uts">
function formatBigPrice(val : any) : string {
	const n = parseFloat(val != null ? val.toString() : '0')
	if (n >= 10000) {
		return `${(n / 10000).toFixed(1)}万`
	}
	return n.toString()
}
</script>
```

---

<!-- props -->

---
{{xuyajun}}
