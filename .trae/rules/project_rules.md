# UniAppX (UTS) 开发规则与踩坑记录

基于 stellar-ui-uvue 组件库迁移到 uni-app x 的实战经验总结，避免重复踩坑。

---

## 一、UTS 语言限制

### 1. 类型系统

| 规则 | 说明 |
|---|---|
| **用 `type` 不用 `interface`** | UTS 对象字面量只能赋值给 `type` 定义的构造类型，`interface` 会报 UTS110111163 错误 |
| **不用交叉类型 `T & U`** | UTS 不支持交叉类型，改用具体类型如 `UTSJSONObject` |
| **不用泛型函数引用** | `const obj = { fn: myFn }` 不行，必须用 `fn: () => myFn()` 箭头函数包装 |
| **箭头函数无默认参数** | `const obj = { fn: (a = 1) => {} }` 报错，改用可选参数 `fn: (a?: number) => { const v = a != null ? a : 1 }` |
| **`as` 类型断言限制** | 不支持 `as unknown as T`，不支持 `as T & U` |
| **`any` 类型陷阱** | `(obj as any)['key']` 在 Kotlin 端会被误解析为 `String.get()`，绝对不要用 |

### 2. 全局对象限制

| 规则 | 说明 |
|---|---|
| **无 `String(value)`** | 不支持带参 `String()` 构造器，用 `'' + value` |
| **无 `Number(value)`** | 不支持带参 `Number()` 构造器，用 `parseFloat()` 或 `as number` |
| **无 `undefined`** | UTS 不存在 `undefined`，全用 `null` |
| **无 `Object.keys(obj)`** | 对 `UTSJSONObject` 无效 |
| **无 `!` 逻辑取反** | 模板和脚本中 `!nullableBool` 报错，改用 `!= true` 或 `== false` |
| **无 `double.PositiveInfinity`** | UTS 无 `double` 类型，NaN 检测用 `value != value` |

### 3. 对象/Map 遍历

| 平台 | 正确方式 | 错误方式 |
|---|---|---|
| APP (Kotlin) | `map.keys.iterator()` + `while(iter.hasNext())` | `Object.keys()`、`map.keys()` (是属性不是方法) |
| H5/小程序 | `Object.keys(obj as Any)` | `map.keys.iterator()` (JS 无此 API) |
| **跨平台** | 用 `#ifdef` 条件编译分别处理 | 任何单一方式 |

### 4. Promise

```typescript
// 错误 - 不能给 resolve/reject 加类型注解
new Promise<void>((resolve: () => void) => { ... })

// 正确 - 去掉类型注解
new Promise<void>((resolve) => { ... })
```

### 5. 带参类型转换

```typescript
// 错误 - 括号加 as 转换
const entries = map.entries().toArray();

// 正确 - 先声明中间变量
const srcMap = source.toMap();
const srcKeys = srcMap.keys;  // 属性，不是方法
const iter = srcKeys.iterator();
```

---

## 二、Vue SFC 编译限制

### 1. defineProps

| 规则 | 说明 |
|---|---|
| **只能用字面量** | `defineProps(propsObj)` 报错，不用 import 进来的变量 |
| **用纯类型参数** | `defineProps<ButtonProps>()` 稳定，`withDefaults` 可能解析出错 |
| **默认值手动处理** | `const _x = props.x != null ? props.x : defaultValue` |
| **不用 `as PropType`** | 不需要，UTS 有全局 `PropType` 别名但尽量不用 |
| **不用箭头函数返回类型** | `default: () : Type => ({})` 报错，改用 `default: function() { return {} }` |

### 2. defineEmits

| 规则 | 说明 |
|---|---|
| **不用泛型+参数同时传** | `defineEmits<string[]>([...])` 报错 |
| **用数组字面量** | `defineEmits(['click', ...])` 最稳定 |
| **泛型签名不稳定** | `defineEmits<{ (e: 'click', event: any): void }>()` 多事件时可能解析失败 |

### 3. defineOptions

| 规则 | 说明 |
|---|---|
| **不用局部变量** | `name: componentName` 报错，必须用字符串字面量 `name: 'ste-button'` |
| **uvue 不支持双 script** | 不能用 `<script>` + `<script setup>`，只能用单个 `<script setup>` |

### 4. 注释陷阱

```typescript
// ❌ 注释中的 (name: type) 模式会被编译器误解析
// 注意：UTS 编译器对多事件的 (event: any) 解析不稳定

// ✅ 避免在注释中使用括号+冒号的类型模式
```

---

## 三、CSS 样式限制

### 1. 元素支持的属性

| 属性 | 支持的元素 | 不支持的元素 |
|---|---|---|
| `font-size` / `color` | `<text>` `<button>` `<input>` `<textarea>` | `<view>` |
| `font-weight` | `<text>` `<button>` `<input>` `<textarea>` `<loading>` | `<view>` |
| `align-items` / `justify-content` | `<view>` `<scroll-view>` `<list-view>` 等 | `<button>` |
| `flex-direction` / `display: flex` | `<view>` `<scroll-view>` 等 | `<button>` |
| `line-height` | `<text>` `<button>` | — |
| `white-space` / `text-overflow` | `<text>` `<button>` | `<view>` |

### 2. 不支持的 CSS 值

| 值 | 替代方案 |
|---|---|
| `display: inline-flex` | `display: flex` |
| `inherit` | 直接写具体值 |
| CSS 变量 `var(--xxx)` | 直接写 rpx 值或使用 `normalizeFontSize()` |
| 伪元素 `&:before` / `&:after` | 用 `hover-class` + `opacity` |
| `background-size` | 移除 |
| `box-sizing` | 内联样式 `boxSizing: 'border-box'` |
| `vh` / `vw` 视口单位 | 用具体 px 值或 `100%`（`min-height` 不支持百分比，只能用具体像素） |
| `min-height: 100%` / `min-height: 100vh` | 移除，或用具体像素值如 `800px` |

### 3. 样式优先级

| 规则 | 说明 |
|---|---|
| **CSS 类可能覆盖内联** | 安卓端 CSS `border-radius` 会覆盖 `:style` 中的 `borderRadius`，需移除 CSS 中同名属性 |
| **`:style` 数组后面的优先** | `[style1, style2, rootStyle]` — `rootStyle` 放最后确保覆盖 |
| **拆分 view/text 样式** | `<view>` 不接受 text 属性（fontSize/color），需拆分到子 `<text>` 的 `:style` |

---

## 四、页面结构限制

### 1. 页面滚动

uni-app x 页面根元素不会自动滚动，必须用 `<scroll-view>` 包裹可滚动内容：

```html
<!-- ❌ 内容超出屏幕无法滚动 -->
<template>
  <view class="page">
    ...长内容...
  </view>
</template>

<!-- ✅ 用 scroll-view 包裹 -->
<template>
  <scroll-view scroll-y="true" class="page">
    ...长内容...
  </scroll-view>
</template>
```

### 2. `<button>` 限制

| 规则 | 说明 |
|---|---|
| **只允许单个 `<text>` 子节点** | `<slot>` 不能和 `<text>` 同时直接作为 button 子节点 |
| **不支持 flex 布局** | 用 `line-height = height` 实现垂直居中 |
| **文本垂直居中** | 设置 `line-height` 等于按钮 `height` |

### 2. `<view>` 替代 `<button>` 的场景

- loading 状态：用 `<view>` + `<text>` 组合（可自由使用 flex）
- button 的 openType 事件仍需要原生 `<button>`

### 3. slot 问题

```html
<!-- ❌ <button> 不允许多个子节点 -->
<button>
  <text v-if="loading">加载中...</text>
  <slot v-else></slot>
</button>

<!-- ✅ loading 用 view，非 loading 用 button + slot -->
<view v-if="loading">
  <text>加载中...</text>
</view>
<button v-else>
  <slot></slot>
</button>
```

### 4. 模板限制

| 规则 | 说明 |
|---|---|
| **`$slots.xxx` 不能用于 v-if** | UTS 模板不支持 `$slots.name` 作为布尔判断，需用计算属性或移除 |
| **`position` 等可能是保留字** | 直接在模板用 `props.position` 可能解析为全局，用 `const _position = computed(...)` 再引用 |
| **`addUnit(props.x)` nullable 报错** | 可选属性 `T?` 传给 `T` 参数会 Any? -> Any 报错，用 `addUnit(props.x as any)` |
| **slot prop 不能直接中括号访问** | slot 解构出的 `item` 是 `Any?`，`item['key']` 会被误解析为 `String.get()`，需用 helper 函数 `getText(item)` |
| **slot prop 传给函数需 `!` 解包** | `Any?` 不能传给 `Any` 参数，模板中用 `fn(item!)` 解包 |

### 5. CSS 属性限制补充

| 属性 | 说明 |
|---|---|
| **`gap`** | uvue 不支持，用 `margin-left` / `margin-right` 替代 |
| **`transform: translate(...)`** | uvue CSS 不支持 transform，用 top/left/right/bottom 偏移替代 |
| **`vertical-align`** | 不支持，用 flex 布局或 line-height 居中替代 |
| **`width: fit-content`** | 不支持，用固定宽度或 padding 控制 |
| **`display: inline-block`** | 不支持，用 `display: flex` 或 `inline-flex` |

---

## 五、运行时陷阱

### 1. uni.getStorageSync

```typescript
// ❌ 直接 as UTSJSONObject 会 ClassCastException
const stored = uni.getStorageSync('key');
const s = stored as UTSJSONObject;

// ✅ 先判断类型，再 try-catch 解析
const stored = uni.getStorageSync('key');
if (stored != null) {
  if (typeof stored === 'string') {
    const str = stored as string;
    if (str.length > 0 && str.charAt(0) === '{') {
      try {
        s = JSON.parse(str) as UTSJSONObject;
      } catch(e) {
        // 降级使用默认值
      }
    }
  } else if (typeof stored === 'object' && stored instanceof UTSJSONObject) {
    s = stored as UTSJSONObject;
  }
}
```

### 2. 解构赋值

```typescript
// ❌ UTS 可能无法正确解构
const { getColor } = useColorStore();

// ✅ 先拿对象，再用点语法
const colorStore = useColorStore();
const colorData: ColorValueType = colorStore.getColor();
```

### 3. 对象返回值方法调用

```typescript
// ❌ 点访问返回对象的方法会找不到名称
const store = useFontSize();
store.normalizeFontSize(24)  // 报错: 找不到名称"normalizeFontSize"

// ✅ 先提取函数引用再调用
const _store = useFontSize();
const normalizeFontSize = _store.normalizeFontSize;
normalizeFontSize(24)
```

### 3. 对象字面量属性简写

```typescript
// ❌ UTS 对象中不能用函数引用简写
const utils = { getWindowInfo, formatPx };

// ✅ 必须用箭头函数包装
const utils = { getWindowInfo: () => getWindowInfo(), formatPx: () => formatPx() };
```

---

## 六、最佳实践

### 1. 样式拆分模式

组件需要拆分两个 computed：
- **容器样式** (cmpBtnStyle): padding, width, height, background, border, borderRadius, opacity
- **文本样式** (cmpTextStyle): fontSize, color, fontWeight, lineHeight

### 2. rootStyle 覆盖

```html
<!-- rootStyle 放 :style 数组最后，确保最高优先级 -->
<button :style="[cmpBtnStyle, cmpTextStyle, rootStyle]">
```

### 3. 跨平台代码用条件编译

```typescript
// #ifdef APP-ANDROID || APP-IOS
const keys = source.toMap().keys;
const iter = keys.iterator();
while (iter.hasNext()) { ... }
// #endif
// #ifdef H5 || MP-WEIXIN || MP-ALIPAY
const keys = Object.keys(source as Any);
for (let i = 0; i < keys.length; i++) { ... }
// #endif
```

### 4. nullable 安全调用

```typescript
// ❌ if (boolValue) - Boolean? 不能隐式转 Boolean
// ✅ if (boolValue == true)

// ❌ if (stringValue) - String 不能隐式转 Boolean
// ✅ if (stringValue != null && stringValue !== '')

// ❌ clearTimeout(timer) - timer 是 Number? 不能隐式转 Number
// ✅ const t = timer!; clearTimeout(t);
```
