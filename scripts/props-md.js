// scripts/props-md.js - 生成组件 API 文档（Markdown）
// 从 .easycom.json 生成各自独立的 ATTRIBUTES.md
const path = require('node:path')
const fs = require('node:fs')
const { getDir } = require('./utils')

/**
 * 根据 easycom 中的 name 字段或组件目录名生成规范的 API 标题
 * 规则：去除 ste- 前缀，后续短横线单词转为首字母大写驼峰（PascalCase），再拼接 ' API'
 *
 * @param {string} rawName 原始组件名（如 'ste-tabs' / 'ste-tab' / 'ste-swipe-action'）
 * @returns {string} 格式化后的标题（如 'Tabs API' / 'Tab API' / 'SwipeAction API'）
 */
function getApiTitle(rawName) {
  if (!rawName) return 'API'
  // 1. 去除前面的 'ste-' 前缀
  const pure = rawName.replace(/^ste-/, '')
  // 2. 后续单词按连字符分割并转为首字母大写驼峰
  const pascal = pure
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  return pascal ? `${pascal} API` : 'API'
}

module.exports = function (components) {
  let generatedCount = 0


  components.forEach(component => {
    const filePath = path.join(getDir(), '/components', `${component}/${component}.easycom.json`)
    const configFilePath = path.join(getDir(), '/components', `${component}/config.json`)

    // 组件没有 easycom 和 config 文件为内置组件，无需提示和生成
    if (!fs.existsSync(filePath)) {
      if (fs.existsSync(configFilePath)) console.error(`组件【${component}】没有定义.easycom.json说明文件`)
      return
    }

    // 读取文件内容
    let content = fs.readFileSync(filePath, 'utf-8')
    if (!content) {
      console.error(`组件【${component}】的说明文件内容为空`)
      return
    }
    content = content.replaceAll('|', '/')
    const data = JSON.parse(content)

    if (data.attributes?.length) {
      let props = `### Props\n`
      props += `| 属性名 | 说明  | 类型 | 默认值  | 可选值 | 支持版本 |\n| ----- | ----- | --- | ------- | ------ | -------- |\n`
      let isProps = false

      let event = `### Events\n`
      event += `| 事件名 | 说明  | 事件参数 | 支持版本 |\n| ----- | ----- | ------- | -------- |\n`
      let isEvent = false

      let methods = `### Methods\n`
      methods += `| 方法名 | 说明  | 参数 | 返回值 | 支持版本 |\n| ----- | ----- | --- | ------ | -------- |\n`
      let isMethods = false

      let slots = `### Slots\n`
      slots += `| 插槽名 | 说明  | 参数 | 支持版本 |\n| ----- | ----- | --- | -------- |\n`
      let isSlots = false

      data.attributes.forEach(item => {
        const description = item.description || '-'
        const version = item.version ? `\`${item.version}\`` : '-'

        if (item.name?.indexOf('[event]') === 0) {
          isEvent = true
          const name = item.name.replace('[event]', '')
          const params = item.params?.length ? item.params.map(param => `\`${param.name}\`：${param.description}`).join('<br/>') : '-'
          event += `| \`${name}\` | ${description} | ${params} | ${version} |\n`
        } else if (item.name?.indexOf('[method]') === 0) {
          isMethods = true
          const name = item.name.replace('[method]', '')
          const params = item.params?.length ? item.params.map(param => `\`${param.name}\`：${param.description}`).join('<br/>') : '-'
          const returnValue = item.returnValue ? `\`${item.returnValue}\`` : '-'
          methods += `| \`${name}\` | ${description} | ${params} | ${returnValue} | ${version} |\n`
        } else if (item.name?.indexOf('[slot]') === 0) {
          isSlots = true
          const name = item.name.replace('[slot]', '')
          const params = item.params?.length ? item.params.map(param => `\`${param.name}\`：${param.description}`).join('<br/>') : '-'
          slots += `| \`${name}\` | ${description} | ${params} | ${version} |\n`
        } else {
          isProps = true
          const type = `\`${item.type}\``
          let def = '-'

          if (item.default !== undefined) {
            if (typeof item.default === 'object') {
              def = `\`${JSON.stringify(item.default)}\``
            } else if (item.type == '-') {
              def = `${item.default}`
            } else {
              def = `\`${item.default}\``
            }
          }

          const values = item.values?.length ? item.values.map(value => `\`${value.name}\`：${value.description}`).join('<br/>') : '-'
          props += `| \`${item.name}\` | ${description} | ${type} | ${def} | ${values} | ${version} |\n`
        }
      })

      props += '\n\n'
      event += '\n\n'
      methods += '\n\n'
      slots += '\n\n'

      const mdFile = path.join(getDir(), '/components', `${component}/ATTRIBUTES.md`)
      // 获取规范组件 API 标题（如 Tabs API、Tab API）
      const apiTitle = getApiTitle(data.name || component)
      let result = `## ${apiTitle}\n\n`
      result += isProps ? props : ''
      result += isEvent ? event : ''
      result += isMethods ? methods : ''
      result += isSlots ? slots : ''
      fs.writeFileSync(mdFile, result, 'utf-8')
      generatedCount++
    }
  })

  console.log(`[props-md] 已生成 ${generatedCount} 个组件的 ATTRIBUTES.md`)
}
