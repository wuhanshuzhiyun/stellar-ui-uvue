// scripts/view-pages.js - 生成演示页面代码的 Base64 编码
// 适配 uni-app x：扫描 pages/ 下 .uvue 和 .vue 文件
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const { getPagesDir } = require('./utils')

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

/**
 * Base64 编码（支持中文及特殊字符）
 */
function base64Encode(str) {
  try {
    const utf8Bytes = new TextEncoder().encode(str)
    let binaryString = ''
    for (let i = 0; i < utf8Bytes.length; i++) {
      binaryString += String.fromCharCode(utf8Bytes[i])
    }
    return btoa(binaryString)
  } catch (error) {
    console.error('Base64编码失败:', error)
    throw error
  }
}

async function viewPages() {
  const dir = getPagesDir()

  try {
    if (!fs.existsSync(dir)) {
      console.warn(`[view-pages] 演示页面目录不存在: ${dir}，跳过`)
      return
    }

    const pages = await readdir(dir)
    let processedCount = 0

    await Promise.all(
      pages.map(async name => {
        try {
          const pageDir = path.join(dir, name)

          // 确保是目录
          const stat = fs.statSync(pageDir)
          if (!stat.isDirectory()) return

          // uni-app x 优先使用 .uvue，回退到 .vue
          const uvueFile = path.join(pageDir, `${name}.uvue`)
          const vueFile = path.join(pageDir, `${name}.vue`)
          const sourceFile = fs.existsSync(uvueFile) ? uvueFile : vueFile

          if (!fs.existsSync(sourceFile)) return

          const outputFile = path.join(pageDir, `page_code.json`)

          let code = await readFile(sourceFile, 'utf8')
          code = code.replace(/@\/uni_modules\/stellar-ui-uvue/g, 'stellar-ui-uvue')
          const encoded = base64Encode(code)

          await writeFile(outputFile, JSON.stringify({ code: encoded }, null, 2))
          processedCount++
        } catch (error) {
          console.error(`[view-pages] 处理页面 ${name} 失败:`, error)
        }
      })
    )

    console.log(`[view-pages] 已处理 ${processedCount} 个演示页面`)
  } catch (error) {
    console.error('[view-pages] 处理页面失败:', error)
  }
}

module.exports = viewPages
