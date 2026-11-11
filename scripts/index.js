// scripts/index.js - 自动化生成脚本入口
// 用法: node scripts/index.js 或在 Vite 插件中自动调用

const fs = require('node:fs')
const path = require('node:path')
const { getDir, getProjectRoot } = require('./utils')
const componentsType = require('./components-type')
const propsMd = require('./props-md')
const viewPages = require('./view-pages')
const genDemoPages = require('./gen-demo-pages')

/**
 * 执行所有自动化生成任务
 */
function runAll() {
  console.log('===== Stellar UI uvue 自动化生成脚本 =====')
  console.log(`项目根目录: ${getProjectRoot()}`)
  console.log(`组件库目录: ${getDir()}`)
  console.log('')

  // 获取组件列表
  const comdir = path.join(getDir(), '/components')
  if (!fs.existsSync(comdir)) {
    console.error(`组件目录不存在: ${comdir}`)
    return
  }
  const components = fs.readdirSync(comdir).filter(item => item.indexOf('ste-') === 0)
  console.log(`发现 ${components.length} 个组件\n`)

  // 依次执行生成任务
  console.log('--- 1. 生成组件类型声明 ---')
  componentsType(components)

  console.log('\n--- 2. 生成组件 API 文档 ---')
  propsMd(components)

  console.log('\n--- 3. 生成演示页面编码 ---')
  viewPages()

  console.log('\n--- 4. 生成 Demo 页面骨架 + 路由 + 导航 ---')
  genDemoPages()

  console.log('\n===== 自动化脚本执行完成 =====\n')
}

// 支持直接命令行执行 node scripts/index.js
if (require.main === module) {
  runAll()
}

module.exports = runAll
