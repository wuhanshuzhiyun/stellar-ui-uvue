# Steps 步骤条

步骤条组件，拆分展示某项流程的步骤，引导用户按流程完成任务或向用户展示当前状态。

---

## 代码演示

### 基础用法

`active` 为当前选中的步骤索引（从 `0` 开始）。

```html
<template>
    <ste-steps :active="active" @clickStep="onStepClick">
        <ste-step title="第一步"></ste-step>
        <ste-step title="第二步"></ste-step>
        <ste-step title="第三步"></ste-step>
    </ste-steps>
</template>

<script setup lang="uts">
import { ref } from 'vue'

const active = ref(1)

function onStepClick(index: number) {
    uni.showToast({ title: '点击了第 ' + index.toString() + ' 步', icon: 'none' })
}
</script>
```

### 设置标题与描述信息

通过 `title` 和 `description` 设置步骤项的标题和详细说明。

```html
<template>
    <ste-steps :active="active">
        <ste-step title="注册账号" description="填写手机号与验证码"></ste-step>
        <ste-step title="实名认证" description="上传身份证明材料"></ste-step>
        <ste-step title="审核通过" description="开启全部平台权限"></ste-step>
    </ste-steps>
</template>
```

### 点状步骤条

配置 `dot` 属性开启迷你精巧的点状步骤条。

```html
<template>
    <ste-steps :active="active" :dot="true">
        <ste-step title="提交"></ste-step>
        <ste-step title="受理"></ste-step>
        <ste-step title="办结"></ste-step>
    </ste-steps>
</template>
```

### 纵向步骤条

配置 `direction="column"` 切换为纵向排布。

```html
<template>
    <ste-steps :active="active" direction="column">
        <ste-step title="已下单" description="2026-08-26 10:00:00"></ste-step>
        <ste-step title="运输中" description="快递包裹已出库"></ste-step>
        <ste-step title="已签收" description="包裹已送达丰巢快递柜"></ste-step>
    </ste-steps>
</template>
```

### 自定义步骤状态 (Error)

通过 `status="error"` 将指定步骤标记为异常失败状态。

```html
<template>
    <ste-steps :active="1">
        <ste-step title="申请提交" status="finished"></ste-step>
        <ste-step title="风控审核" status="error" description="资料不符合要求"></ste-step>
        <ste-step title="打款发放"></ste-step>
    </ste-steps>
</template>
```

---

<!-- props -->

<!-- ste-step/props -->

---
{{xuyajun}}
