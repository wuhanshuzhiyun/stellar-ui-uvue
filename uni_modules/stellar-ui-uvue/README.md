<p align="center">
    <img alt="logo" src="https://image.whzb.com/chain/StellarUI/logo.png" width="200">
</p>
<h1 align="center">Stellar UI uvue</h1>

<p align="center">📱 一个基于 uni-app x (UTS/UVUE) 构建的 uni-app 组件库</p>

<p align="center">
  🚀 <a href="https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui-uvue">文档网站</a>&nbsp;

## ✨ 特性

-   🎯 面向 App 端（Android / iOS）设计，已针对 App 端完成适配与验证.
-   🚀 90+ 个高质量组件，覆盖移动端主流场景.
-   📖 提供丰富的文档和组件示例.
-   🎨 支持全局主题色与字号缩放配置（setThemeColor / setFontScale）.

## 📱 预览

组件库目前仅针对 App 端完成适配与验证。请在 uni-app x 编译环境中将演示工程运行到 App 端，浏览各组件示例；也可通过 [文档网站](https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui-uvue) 查看组件说明与示例。Web 端仅用于文档展示，不作为组件库的平台兼容性承诺。

## 平台支持

| 平台 | 状态 |
| --- | --- |
| App（Android / iOS） | ✅ 已完成适配与验证 |
| H5 / Web | ❌ 未做兼容性验证 |
| 微信小程序 / 支付宝小程序 / 其他小程序 | ❌ 未做兼容性验证 |

> 演示工程可以编译为 Web 静态站点，用于文档站展示与示例预览；这不等同于组件库对 Web 端提供兼容支持。

## 安装与使用

> 本组件库**仅支持 uni-app x (UTS/UVUE)**，不兼容传统 uni-app (Vue3) 项目。
> 组件为 `.uvue` 文件、工具与类型为 `.uts` 文件，需要 uni-app x 编译环境（HBuilderX 3.9+）。

### 安装

```bash
npm install stellar-ui-uvue -S
# pnpm add stellar-ui-uvue
# yarn add stellar-ui-uvue
```

### 配置 easycom

npm 包位于 `node_modules/`，不在 easycom 默认扫描范围内，请在项目 `pages.json` 中增加一条规则：

```json
{
    "easycom": {
        "autoscan": true,
        "custom": {
            "^ste-(.*)": "stellar-ui-uvue/components/ste-$1/ste-$1.uvue"
        }
    }
}
```

> 修改 `pages.json` 后请重新编译运行；若增量编译未生效，改动一次页面内容触发重新编译即可。

### 使用组件

配置完成后无需 `import`、无需注册，页面中直接使用：

```uvue
<template>
    <ste-button type="primary">按钮</ste-button>
    <ste-toast ref="toast"></ste-toast>
</template>
```

### 主入口与子路径

包主入口是**纯 UTS 模块**（不加载任何 `.uvue`），可直接引入工具函数、全局配置与命令式 API：

```uts
import { utils, getFontScale, setThemeColor, useToast, useMessageBox } from 'stellar-ui-uvue'
```

按需从子路径引入（路径均已在 `exports` 中声明）：

```uts
import utils from 'stellar-ui-uvue/utils/utils'
import { getFontScale } from 'stellar-ui-uvue/config'
import { useColorStore } from 'stellar-ui-uvue/store'
import type { RefCalendar } from 'stellar-ui-uvue/types/refComponents'
import type { UniImageMode } from 'stellar-ui-uvue/types/index'
import type { CategoryItem } from 'stellar-ui-uvue/components/ste-category/constants.uts'
import type { SteSelectSeatValue } from 'stellar-ui-uvue/components/ste-select-seat/types.uts'
import { useToast } from 'stellar-ui-uvue/components/ste-toast/use-toast.uts'
```

组件聚合入口（会引入全部 93 个 `.uvue`，仅在确实需要整体注册时使用）：

```uts
import { SteButton, SteToast } from 'stellar-ui-uvue/components'
```

### 手动引入单个组件（不配 easycom 时）

```uvue
<script setup lang="uts">
import SteButton from 'stellar-ui-uvue/components/ste-button/ste-button.uvue'
</script>
<template>
    <SteButton type="primary">按钮</SteButton>
</template>
```

### 图标字体

`ste-icon`、`ste-rate`、`ste-input` 等组件共用一套图标字体，由组件库内置的统一加载器从 CDN 加载（全库仅加载一次），**业务项目无需放置任何字体文件**。

> 字体从 `https://at.alicdn.com/t/c/font_4457057_74vgslmjyas.ttf` 加载，App 端运行时需要网络。

字体族名常量 `ICON_FONT_FAMILY`、幂等加载函数 `ensureIconFont()` 与状态查询 `getIconFontSource()` 从 `stellar-ui-uvue/components/ste-icon/iconfont.uts` 导出；`getIconFontSource()` 返回实际命中的来源，为空串表示尚未加载成功，可用于排查图标不显示的问题。

请勿在业务代码里另行调用 `uni.loadFontFace` 加载同一字体：并发加载同一来源会触发 `errCode 300001 same source task is loading`，导致两处都失败。

### 平台适配说明

组件库目前仅针对 App 端（Android / iOS）完成适配与验证。H5 / Web、微信小程序及其他小程序端均未做兼容性验证，暂不提供可用性承诺。

图标字体由 `uni.loadFontFace` 从远程 CDN 加载，App 端运行时需可访问网络。源码中少量平台专属能力仍保留条件编译隔离（例如 `ste-image` 与 `ste-media-preview` 的长按菜单属性），这些分支未在 App 之外的平台验证；各组件文档中出现的平台差异说明属于源码实现说明，不构成平台兼容性承诺。

详细说明见 [文档站](https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui-uvue)。

## 优秀案例

我们非常欢迎大家一起贡献优秀的 Demo 与案例，欢迎在此 [issue](https://github.com/wuhanshuzhiyun/stellar-ui-uvue/issues/1) 提交案例。

<table border="0">
	<tr>
		<td>
			<img width="250" src="https://image.whzb.com/chain/StellarUI/头像/邻里购.png" />
			<p>邻里购</p>
			<p>中百邻里购是中百旗下电商平台，主营蔬果、肉蛋、粮油、酒水、休食、家清、百货等，提供外卖、自提、包邮等商品服务，构建邻里生活服务圈。</p>
		</td>
		<td>
			<img width="250" src="https://image.whzb.com/chain/StellarUI/头像/百荟.png" />
			<p>抱抱生活</p>
			<p align="justify">抱抱生活是数智云公司自建的本地综合生活服务线上平台。集商业服务、生活服务、政务综合服务于一体的15分钟便民生活圈服务平台。&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</p>
		</td>
	</tr>
	<tr>
		<td>
			<img width="250" src="https://image.whzb.com/chain/StellarUI/头像/中百百货.png" />
			<p>中百百货线上商城</p>
			<p align="justify">中心百货大楼历经80余年的沧桑巨变，与时俱进，以新时尚、潮品牌、年轻态竭诚满足消费者购物休闲、娱乐餐饮等一站式需求，曾被国家商务部评定为“全国首批金鼎百货店”。&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</p>
			<div>&ensp;</div>
		</td>
		<td>
			<img width="250" src="https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手.png" />
			<p>数智云巡店助手</p>
			<p>建立一套连锁超市巡店助手系统，以满足社超总部、区域经理、区域督导的巡店需求，结合门店自查统计，社超营运中心通过巡店助手系统提供的支持数据，更好，更优，服务于社超店铺经营，从而实现武汉中百便利店有限公司整体经营利润的提升。</p>
		</td>
	</tr>
</table>

## 周边生态

| 项目 | 描述 |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [StellarUI](https://github.com/wuhanshuzhiyun/stellar-ui) | 同源的早期组件库项目 |
| [ste-vue-inset-loader](https://github.com/wuhanshuzhiyun/ste-vue-inset-loader) | 常用于小程序需要全局引入组件的场景的包 |
| [ste-helper](https://github.com/wuhanshuzhiyun/stellar-ui-uvue/tree/main/plugins/ste-helper) | 旨在帮助开发者更加有效率的使用 Stellar UI uvue 来开发项目的vscode插件 |
| [ste-cli](https://github.com/wuhanshuzhiyun/ste-cli) | stellar配套的脚手架 |

## 核心团队

以下是`Stellar UI uvue`的核心贡献者们：

<table  border="0">
<tr>
	<td>
		<p>
			<a>
				<img  width="90" height="90" style="border-radius:50%" src="https://image.whzb.com/chain/StellarUI/头像/费玉婷.png" />
			</a>
		</p>
		<p align="center">
			<a>费玉婷</a>
		</p>
	</td>
	<td>
		<p>
			<a target="_blank" href="https://github.com/HEXIAYUE">
				<img  width="90" height="90" style="border-radius:50%" src="https://image.whzb.com/chain/StellarUI/头像/秦鹏飞.png" />
			</a>
		</p>
		<p align="center">
			<a target="_blank" href="https://github.com/HEXIAYUE">秦鹏飞</a>
		</p>
	</td>
	<td>
		<p>
			<a target="_blank" href="https://github.com/zyydfaglory">
				<img  width="90" height="90" style="border-radius:50%" src="https://image.whzb.com/chain/StellarUI/头像/张园因.png" />
			</a>
		</p>
		<p align="center">
			<a target="_blank" href="https://github.com/zyydfaglory">张园因</a>
		</p>
	</td>
	<td>
		<p>
			<a target="_blank" href="https://github.com/woyou0712">
				<img  width="90" height="90" style="border-radius:50%" src="https://image.whzb.com/chain/StellarUI/头像/徐亚君.png" />
			</a>
		</p>
		<p align="center">
			<a target="_blank" href="https://github.com/woyou0712">徐亚君</a>
		</p>
	</td>
	<td>
		<p>
			<a target="_blank" href="https://github.com/fxxisme">
				<img  width="90" height="90" style="border-radius:50%" src="https://image.whzb.com/chain/StellarUI/头像/付宇威.png" />
			</a>
		</p>
		<p align="center">
			<a target="_blank" href="https://github.com/fxxisme">付宇威</a>
		</p>
	</td>
	<td>
		<p>
			<a>
				<img  width="90" height="90" style="border-radius:50%" src="https://image.whzb.com/chain/StellarUI/头像/鲍思睿.png" />
			</a>
		</p>
		<p align="center">
			<a>鲍思睿</a>
		</p>
	</td>
	<td>
		<p>
			<a>
				<img  width="90" height="90" style="border-radius:50%" src="https://image.whzb.com/chain/StellarUI/头像/齐巍.png" />
			</a>
		</p>
		<p align="center">
			<a>齐巍</a>
		</p>
	</td>
</tr>
</table>

### 贡献者们

感谢以下小伙伴们为 `Stellar UI uvue` 发展做出的贡献：

<a href="https://github.com/wuhanshuzhiyun/stellar-ui-uvue/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wuhanshuzhiyun/stellar-ui-uvue" alt="contributors">
</a>

## 鸣谢

-   [uni-helper](https://github.com/uni-helper) - 感谢 uni-helper 团队提供的 uni-app 工具库，让 Stellar UI uvue 能够更方便地使用。

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
