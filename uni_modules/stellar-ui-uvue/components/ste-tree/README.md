# Tree 树形控件

用于展示层级化结构数据的树形控件，支持手风琴模式、异步懒加载、默认展开、关键词搜索过滤与多插槽自定义。**uni-app x (UTS/UVUE)**。

---

## 使用示例

### 基础用法

- 属性 `options` 用于设置树形结构选项列表。
- 事件 `@open` 监听节点展开，`@close` 监听节点收起，`@click` 监听节点标题点击。

### 默认展开节点与 Ref 命令式控制

- 属性 `openNodes` 用于设置初始化时默认展开的节点 value 数组（会自动向上遍历展开其所有祖先节点）。
- 实例方法 `open(value)` / `close(value)` 用于命令式展开或关闭指定节点。

```html
<template>
    <view>
        <view class="btn-box">
            <ste-button @click="handleOpen" :width="200">展开节点 2</ste-button>
            <ste-button @click="handleClose" :width="200" mode="error">关闭节点 2</ste-button>
        </view>
        <ste-tree
            ref="treeRef"
            :options="options"
            :openNodes="['1-1-1']"
        />
    </view>
</template>

<script setup lang="uts">
    import { ref } from 'vue'
    import type { SteTreeNode } from 'stellar-ui-uvue/components/ste-tree/constants.uts'

    const treeRef = ref<SteTreeComponentPublicInstance | null>(null)

    const options = ref<SteTreeNode[]>([
        {
            title: '模块 1',
            value: '1',
            children: [
                {
                    title: '子模块 1-1',
                    value: '1-1',
                    children: [{ title: '功能项 1-1-1', value: '1-1-1' } as SteTreeNode] as SteTreeNode[],
                } as SteTreeNode,
            ] as SteTreeNode[],
        } as SteTreeNode,
        {
            title: '模块 2',
            value: '2',
            children: [{ title: '功能项 2-1', value: '2-1' } as SteTreeNode] as SteTreeNode[],
        } as SteTreeNode,
    ])

    function handleOpen() {
        treeRef.value?.open('2')
    }

    function handleClose() {
        treeRef.value?.close('2')
    }
</script>
```

---

### 节点关键词搜索过滤

- 属性 `searchTitle` 用于动态响应式搜索；
- 也可以通过实例方法 `search(keyword)` 命令式触发搜索。搜索时会自动保留并高亮展开命中节点的所有父级路径。

```html
<template>
    <view>
        <ste-input v-model="searchKeyword" placeholder="请输入节点名称搜索" />
        <ste-tree :options="options" :searchTitle="searchKeyword" />
    </view>
</template>

<script setup lang="uts">
    import { ref } from 'vue'
    import type { SteTreeNode } from 'stellar-ui-uvue/components/ste-tree/constants.uts'

    const searchKeyword = ref('')
    const options = ref<SteTreeNode[]>([
        {
            title: '研发中心',
            value: '1',
            children: [
                { title: '前端架构团队', value: '1-1' } as SteTreeNode,
                { title: '后端微服务团队', value: '1-2' } as SteTreeNode,
            ] as SteTreeNode[],
        } as SteTreeNode,
    ])
</script>
```

---

### 非手风琴模式 (多节点并行展开)

- 属性 `accordion` 默认为 `true`（手风琴模式：展开一个节点时自动收起同级兄弟节点）。
- 设置 `:accordion="false"` 可允许用户同时并行展开多个同级节点。

```html
<template>
    <ste-tree :options="options" :accordion="false" />
</template>
```

---

### 异步懒加载 (beforeOpen)

- 当节点在初始数据中没有子节点（`children`），但需要展示展开箭头时，可将该节点的 `hasChildren` 声明为 `true`。
- 事件 `@beforeOpen` 在用户点击展开时触发，提供 4 个回调参数：
  - `node`：当前即将展开的节点数据对象；
  - `suspend()`：挂起等待异步操作完成，显示加载中菊花；
  - `next(children)`：注入异步加载得到的子节点数组并完成展开；
  - `stop()`：中断展开流程并重置加载状态。

```html
<template>
    <ste-tree :options="lazyOptions" @beforeOpen="handleBeforeOpen" />
</template>

<script setup lang="uts">
    import { ref } from 'vue'
    import type {
        SteTreeNode,
        BeforeOpenSuspend,
        BeforeOpenNext,
        BeforeOpenStop,
    } from 'stellar-ui-uvue/components/ste-tree/constants.uts'

    const lazyOptions = ref<SteTreeNode[]>([
        { title: '动态加载模块 A', value: 'lazy-1', hasChildren: true } as SteTreeNode,
        { title: '动态加载模块 B', value: 'lazy-2', hasChildren: true } as SteTreeNode,
    ])

    function handleBeforeOpen(
        node : SteTreeNode,
        suspend : BeforeOpenSuspend,
        next : BeforeOpenNext,
        _stop : BeforeOpenStop
    ) {
        // 1. 开启挂起等待与菊花加载
        suspend()

        // 2. 模拟异步网络请求
        setTimeout(() => {
            const subNodes : SteTreeNode[] = [
                { title: `${node.title ?? ''} - 子数据 1`, value: `${node.value ?? ''}-1` } as SteTreeNode,
                { title: `${node.title ?? ''} - 子数据 2 (支持多层)`, value: `${node.value ?? ''}-2`, hasChildren: true } as SteTreeNode,
            ]
            // 3. 注入数据并展开
            next(subNodes)
        }, 1000)
    }
</script>
```

---

### 自定义插槽内容与展开图标

- 默认插槽 `#default="{ node, depth }"` 用于自定义节点左侧图标、标题及扩展元素。
  >  **跨端提示**：在 uni-app x (UVUE) 模板中，解构的作用域参数建议通过 `(node as SteTreeNode)` 或定义辅助函数读取属性，以确保 Kotlin 强类型安全。
- 插槽 `#open="{ open }"` 用于自定义右侧展开/收起指示图标。
- 插槽 `#loading` 用于自定义异步懒加载时的菊花动画。

```html
<template>
    <ste-tree :options="options">
        <!-- 自定义节点内容 -->
        <template #default="{ node, depth }">
            <view class="custom-node">
                <ste-icon code="&#xe67a;" :size="24" color="#0090FF" />
                <text class="custom-title">{{ getNodeTitle(node) }}</text>
                <text class="custom-badge">L{{ depth }}</text>
            </view>
        </template>
        <!-- 自定义展开图标 -->
        <template #open="{ open }">
            <text class="custom-arrow">{{ open ? '▲' : '▼' }}</text>
        </template>
    </ste-tree>
</template>

<script setup lang="uts">
    import { ref } from 'vue'
    import type { SteTreeNode } from 'stellar-ui-uvue/components/ste-tree/constants.uts'

    const options = ref<SteTreeNode[]>([
        {
            title: '总经办',
            value: '1',
            children: [{ title: '行政部', value: '1-1' } as SteTreeNode] as SteTreeNode[],
        } as SteTreeNode,
    ])

    function getNodeTitle(node : any | null) : string {
        if (node != null) {
            const n = node as SteTreeNode
            return n.title ?? ''
        }
        return ''
    }
</script>
```

---

<!-- props -->

---
{{xuyajun}}
