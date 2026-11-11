# SwipeAction 滑动单元格

该组件一般用于左滑唤出操作菜单的场景，最常用于左滑删除、置顶、收藏等操作。

---

## 代码演示

### 基础用法

- 插槽 `default` 为单元格的主体内容区域
- 插槽 `right` 为单元格右侧展开的操作按钮区域

```html
<template>
    <ste-swipe-action>
        <view class="content-view">
            <text class="content-text">右滑测试单元格（向左滑动呼出删除）</text>
        </view>
        <template v-slot:right>
            <view class="action-btn btn-danger" @click="onDelete">
                <text class="btn-text">删除</text>
            </view>
        </template>
    </ste-swipe-action>
</template>

<script setup lang="uts">
function onDelete() {
    uni.showToast({ title: '点击了删除', icon: 'none' })
}
</script>
```

### 双向滑动与左右操作区

配置 `mode="all"` 支持向左滑动或向右滑动，分别呼出左侧与右侧操作菜单。

```html
<template>
    <ste-swipe-action mode="all">
        <template v-slot:left>
            <view class="action-btn btn-primary">
                <text class="btn-text">收藏</text>
            </view>
        </template>
        <view class="content-view">
            <text class="content-text">双向滑动单元格（向右滑收藏，向左滑删除）</text>
        </view>
        <template v-slot:right>
            <view class="action-btn btn-danger">
                <text class="btn-text">删除</text>
            </view>
        </template>
    </ste-swipe-action>
</template>
```

### 边缘指示按钮

配置 `leftIcon` 或 `rightIcon` 在单元格边缘展示快捷展开/收起箭头按钮。

```html
<template>
    <ste-swipe-action mode="all" :leftIcon="true" :rightIcon="true">
        <template v-slot:left>
            <view class="action-btn btn-primary"><text class="btn-text">置顶</text></view>
        </template>
        <view class="content-view">
            <text class="content-text">带两端展开箭头的单元格</text>
        </view>
        <template v-slot:right>
            <view class="action-btn btn-danger"><text class="btn-text">删除</text></view>
        </template>
    </ste-swipe-action>
</template>
```

### 单元格组与互斥排他 (autoClose)

使用 `ste-swipe-action-group` 包裹多个单元格，当展开其中一项时，自动收起同组内的其他展开项。

```html
<template>
    <ste-swipe-action-group :autoClose="true" @open="onGroupOpen" @close="onGroupClose">
        <ste-swipe-action>
            <view class="content-view"><text class="content-text">列表项 1</text></view>
            <template v-slot:right>
                <view class="action-btn btn-danger"><text class="btn-text">删除</text></view>
            </template>
        </ste-swipe-action>
        <ste-swipe-action>
            <view class="content-view"><text class="content-text">列表项 2</text></view>
            <template v-slot:right>
                <view class="action-btn btn-danger"><text class="btn-text">删除</text></view>
            </template>
        </ste-swipe-action>
    </ste-swipe-action-group>
</template>
```

---

<!-- props -->

<!-- ste-swipe-action-group/props -->

---
{{xuyajun}}
