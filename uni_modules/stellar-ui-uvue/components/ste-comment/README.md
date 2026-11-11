# Comment 评论组件

`ste-comment` 评论组件常用于电商、外卖、生活服务等商品详情页中，展示用户评价列表、满意度标签聚合、好评角标以及晒图九宫格。已全面支持 **uni-app x (UTS/UVUE)** 原生渲染。

---

## 基础用法 (uni-app x / UTS)

在 `uni-app x` 中，直接从 `stellar-ui-uvue/components/ste-comment/constants.uts` 导入 `CommentType` 强类型接口，即可享受严格的编译期类型检查与代码补全：

```html
<template>
    <ste-comment
        :comments="commentList"
        :tags="tagList"
        :total="108"
        @click-image="onImageClick"
        @click-tag="onTagClick"
    ></ste-comment>
</template>

<script setup lang="uts">
import { ref } from 'vue';
import type { CommentType } from 'stellar-ui-uvue/components/ste-comment/constants.uts';

const tagList = ref<string[]>([
    '牛肉很新鲜 22',
    '口感绝佳 18',
    '分量十足 15',
    '包装严实 12'
]);

const commentList = ref<CommentType[]>([
    {
        evaluateText: '牛肉色泽红润很新鲜，厚切牛排煎出来汁水饱满，包装采用干冰保鲜非常用心，极力推荐！',
        date: '2024.10.05',
        type: 1,
        userName: '星河饕客',
        userAvatar: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
        imgList: [
            'https://image.whzb.com/chain/StellarUI/image/comment_1.png',
            'https://image.whzb.com/chain/StellarUI/image/comment_2.png',
            'https://image.whzb.com/chain/StellarUI/image/comment_3.png',
            'https://image.whzb.com/chain/StellarUI/image/comment_4.png'
        ]
    } as CommentType
]);

function onImageClick(currentUrl: string, index: number, images: string[]) {
    console.log('点击晒图:', currentUrl);
}

function onTagClick(tag: string, index: number) {
    console.log('点击标签:', tag);
}
</script>
```

---

## 空评价状态 (期待首评)

当 `total` 为 0 且评价列表为空时，组件会自动呈现“期待你的首评”提示，并自动切换为浅橙色渐变底色：

```html
<template>
    <ste-comment :total="0" :comments="[]" :tags="[]"></ste-comment>
</template>
```

---

## 实现说明

| 功能特性 | 实现方式 | 说明 |
| :--- | :--- | :--- |
| **类型定义文件** | `constants.uts`（`CommentType`） | 统一从 `constants.uts` 绝对路径导入强类型，避免模块阶段解析异常 |
| **九宫格样式** | 动态样式类 `.comment-image-last-col` | 用动态类计算保证第 4 列右边距精准清零，不依赖伪类选择器 |
| **大图预览交互** | 内置 `uni.previewImage`，并触发 `@click-image` | 点击配图直接调起全屏预览 |

---

<!-- props -->

## CommentType 数据结构

| 属性 | 说明 | 类型 | 必填 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| `evaluateText` | 评价内容正文 | `string` | 是 | - |
| `date` | 评价发布日期文本 | `string` | 是 | 如 `2024.10.05` |
| `userName` | 评价用户昵称 | `string` | 是 | - |
| `userAvatar` | 用户头像地址 | `string` | 是 | 支持网络 URL 与本地路径 |
| `imgList` | 评价配图列表 | `string[]` | 否 | 默认最多每行 4 张自动换行 |
| `type` | 评价等级类型 | `number` | 否 | `1` 为好评（显示好评徽章），`2` 为中差评 |

---
{{xuyajun}}
