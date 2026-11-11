# DropdownMenu 下拉菜单

向下或向上展开的条件筛选菜单组件，支持单选与多选联动、列表（`block`）与胶囊按钮（`round`）双排版形态、定向遮罩裁剪（绝不遮挡页面上方原生组件）及精准视窗动态定位。完整适配 **uni-app x (UTS/UVUE)** 架构。

---

## 使用示例

### 基础用法 (单选与标题自动联动)

- 通过 `v-model` 绑定选中项的值；
- 未指定 `title` 时，标题会自动跟随当前选中的选项 `title` 实时变化。

```html
<template>
    <view class="menu-card">
        <ste-dropdown-menu v-model="menuValue">
            <ste-dropdown-menu-item value="1" title="全部商品" />
            <ste-dropdown-menu-item value="2" title="新款上市" />
            <ste-dropdown-menu-item value="3" title="活动特惠" />
            <ste-dropdown-menu-item value="4" title="热销推荐" />
        </ste-dropdown-menu>
    </view>
</template>

<script setup lang="uts">
    import { ref } from 'vue'

    const menuValue = ref<string>('1')
</script>
```

---

### 胶囊按钮模式 (type="round")

- 设置 `type="round"` 选项以圆角胶囊按钮网格形式排版，适合快捷分类或筛选项场景。

```html
<template>
    <view class="menu-card">
        <ste-dropdown-menu
            title="快捷分类"
            type="round"
            v-model="categoryValue"
        >
            <ste-dropdown-menu-item value="c1" title="数码3C" />
            <ste-dropdown-menu-item value="c2" title="家用电器" />
            <ste-dropdown-menu-item value="c3" title="服饰鞋包" />
            <ste-dropdown-menu-item value="c4" title="美妆个护" />
            <ste-dropdown-menu-item value="c5" title="食品饮料" />
            <ste-dropdown-menu-item value="c6" title="母婴玩具" />
        </ste-dropdown-menu>
    </view>
</template>

<script setup lang="uts">
    import { ref } from 'vue'

    const categoryValue = ref<string>('c1')
</script>
```

---

### 多选限制模式 (max="2")

- 通过 `:max="2"` 限制用户最多选中的选项个数；达到上限时自动滑动替换，支持点击已选项反选取消。

```html
<template>
    <view class="menu-card">
        <ste-dropdown-menu
            title="服务承诺 (限2项)"
            type="round"
            :max="2"
            v-model="serviceValues"
        >
            <ste-dropdown-menu-item value="s1" title="顺丰包邮" />
            <ste-dropdown-menu-item value="s2" title="极速退款" />
            <ste-dropdown-menu-item value="s3" title="正品溯源" />
            <ste-dropdown-menu-item value="s4" title="破损包退" />
            <ste-dropdown-menu-item value="s5" title="赠运费险" />
            <ste-dropdown-menu-item value="s6" title="全国联保" />
        </ste-dropdown-menu>
    </view>
</template>

<script setup lang="uts">
    import { ref } from 'vue'

    const serviceValues = ref<string[]>(['s1', 's3'])
</script>
```

---

### 向上弹出模式 (direction="up")

- 设置 `direction="up"` 时，菜单将从菜单栏上方向上滑出，遮罩仅覆盖菜单栏上方区域。

```html
<template>
    <view class="menu-card">
        <ste-dropdown-menu
            v-model="sortValue"
            direction="up"
        >
            <ste-dropdown-menu-item value="u1" title="综合排序" />
            <ste-dropdown-menu-item value="u2" title="价格升序" />
            <ste-dropdown-menu-item value="u3" title="销量降序" />
        </ste-dropdown-menu>
    </view>
</template>

<script setup lang="uts">
    import { ref } from 'vue'

    const sortValue = ref<string>('u1')
</script>
```

---

### Ref 实例方法控制

- 通过组件 Ref 可命令式调用 `open()` 与 `close()` 方法。

```html
<template>
    <view>
        <ste-dropdown-menu
            ref="dropdownRef"
            title="实例控制"
            v-model="actionValue"
        >
            <ste-dropdown-menu-item value="a1" title="选项 A" />
            <ste-dropdown-menu-item value="a2" title="选项 B" />
        </ste-dropdown-menu>

        <view class="btn-group">
            <ste-button @click="handleOpen">打开菜单</ste-button>
            <ste-button @click="handleClose" mode="error">关闭菜单</ste-button>
        </view>
    </view>
</template>

<script setup lang="uts">
    import { ref } from 'vue'

    const dropdownRef = ref<SteDropdownMenuComponentPublicInstance | null>(null)
    const actionValue = ref<string>('a1')

    function handleOpen() {
        dropdownRef.value?.open()
    }

    function handleClose() {
        dropdownRef.value?.close()
    }
</script>
```

---

<!-- props -->

<!-- ste-dropdown-menu-item/props -->

---
{{xuyajun}}
