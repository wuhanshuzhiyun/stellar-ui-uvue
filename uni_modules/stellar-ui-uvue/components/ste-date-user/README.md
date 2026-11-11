# DateUser 人员信息以及日期

提供日期（含号数、年月、星期及农历节气）和用户信息（头像、姓名与身份描述）卡片展示。

---

### 实现说明
- **Flex 布局**：采用标准 flex 布局与 `flex-direction: row` 声明，避免视图折行错位；
- **智能离线与降级兜底**：优先使用本地时钟秒级渲染防止界面闪烁，网络异常、接口超时或离线断网时自动降级为本地系统日期计算，保证卡片始终完整展示；
- **域名配置提示**：如需在小程序或受限网络环境下同步服务器日历与节气数据，建议在后台配置业务合法域名 `https://zboa.whzb.com`。

---

## 代码演示

### 基础日期卡片
- 通过 `type="date"`（默认值）展示当天公历日期、年月与星期/节气。

```html
<template>
    <ste-date-user type="date"></ste-date-user>
</template>
```

### 人员信息卡片
- 通过 `type="user"` 切换至人员卡片模式；
- 通过 `avatar` 属性设置头像图片地址；
- 通过 `nickname` 属性设置姓名或昵称；
- 通过 `desc` 插槽自定义角色标签、部门徽标或附加图标。

```html
<template>
    <ste-date-user type="user" avatar="https://image.whzb.com/chain/StellarUI/image.jpg" nickname="张三">
        <template v-slot:desc>
            <view class="desc">
                <text class="title">店长</text>
                <ste-icon code="&#xe6c7;" color="#0275FF" size="28"></ste-icon>
            </view>
        </template>
    </ste-date-user>
</template>

<style>
    .desc {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .title {
        font-size: 24rpx;
        color: #0275ff;
        margin-right: 12rpx;
    }
</style>
```

---

<!-- props -->

---
{{xuyajun}}
