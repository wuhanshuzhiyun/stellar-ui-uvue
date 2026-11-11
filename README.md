<div align="center">
  <img alt="Stellar UI uvue" src="https://image.whzb.com/chain/StellarUI/logo.png" width="160">
</div>

<h1 align="center">Stellar UI uvue</h1>

<p align="center">基于 uni-app x（UTS / UVUE）的移动端组件库，本仓库收录组件库源码与配套演示工程。</p>

<p align="center">
  <a href="https://stellar-ui.intecloud.com.cn/?projectName=stellar-ui-uvue">文档网站</a>
</p>

---

## 仓库内容

| 目录 | 说明 |
| --- | --- |
| `uni_modules/stellar-ui-uvue/` | 组件库源码：`.uvue` 组件、`.uts` 工具与类型定义 |
| `pages/` | 演示工程页面：入口页与组件示例 |
| `static/` | 演示工程使用的静态资源 |
| `scripts/` | 演示工程与文档的自动化生成脚本 |
| `docs/` | 工程附带的说明资料 |

组件库以独立 npm 包形式发布，业务项目通过 npm 包接入。接入方式、组件说明与示例请查阅文档网站及组件目录内的文档。本仓库主要用于组件的开发、预览与文档验证。

## 运行演示工程

组件库的平台适配与验证以 App 端（Android / iOS）为准。使用 uni-app x 编译环境导入本仓库，运行到 App 端即可浏览组件示例。演示工程也可编译为 Web 静态站点，用于文档展示与部署，但 Web 端不作为组件库的平台兼容性承诺。

> 组件源码为 `.uvue` / `.uts` 文件，需要对应的 uni-app x 编译环境。

## 文档与维护约定

本文件是仓库的门面说明，只描述仓库定位、目录结构与入口，**不随组件库迭代更新**：

- 不记录组件的属性、方法、事件、示例与平台适配细节；
- 不记录版本信息、发布记录与变更清单；
- 新增组件、调整接口、发布版本时，无需修改本文件。

组件的完整说明由文档网站与组件目录内的文档承载。仓库内部分文件由自动化脚本生成，相关改动应从对应的配置源入手，避免直接编辑生成物。

## 贡献

欢迎通过 Issue 反馈问题、通过 Pull Request 参与改进。提交前请确认演示工程可以正常编译运行。

## 开源协议

许可信息见组件库目录内的说明。
