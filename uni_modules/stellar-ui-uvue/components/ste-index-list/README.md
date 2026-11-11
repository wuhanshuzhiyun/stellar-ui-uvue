# IndexList 索引列表

用于在海量长列表中快速定位目标项（如城市列表、通讯录）。支持字母手势触摸滑动寻址、大字气泡即时指示与分组标题吸顶效果。完整适配 **uni-app x (UTS/UVUE)** 架构。

---

## 使用示例

### 基础用法

- 外层容器使用 `ste-index-list`，通过 `@clickItem` 监听分组项的点击；
- 分组项使用 `ste-index-item`，配置 `title` 作为索引字母，`list` 作为该分组下的条目列表。

```html
<template>
    <view class="container">
        <ste-index-list height="100%" @clickItem="handleClickItem">
            <ste-index-item
                v-for="item in dataList"
                :key="item.title"
                :title="item.title"
                :list="item.cities"
            />
        </ste-index-list>
    </view>
</template>

<script setup lang="uts">
    type CityGroup = {
        title: string
        cities: Array<string>
    }

    const dataList: Array<CityGroup> = [
        {
            title: 'A',
            cities: ['鞍山', '安阳', '安庆', '安顺']
        },
        {
            title: 'B',
            cities: ['北京', '保定', '包头', '蚌埠', '本溪']
        },
        {
            title: 'C',
            cities: ['成都', '重庆', '长沙', '长春', '常州']
        },
        {
            title: 'D',
            cities: ['大连', '东莞', '大庆', '丹东']
        }
    ]

    function handleClickItem(title: string, text: string) {
        uni.showToast({
            title: `${title} - ${text}`,
            icon: 'none'
        })
    }
</script>

<style>
    .container {
        width: 100%;
        height: 800rpx;
    }
</style>
```

---

### 自定义高亮主题色与吸顶设置

- 通过 `sticky` 属性控制分组字母标题是否在滚动时固定吸附在容器顶部；
- 通过 `activeColor` 与 `inactiveColor` 自由定制右侧字母导航条的高亮颜色与常态颜色。

```html
<template>
    <view class="container">
        <ste-index-list
            height="100%"
            :sticky="true"
            activeColor="#e02020"
            inactiveColor="#999999"
            @change="handleIndexChange"
        >
            <ste-index-item
                v-for="item in dataList"
                :key="item.title"
                :title="item.title"
                :list="item.cities"
            />
        </ste-index-list>
    </view>
</template>

<script setup lang="uts">
    type CityGroup = {
        title: string
        cities: Array<string>
    }

    const dataList: Array<CityGroup> = [
        {
            title: 'G',
            cities: ['广州', '贵阳', '桂林', '赣州']
        },
        {
            title: 'H',
            cities: ['杭州', '合肥', '哈尔滨', '海口']
        },
        {
            title: 'S',
            cities: ['上海', '深圳', '沈阳', '石家庄', '苏州']
        }
    ]

    function handleIndexChange(index: number) {
        console.log('当前激活分组下标:', index)
    }
</script>

<style>
    .container {
        width: 100%;
        height: 800rpx;
    }
</style>
```

---

### 自定义分组标题与内容列表插槽

- `ste-index-item` 提供了 `#title` 插槽用于自定义个性化标题栏样式；
- 提供了 `#default` 插槽用于自定义渲染复杂卡片、带图标或头像的内容行。

```html
<template>
    <view class="container">
        <ste-index-list height="100%">
            <ste-index-item
                v-for="item in userGroups"
                :key="item.title"
                :title="item.title"
            >
                <!-- 自定义分组标题插槽 -->
                <template #title>
                    <view class="custom-group-header">
                        <text class="group-badge">{{ item.title }} 组用户</text>
                    </view>
                </template>

                <!-- 自定义列表行插槽 -->
                <view
                    v-for="(user, idx) in item.users"
                    :key="idx"
                    class="custom-user-row"
                    @click="handleSelectUser(user)"
                >
                    <text class="user-name">{{ user }}</text>
                </view>
            </ste-index-item>
        </ste-index-list>
    </view>
</template>

<script setup lang="uts">
    type UserGroup = {
        title: string
        users: Array<string>
    }

    const userGroups: Array<UserGroup> = [
        {
            title: 'A',
            users: ['Alice (研发部)', 'Alex (设计部)']
        },
        {
            title: 'B',
            users: ['Bob (市场部)', 'Brian (测试部)']
        }
    ]

    function handleSelectUser(user: string) {
        uni.showToast({
            title: `选择联系人: ${user}`,
            icon: 'none'
        })
    }
</script>

<style>
    .container {
        width: 100%;
        height: 800rpx;
    }

    .custom-group-header {
        height: 64rpx;
        padding-left: 24rpx;
        justify-content: center;
        background-color: #f0f2f5;
    }

    .group-badge {
        font-size: 26rpx;
        font-weight: bold;
        color: #1890ff;
    }

    .custom-user-row {
        height: 88rpx;
        padding-left: 24rpx;
        justify-content: center;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #f0f0f0;
    }

    .user-name {
        font-size: 28rpx;
        color: #333333;
    }
</style>
```

---

<!-- props -->

<!-- ste-index-item/props -->

---
{{xuyajun}}
