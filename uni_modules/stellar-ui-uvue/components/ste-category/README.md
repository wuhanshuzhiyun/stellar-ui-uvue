# Category 分类

`ste-category` 分类组件常用于商城、点餐、设置等左侧纵向主栏导航布局。支持双向数据绑定 (`v-model:value`)、徽标角标联动 (`badge`)、平滑圆角内凹视觉过渡以及作用域插槽自定义扩展。已全面支持 **uni-app x (UTS/UVUE)** 原生渲染。

---

## 基础用法

### uni-app x (UTS/UVUE)
在 `uni-app x` 环境下，分类项使用强类型 `CategoryItem` 模型约束，支持 `v-model:value` 双向绑定与 `change` 事件监听：

```html
<template>
    <view style="height: 600rpx">
        <ste-category
            :data="categoryList"
            v-model:value="currentCategory"
            @change="onCategoryChange"
        ></ste-category>
    </view>
</template>

<script setup lang="uts">
import { ref } from 'vue';
import type { CategoryItem } from 'stellar-ui-uvue/components/ste-category/constants.uts';

const currentCategory = ref('snacks');

const categoryList = ref<CategoryItem[]>([
    { title: '全部热卖', value: 'all', badge: 'HOT' } as CategoryItem,
    { title: '休闲零食', value: 'snacks', badge: 8 } as CategoryItem,
    { title: '时令生鲜', value: 'fresh' } as CategoryItem,
    { title: '粮油调味', value: 'oil' } as CategoryItem,
    { title: '家居日用', value: 'home' } as CategoryItem,
    { title: '饮品酒水', value: 'drink' } as CategoryItem
]);

function onCategoryChange(val: string) {
    console.log('当前选中分类:', val);
}
</script>
```

---

## 作用域插槽自定义副标题

支持通过默认插槽接收当前项数据 `{ item }`，自定义展示副标题、计数或小图标：

```html
<template>
    <view style="height: 600rpx">
        <ste-category :data="categoryList" v-model:value="currentVal">
            <template #default="{ item }">
                <text style="font-size: 20rpx; color: #999999;">已选{{ item.count }}件</text>
            </template>
        </ste-category>
    </view>
</template>
```

---

## 实现要点

- **底层渲染架构**：纯 **UTS + UVUE** 原生节点渲染
- **数据类型规范**：声明标准 `CategoryItem` 强类型接口，类型安全
- **选中值双向绑定**：统一为 `string` 派发与比对，数字类型自动转换
- **圆角内凹过渡算法**：状态机驱动的单类名动态组合（`.item-prev` / `.item-next`）
- **作用域插槽解构**：`<template #default="{ item }">` 强类型访问

---

<!-- props -->

---
{{xuyajun}}
