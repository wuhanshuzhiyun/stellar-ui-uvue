# AppUpdate App更新

`ste-app-update` 应用更新组件用于移动端 APP 自动检测新版本、展示多行更新日志、实时监听流式下载进度并调用原生能力进行安装。已全面支持 **uni-app x (UTS/UVUE)** 原生架构。

---

## 基础用法

### uni-app x (UTS/UVUE)

在 `uni-app x` 下，组件基于纯 UTS 与 UVUE 原生渲染，彻底移除弃用的 HTML5+ API，全面接入 `uni.getAppBaseInfo`、`uni.downloadFile` 与 `uni.installApk`。

```html
<template>
    <view class="demo-page">
        <!-- 引入更新组件 -->
        <ste-app-update
            ref="appUpdateRef"
            clientId="workbench_android"
            clientSecret="gkS6lEEncqAocYK2qsrvPQZykm3ISeMx"
            :strictVersionCheck="true"
            @update="onUpdate"
            @no-update="onNoUpdate"
            @cancel="onCancel"
            @skip-version="onSkipVersion"
        ></ste-app-update>

        <button @click="checkUpdate">检查更新</button>
        <button @click="getSkippedList">查看已跳过版本</button>
        <button @click="clearSkipped">清空跳过记录</button>
    </view>
</template>

<script setup lang="uts">
import { ref } from 'vue';

const appUpdateRef = ref<ComponentPublicInstance | null>(null);

// 启动更新检测
function checkUpdate() {
    if (appUpdateRef.value != null) {
        const comp = appUpdateRef.value!;
        comp.$callMethod('start', (resVersion: UTSJSONObject, currentVersion: string) => {
            console.log('检测回调 -> 当前版本: ' + currentVersion + '，最新版本: ' + resVersion.getString('code'));
        });
    }
}

// 获取跳过版本
function getSkippedList() {
    if (appUpdateRef.value != null) {
        const list = appUpdateRef.value!.$callMethod('getSkippedVersions') as string[];
        console.log('已跳过版本: ', list);
    }
}

// 清空跳过记录
function clearSkipped() {
    if (appUpdateRef.value != null) {
        appUpdateRef.value!.$callMethod('clearSkippedVersions');
        uni.showToast({ title: '已清空跳过记录', icon: 'success' });
    }
}

function onUpdate() {
    console.log('已发现新版本并弹出更新卡片');
}

function onNoUpdate() {
    uni.showToast({ title: '当前已是最新版本', icon: 'none' });
}

function onCancel() {
    console.log('用户关闭了更新弹窗');
}

function onSkipVersion(version: string) {
    console.log('用户跳过了版本: ' + version);
}
</script>
```

---

## 组件实例方法 (Methods)

通过 `ref` 获取组件实例后可调用以下方法：

| 方法名 | 入参 | 说明 |
| :--- | :--- | :--- |
| `start` | `(resVersion, version) => void` | 开始触发前置兜底检查与远程版本检测流程 |
| `getSkippedVersions` | 无 | 获取本地 Storage 中保存的用户主动跳过的版本代码数组 (`string[]`) |
| `clearSkippedVersions` | 无 | 清空本地已跳过的版本记录，恢复提示已跳过的版本 |

---

## 事件 (Events)

| 事件名 | 参数 | 说明 |
| :--- | :--- | :--- |
| `@update` | 无 | 检测到新版本并弹出更新弹窗时触发 |
| `@no-update` | 无 | 无新版本或接口返回无需更新时触发 |
| `@skipped` | `code: string, name: string` | 检测到新版本，但该版本已被用户设置跳过时触发（未弹窗） |
| `@cancel` | 无 | 用户取消更新或点击关闭按钮时触发 |
| `@skip-version` | `version: string` | 用户点击“跳过此版本”时触发，返回被跳过的版本代码 |
| `@fallback` | `{ title, description, downloadUrl }` | 命中紧急兜底更新配置时触发 |

---

## 实现要点

- **运行时底层技术**：纯 **UTS + UVUE** 原生运行，强类型安全
- **基础信息获取**：`uni.getAppBaseInfo()` 与 `uni.getDeviceInfo()`
- **HTTP 认证编码**：自研 **纯 UTS RFC 4648 Base64 算法**，0 依赖
- **文件流式下载**：`uni.downloadFile` 驱动 `onProgressUpdate` 进度
- **APK 安装调用**：Android 原生 **`uni.installApk`**
- **外部浏览器跳转**：Android 原生 `Intent(Intent.ACTION_VIEW)` 唤起
- **弹窗与动画**：UVUE 单类选择器与弹性盒布局，流畅无卡顿

---

## ⚙️ Android 安装权限配置

在 Android 8.0 及以上系统调用 `uni.installApk` 时，需确保在 `manifest.json` 的 Android 权限配置中声明未知来源应用安装权限：

```json
"android": {
    "permissions": [
        "<uses-permission android:name=\"android.permission.REQUEST_INSTALL_PACKAGES\"/>"
    ]
}
```

若未开启此权限，系统将自动拦截安装界面并提示安装失败。

---

<!-- props -->

---
{{xuyajun}}
