# MessageBox 弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

---

## 使用方法

### 组合函数使用方法 (通用)

> **注意**：目前 `useMessageBox` 建议在 `setup` 作用域下使用。  
> 页面模板中引入 `<ste-message-box />` 节点，通过组合函数调用 `showMsgBox` 方法打开弹窗。

```html
<template>
    <ste-message-box></ste-message-box>
    <ste-button @click="click" :width="400">提示</ste-button>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-uvue/components/ste-message-box/use-message-box.uts';
    const msg = useMessageBox();
    function click() {
        msg.showMsgBox({
            title: '提示',
            content: '确认执行该操作吗？',
            confirm: () => {
                console.log('点击了确认');
            }
        });
    }
</script>
```

### Ref 用法

父组件引入组件，绑定 `ref` 并通过实例调用 `showMsgBox` 方法打开弹窗：

```html
<template>
    <ste-message-box ref="steMessageBox"></ste-message-box>
    <ste-button @click="click" :width="400">提示</ste-button>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    const steMessageBox = ref();

    function click() {
        steMessageBox.value?.showMsgBox({
            title: '提示内容',
            content: '操作成功',
        });
    }
</script>
```

### uni-app x 模板属性双向绑定用法 (uni-app x 增强)

在 uni-app x 原生组件中，除了组合式 API 模式外，还支持直接在模板中使用 `v-model:show` 与 Props 属性进行声明式绑定：

```html
<template>
    <ste-message-box
        v-model:show="showBox"
        title="温馨提示"
        content="确定要退出登录吗？"
        :show-cancel="true"
        :close-on-click-overlay="true"
        @confirm="handleConfirm"
        @cancel="handleCancel"
    ></ste-message-box>
    <ste-button @click="showBox = true" :width="400">打开弹窗</ste-button>
</template>
<script setup lang="uts">
    import { ref } from 'vue';
    const showBox = ref(false);

    function handleConfirm(val: string) {
        console.log('确认退出');
    }
    function handleCancel(val: string) {
        console.log('取消操作');
    }
</script>
```

---

## 代码演示

### 基础使用

可在标题 (`title`) 和内容 (`content`) 中使用 `\n` 来实现换行：

```html
<template>
    <ste-message-box></ste-message-box>
    <ste-button @click="click" :width="400">提示</ste-button>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-uvue/components/ste-message-box/use-message-box.uts';
    const msg = useMessageBox();
    function click() {
        msg.showMsgBox({
            title: '确认删除订单吗？',
            content: '删除后订单将移至回收站。',
        });
    }
</script>
```

### 带图标

- 内置三种图标类型：`info`、`success`、`error`；
- 当显示图标时，内容 (`content`) 会失效，只显示标题 (`title`)。

```html
<template>
    <ste-message-box></ste-message-box>
    <ste-button @click="msgBoxIcon1">信息提示</ste-button>
    <ste-button @click="msgBoxIcon2">成功提示</ste-button>
    <ste-button @click="msgBoxIcon3">失败提示</ste-button>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-uvue/components/ste-message-box/use-message-box.uts';
    const msg = useMessageBox();
    function msgBoxIcon1() {
        msg.showMsgBox({ title: '提示', icon: 'info' });
    }
    function msgBoxIcon2() {
        msg.showMsgBox({ title: '操作成功', icon: 'success' });
    }
    function msgBoxIcon3() {
        msg.showMsgBox({ title: '操作失败', icon: 'error' });
    }
</script>
```

### 自定义按钮

```html
<template>
    <ste-message-box></ste-message-box>
    <ste-button @click="msgBoxBtn1">自定义按钮文字</ste-button>
    <ste-button @click="msgBoxBtn2">自定义按钮颜色</ste-button>
    <ste-button @click="msgBoxBtn3">单确认按钮 (无取消)</ste-button>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-uvue/components/ste-message-box/use-message-box.uts';
    const msg = useMessageBox();
    function msgBoxBtn1() {
        msg.showMsgBox({
            title: '提示',
            content: '确认删除订单吗？',
            cancelText: '算了',
            confirmText: '删吧',
        });
    }
    function msgBoxBtn2() {
        msg.showMsgBox({
            title: '警告',
            content: '此操作不可逆，请谨慎处理！',
            cancelColor: '#999999',
            confirmColor: '#fa5151',
        });
    }
    function msgBoxBtn3() {
        msg.showMsgBox({
            title: '系统通知',
            content: '服务器正在维护中。',
            confirmText: '我知道了',
            showCancel: false,
        });
    }
</script>
```

### 显示输入框 (Prompt 模式)

当开启 `editable` 时，将呈现输入框模式，确认时会将输入文本回传给 `confirm` 回调：

```html
<template>
    <ste-message-box></ste-message-box>
    <ste-button @click="msgBoxInput">弹出输入框</ste-button>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-uvue/components/ste-message-box/use-message-box.uts';
    const msg = useMessageBox();
    function msgBoxInput() {
        msg.showMsgBox({
            title: '重命名',
            editable: true,
            placeholderText: '请输入新名称',
            confirm: (value) => {
                console.log('输入内容为：', value);
            }
        });
    }
</script>
```

### 自定义插槽 (Slot)

如果提供的默认布局不满足需求，可使用默认插槽自定义弹窗内容。  
通过指定唯一标识 `selector`，可在同一页面中放置并控制多个独立的 `ste-message-box`：

```html
<template>
    <ste-button @click="customClick">打开插槽弹窗</ste-button>
    <ste-message-box selector="myCustomMsgBox">
        <view style="padding: 20rpx; display: flex; align-items: center; justify-content: center;">
            <text style="color: #ff9900; font-weight: bold;">⭐️ 尊贵 VIP 用户专享礼包 ⭐️</text>
        </view>
    </ste-message-box>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-uvue/components/ste-message-box/use-message-box.uts';
    const msgBox = useMessageBox('myCustomMsgBox');

    function customClick() {
        msgBox.showMsgBox({
            title: '会员特权',
            showCancel: false,
            confirmText: '立即领取',
        });
    }
</script>
```

### 回调事件

```html
<template>
    <ste-message-box></ste-message-box>
    <ste-button @click="testCancel">测试取消回调</ste-button>
    <ste-button @click="testConfirm">测试确认回调</ste-button>
    <ste-button @click="testComplete">测试完成回调</ste-button>
</template>
<script setup lang="ts">
    import { useMessageBox } from 'stellar-ui-uvue/components/ste-message-box/use-message-box.uts';
    const msg = useMessageBox();

    function testCancel() {
        msg.showMsgBox({
            title: '取消回调',
            cancel: () => {
                console.log('点击了取消按钮');
            },
        });
    }

    function testConfirm() {
        msg.showMsgBox({
            title: '确认回调',
            confirm: () => {
                console.log('点击了确认按钮');
            },
        });
    }

    function testComplete() {
        msg.showMsgBox({
            title: '完成回调',
            complete: () => {
                console.log('弹窗已关闭结算（无论确认还是取消）');
            },
        });
    }
</script>
```

---

<!-- props -->

---
{{xuyajun}}
