# GoodsList 商品列表

商品信息清单组件用于以键值清单形式展示商品、订单、调价或仓储属性，支持主题色竖条、自定义图标与操作插槽。

### 实现说明
- **布局**：采用 Flexbox 弹性对齐，各端边距与竖线指示器表现一致。
- **强类型支持**：推荐引入 `stellar-ui-uvue/components/ste-goods-list/constants.uts` 中的 `GoodsListItem` 类型规范。

---

## 基础用法

- 属性`data`用于接受要展示的数据列表
    - 数据类型`{ label: string; value: string }[]`
- 属性`title`用于设置标题文案

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const data = ref([
        {
            label: '调价类型',
            value: '促销调价',
        },
        {
            label: '原售价',
            value: '￥ 20.90',
        },
        {
            label: '新售价',
            value: '￥ 19.90',
        },
        {
            label: '变更日期',
            value: '2025-05-20',
        },
    ]);
</script>
<template>
    <ste-goods-list title="价格数据" :data="data" />
</template>
```

## 自定义标题icon

- 属性`title-icon`设置自定义标题icon

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const data = ref([
        {
            label: '调价类型',
            value: '促销调价',
        },
        {
            label: '原售价',
            value: '￥ 20.90',
        },
        {
            label: '新售价',
            value: '￥ 19.90',
        },
        {
            label: '变更日期',
            value: '2025-05-20',
        },
    ]);
</script>
<template>
    <ste-goods-list title="价格数据" title-icon="&#xe6a5;" :data="data" />
</template>
```

## 隐藏icon

- 属性`hide-title-icon`可设置是否隐藏标题icon

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const data = ref([
        {
            label: '调价类型',
            value: '促销调价',
        },
        {
            label: '原售价',
            value: '￥ 20.90',
        },
        {
            label: '新售价',
            value: '￥ 19.90',
        },
        {
            label: '变更日期',
            value: '2025-05-20',
        },
    ]);
</script>
<template>
    <ste-goods-list title="价格数据" hide-title-icon :data="data" />
</template>
```

## 标题右侧插槽

- 插槽`method`可设置标题栏右侧的操作区域内容

```html
<script setup lang="ts">
    import { ref } from 'vue';

    const data = ref([
        {
            label: '调价类型',
            value: '促销调价',
        },
        {
            label: '原售价',
            value: '￥ 20.90',
        },
        {
            label: '新售价',
            value: '￥ 19.90',
        },
        {
            label: '变更日期',
            value: '2025-05-20',
        },
    ]);
</script>
<template>
    <ste-goods-list title="价格数据" :data="data">
        <template #method>
            更多操作
            <ste-icon code="&#xe674;" />
        </template>
    </ste-goods-list>
</template>
```

---

<!-- props -->

---
{{xuyajun}}
