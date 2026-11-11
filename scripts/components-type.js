// scripts/components-type.js - 生成组件类型声明
// 适配 uni-app x：优先使用 .uvue，回退到 .vue
const fs = require('node:fs')
const path = require('node:path')
const { convertToCamelCase, getDir } = require('./utils')

/**
 * 生成组件类型声明内容
 * @param {string[]} components - 组件名称列表
 * @returns {Object} 包含各种生成内容的对象
 */
function generateContent(components) {
  let importStr = ''
  let comType = ''
  let refType = ''
  let exportCom = ''

  components.forEach((component) => {
    const name = convertToCamelCase(component)
    const type = name.charAt(0).toUpperCase() + name.slice(1)
    const refTypeName = type.replace(/^Ste/, 'Ref')

    // uni-app x 优先使用 .uvue，回退到 .vue
    const uvuePath = path.join(getDir(), '/components', component, `${component}.uvue`)
    const ext = fs.existsSync(uvuePath) ? '.uvue' : '.vue'

    importStr += `import ${name} from "../components/${component}/${component}${ext}"\n`
    comType += `\t\t${type}: typeof ${name};\n`
    refType += `export type ${refTypeName} = InstanceType<typeof ${name}>\n`
    exportCom += `import ${name} from "./components/${component}/${component}${ext}"\nexport const ${type} = ${name}\n`
  })

  const globalComponentsType = `
  import '@vue/runtime-core'

  declare module '@vue/runtime-core' {
    export interface GlobalComponents {
      ${comType}  
    }
  }
    
  `

  return { importStr, globalComponentsType, refType, exportCom }
}

/**
 * 写入生成的文件
 * @param {Object} content - 生成的内容对象
 */
function writeFiles(content) {
  const { importStr, globalComponentsType, refType, exportCom } = content
  const baseDir = getDir()

  // 确保 types 目录存在
  const typesDir = path.join(baseDir, '/types')
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true })
  }

  fs.writeFileSync(
    path.join(baseDir, '/types/components.d.ts'),
    importStr + globalComponentsType
  )

  fs.writeFileSync(
    path.join(baseDir, '/types/refComponents.d.ts'),
    importStr + refType
  )

  fs.writeFileSync(
    path.join(baseDir, '/index.ts'),
    exportCom
  )

  console.log(`[components-type] 已生成类型声明文件（共扫描 ${importStr.split('\n').length - 1} 个组件）`)
}

module.exports = function (components) {
  try {
    const content = generateContent(components)
    writeFiles(content)
  } catch (error) {
    console.error('生成组件类型失败:', error)
  }
}
