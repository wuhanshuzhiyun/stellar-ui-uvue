// scripts/utils.js - 工具函数
const path = require('node:path')

class Utils {
  /**
   * 获取工程根目录绝对路径 (优先取 HBuilderX 传入的环境变量，回退到脚本所在目录的上级目录)
   */
  static getProjectRoot() {
    return process.env.UNI_INPUT_DIR || path.resolve(__dirname, '..')
  }

  static convertToCamelCase(str) {
    return str
      .split('-')
      .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join('')
  }

  /**
   * 获取 stellar-ui-uvue 根目录
   * uni-app x 项目结构组件在 uni_modules/stellar-ui-uvue/ 下
   */
  static getDir(dir = 'uni_modules/stellar-ui-uvue') {
    return path.join(Utils.getProjectRoot(), dir)
  }

  /**
   * 获取演示页面目录
   */
  static getPagesDir() {
    return path.join(Utils.getProjectRoot(), 'pages')
  }
}

module.exports = Utils
