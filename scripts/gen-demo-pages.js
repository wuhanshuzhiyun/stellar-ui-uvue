// scripts/gen-demo-pages.js - 自动生成 Demo 页面入口
// 扫描组件 config.json，生成导航配置、路由注册、骨架页面
const fs = require('node:fs')
const path = require('node:path')
const { getDir, getProjectRoot } = require('./utils')

// 组件分组定义（与原项目 componentGroups.json 对齐）
const componentGroups = {
  '基础组件': { group: '基础组件', key: 'basic', sort: 0 },
  '表单组件': { group: '表单组件', key: 'form', sort: 1 },
  '展示组件': { group: '展示组件', key: 'preview', sort: 2 },
  '导航组件': { group: '导航组件', key: 'navigation', sort: 3 },
  '电商组件': { group: '电商组件', key: 'ecommerce', sort: 4 },
  '数据组件': { group: '数据组件', key: 'data', sort: 5 },
  '图表组件': { group: '图表组件', key: 'chart', sort: 6 },
  '业务组件': { group: '业务组件', key: 'business', sort: 7 },
}

// demo 页面目录
const demoDir = path.join(getProjectRoot(), 'pages/demo')
const rootPagesJson = path.join(getProjectRoot(), 'pages.json')
const navJsonPath = path.join(getProjectRoot(), 'static/demo-nav.json')

/**
 * 扫描组件 config.json，生成导航数据
 */
function scanComponents() {
  const comdir = path.join(getDir(), '/components')
  const components = fs.readdirSync(comdir).filter(item => item.indexOf('ste-') === 0)

  const navItems = []
  const groupData = {}

  components.forEach(component => {
    const configPath = path.join(comdir, component, 'config.json')
    if (!fs.existsSync(configPath)) return

    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      const key = component.replace('ste-', '') // ste-button -> button

      navItems.push({
        key,
        title: config.title || key,
        group: config.group || '其他',
        sort: config.sort || 0,
        icon: config.icon || '',
        component, // ste-button
      })

      // 按组归类
      if (!groupData[config.group]) {
        const groupInfo = componentGroups[config.group] || { group: config.group, key: 'other', sort: 99 }
        groupData[config.group] = { ...groupInfo, contents: [] }
      }
      groupData[config.group].contents.push({
        key,
        title: config.title || key,
        sort: config.sort || 0,
        component,
      })
    } catch (e) {
      console.error(`解析 ${configPath} 失败:`, e.message)
    }
  })

  // 组内排序 + 组间排序
  Object.values(groupData).forEach(group => {
    group.contents.sort((a, b) => a.sort - b.sort)
  })
  const sortedGroups = Object.values(groupData).sort((a, b) => a.sort - b.sort)

  return { navItems, groups: sortedGroups }
}

/**
 * 生成 demo-nav.json 静态导航数据
 */
function generateNavJson(groups) {
  const navData = groups.map(group => ({
    group: group.group,
    key: group.key,
    sort: group.sort,
    contents: group.contents.map(c => ({
      key: c.key,
      title: c.title,
      component: c.component,
    })),
  }))

  fs.writeFileSync(navJsonPath, JSON.stringify(navData, null, 2), 'utf-8')
  console.log(`[gen-demo] 已生成 ${navJsonPath}（${groups.length} 个分组）`)
}

/**
 * 创建组件的骨架 demo 页面
 */
function createDemoPages(navItems) {
  if (!fs.existsSync(demoDir)) {
    fs.mkdirSync(demoDir, { recursive: true })
  }

  let created = 0
  let skipped = 0

  navItems.forEach(item => {
    const pageDir = path.join(demoDir, item.key)
    const pageFile = path.join(pageDir, `${item.key}.uvue`)

    // 已存在的页面不覆盖
    if (fs.existsSync(pageFile)) {
      skipped++
      return
    }

    // 创建目录
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true })
    }

    // 生成骨架页面
    const template = `<template>
\t<scroll-view scroll-y="true" class="page">
\t\t<view class="header">
\t\t\t<text class="title">${item.title}</text>
\t\t</view>
\t\t<view class="content">
\t\t\t<!-- TODO: 添加 ${item.component} 组件的 demo 用例 -->
\t\t</view>
\t</scroll-view>
</template>

<script setup lang="uts">
</script>

<style>
\t.page {
\t\tpadding: 20rpx;
\t}
\t.header {
\t\tmargin-bottom: 20rpx;
\t}
\t.title {
\t\tfont-size: 36rpx;
\t\tfont-weight: bold;
\t}
\t.content {
\t\tflex-direction: column;
\t}
</style>
`
    fs.writeFileSync(pageFile, template, 'utf-8')
    created++
  })

  console.log(`[gen-demo] 骨架页面：新建 ${created} 个，跳过 ${skipped} 个已存在`)
}

/**
 * 根据 demo 目录实际存在页面，更新 pages.json 的 subPackages
 */
function updatePagesJson() {
  let pagesJson
  try {
    let rawContent = fs.readFileSync(rootPagesJson, 'utf-8')
    // 移除 JSONC 注释（uni-app x 的 pages.json 支持注释）
    rawContent = rawContent.replace(/\/\/.*$/gm, '')
    rawContent = rawContent.replace(/\/\*[\s\S]*?\*\//g, '')
    pagesJson = JSON.parse(rawContent)
  } catch (e) {
    console.error('读取 pages.json 失败:', e.message)
    return
  }

  // 扫描 demo 页面目录
  const demoPages = []
  if (fs.existsSync(demoDir)) {
    const dirs = fs.readdirSync(demoDir)
    dirs.forEach(dirName => {
      const pageDir = path.join(demoDir, dirName)
      if (!fs.statSync(pageDir).isDirectory()) return

      // 检查 .uvue 或 .vue
      const uvue = path.join(pageDir, `${dirName}.uvue`)
      const vue = path.join(pageDir, `${dirName}.vue`)
      if (fs.existsSync(uvue) || fs.existsSync(vue)) {
        demoPages.push({
          path: `pages/demo/${dirName}/${dirName}`,
          style: { navigationBarTitleText: dirName },
        })
      }
    })
  }

  // 保留原有的主页面
  const mainPages = pagesJson.pages || []

  // 构建 subPackages
  const subPackages = []
  if (demoPages.length > 0) {
    subPackages.push({
      root: 'pages/demo',
      pages: demoPages.map(p => ({
        path: p.path.replace('pages/demo/', ''),
        style: p.style,
      })),
    })
  }

  // 更新 pagesJson
  pagesJson.pages = mainPages
  pagesJson.subPackages = subPackages

  fs.writeFileSync(rootPagesJson, JSON.stringify(pagesJson, null, '\t'), 'utf-8')
  console.log(`[gen-demo] 已更新 pages.json（主页面 ${mainPages.length} 个，demo 页面 ${demoPages.length} 个）`)
}

// 执行
function main() {
  console.log('--- 自动生成 Demo 页面 ---')
  const { navItems, groups } = scanComponents()
  generateNavJson(groups)
  createDemoPages(navItems)
  updatePagesJson()
  console.log('--- 生成完成 ---')
}

if (require.main === module) {
  main()
}

module.exports = main

