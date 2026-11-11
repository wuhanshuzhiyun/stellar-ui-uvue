# Tooltip 文字提示

用于在目标元素旁弹出气泡文字提示，常用于长文本展开说明、帮助提示或图标释义等交互场景。

---

## 核心设计与说明

`ste-tooltip` 采用全局事件总线与动态定位机制设计：
1. **全局/局部挂载**：只需在页面模板中放置一个 `<ste-tooltip />` 挂载节点；
2. **组合式函数驱动**：通过 `useTooltip()` 导出的 `showTooltip` 与 `hideTooltip` 便捷调用，无需深度嵌套 DOM；
3. **Ref 实例驱动**：亦可通过为 `<ste-tooltip ref="tooltipRef" />` 绑定组件实例直接调用；
4. **智能边界吸附**：自动计算触发元素中心点及屏幕左右边距（预留 10px 防溢出边距），自适应调整气泡与小三角指示箭头的位置；
5. **顶部空间不足自动翻转**：`placement` 为 `top` 但目标元素上方空间不够时，气泡会自动翻转到下方展示，箭头也随之反向；
6. **点击空白处关闭**：气泡显示期间会铺一层透明遮罩（`maskClose`，默认开启），点击气泡以外的任意位置即关闭。遮罩存在期间页面不可滚动，且点击其他按钮会先触发关闭——如果更在意「连续点不同按钮直接切换」的手感，请设 `:mask-close="false"`，此时只能通过 `hideTooltip()` 关闭；
7. **自动关闭**：`showTooltip({ duration: 2000 })` 可让气泡展示指定毫秒后自动关闭。计时由组件持有，中途被点空白关闭或被新气泡替换时旧计时会自动作废，不会误杀后面的气泡。

> ⚠️ **挂载位置要求**：组件根节点为全屏 `fixed` 浮层，请把 `<ste-tooltip />` 放在 **`<scroll-view>` 之外**（页面根节点下直接挂载）。挂在 `scroll-view` 内部时，原生端 `fixed` 会被滚动容器裁剪，气泡将不可见。
>
> ⚠️ **选择器要求**：`selector` 指向的元素必须能通过 `SelectorQuery` 查到。请把目标 class 写在 **普通 `<view>` 容器**上，而不要直接写在 `ste-button` 等开启了 `virtualHost` 的组件标签上——这类组件没有独立宿主节点，class 归属不可靠，会导致测量不到位置。


---

## 使用方法

### 1. 组合函数使用方式（推荐）

通过 `stellar-ui-uvue/components/ste-tooltip/use-tooltip.uts` 导出 `useTooltip` 组合式函数。在 `setup` 作用域下调用并传入目标元素的选择器及组件实例上下文：

```html
<template>
    <view class="demo-container">
        <!-- Tooltip 视图挂载节点 -->
        <ste-tooltip></ste-tooltip>

        <!-- 触发气泡提示的目标按钮 -->
        <ste-button class="target-btn" @click="handleShowTooltip">
            点击弹出文字提示
        </ste-button>
    </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, type ComponentPublicInstance } from 'vue';
import { useTooltip } from 'stellar-ui-uvue/components/ste-tooltip/use-tooltip.uts';

// 获取当前组件实例，供选择器查询宿主 DOM 节点位置
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

// 初始化 Tooltip 组合式调用函数
const { showTooltip, hideTooltip } = useTooltip();

/**
 * 触发气泡展示
 */
function handleShowTooltip() {
    showTooltip({
        text: '这是一条气泡提示文字，用于详细补充说明内容。',
        selector: '.target-btn', // 目标元素的选择器
        instance: instance,      // 当前页面/组件实例
        placement: 'top',        // 气泡展示方位：top (上方) 或 bottom (下方)
        maxWidth: '60vw',        // 气泡最大宽度
    });
}
</script>

<style>
.demo-container {
    padding: 40rpx;
    align-items: center;
}
</style>
```

---

### 2. Ref 实例调用方式

通过直接给 `<ste-tooltip>` 绑定 `ref` 引用，调用暴露的 `showTooltip` 与 `hideTooltip` 方法：

```html
<template>
    <view class="demo-container">
        <!-- 绑定 ref 实例 -->
        <ste-tooltip ref="tooltipRef"></ste-tooltip>

        <ste-button class="ref-target-btn" @click="openByRef">
            Ref 方式调用
        </ste-button>
    </view>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, type ComponentPublicInstance } from 'vue';

const tooltipRef = ref();
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

function openByRef() {
    tooltipRef.value?.showTooltip({
        text: '通过组件 ref 实例成功唤起文字提示！',
        selector: '.ref-target-btn',
        instance: instance,
        placement: 'bottom',
    });
}
</script>
```

---

### 3. 不同弹出方向（Placement）

支持顶部 `top` 与底部 `bottom` 两个展示方向，小三角指示箭头将自动指向触发元素中心：

```html
<template>
    <view class="demo-row">
        <ste-tooltip></ste-tooltip>

        <!-- 顶部弹出 -->
        <ste-button class="btn-top" @click="showTop">上方提示</ste-button>

        <!-- 底部弹出 -->
        <ste-button class="btn-bottom" @click="showBottom">下方提示</ste-button>
    </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, type ComponentPublicInstance } from 'vue';
import { useTooltip } from 'stellar-ui-uvue/components/ste-tooltip/use-tooltip.uts';

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const { showTooltip } = useTooltip();

// 上方展示
function showTop() {
    showTooltip({
        text: '气泡在元素上方展示，箭头朝下',
        selector: '.btn-top',
        instance: instance,
        placement: 'top',
    });
}

// 下方展示
function showBottom() {
    showTooltip({
        text: '气泡在元素下方展示，箭头朝上',
        selector: '.btn-bottom',
        instance: instance,
        placement: 'bottom',
    });
}
</script>
```

---

### 4. 自定义最大宽度与长文本换行

通过 `maxWidth` 属性控制气泡的最大宽度，默认最大宽度为 `60vw`：

```html
<template>
    <view class="demo-container">
        <ste-tooltip></ste-tooltip>
        <ste-button class="btn-long" @click="showLongText">展示长文本说明</ste-button>
    </view>
</template>

<script setup lang="ts">
import { getCurrentInstance, type ComponentPublicInstance } from 'vue';
import { useTooltip } from 'stellar-ui-uvue/components/ste-tooltip/use-tooltip.uts';

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const { showTooltip } = useTooltip();

function showLongText() {
    showTooltip({
        text: 'Tooltip 组件支持长文本自适应折行，当文字长度超过 maxWidth 限制时将自动换行排版。',
        selector: '.btn-long',
        instance: instance,
        maxWidth: '80vw', // 自定义气泡宽度上限
    });
}
</script>
```

---

### 5. 手动关闭提示

可通过 `hideTooltip()` 方法随时关闭当前展示中的提示气泡；也可在 `showTooltip` 时传 `duration` 让组件自动关闭：

```html
<script setup lang="ts">
import { useTooltip } from 'stellar-ui-uvue/components/ste-tooltip/use-tooltip.uts';

const { showTooltip, hideTooltip } = useTooltip();

/**
 * 在业务流程中关闭气泡，例如接口返回后关闭、页面跳转前关闭
 */
function handleClose() {
    hideTooltip();
}

/**
 * 展示 2 秒后自动关闭：时长交给组件管理，
 * 中途被点空白关闭或被新气泡替换时，旧计时会自动作废，不会误杀后面的气泡
 */
function showThenAutoClose() {
    showTooltip({
        text: '2 秒后自动关闭',
        selector: '.target-btn',
        duration: 2000,
    } as TooltipOptions);
}
</script>
```

> ⚠️ **注意调用时机**：`hideTooltip()` 是程序化关闭手段。`maskClose` 默认开启时，遮罩会盖住整个页面，**气泡显示期间点击外部按钮是关闭气泡，而不是触发该按钮的点击逻辑**——也就是说，无法用页面上的「关闭按钮」来关闭气泡。需要关闭时请用 `duration`、定时器或异步回调，或给挂载节点设 `:mask-close="false"`。

---

## 注意事项

1. **宿主实例传递**：跨端（尤其是小程序与原生渲染端）进行节点测量时，`options.instance` 必须传入当前触发组件的真实实例（通过 `getCurrentInstance()` 获取），否则可能无法正确定位目标元素的屏幕绝对坐标；
2. **选择器唯一性**：`options.selector` 建议使用当前组件内唯一的类名或 ID，以避免跨组件选择歧义；
3. **遮罩期间页面不可滚动**：`maskClose` 开启时，气泡显示期间全屏遮罩会接管触摸，页面滚动与按钮点击都会被临时屏蔽；对滚动敏感的场景请设 `:mask-close="false"`（此时回到「点其他目标直接切换、只能 `hideTooltip()` 关闭」的模式）；
4. **`hideTooltip()` 无法被页面按钮触发**：`maskClose` 开启时页面上任何按钮都点不到，包括「关闭」按钮，程序化关闭请用定时器或异步回调触发。

---

{{xuyajun}}
