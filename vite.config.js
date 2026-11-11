import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

/**
 * HBuilderX 构建生命周期自动执行 Stellar 自动化脚本插件
 */
function stellarAutoScriptsPlugin() {
  let hasRun = false

  return {
    name: 'vite-plugin-stellar-auto-scripts',
    buildStart() {
      // 保证每次启动编译/开发服务器时只执行一次，避免热更新重复全量扫描
      if (!hasRun) {
        hasRun = true
        try {
          console.log('\n[HBuilderX 构建钩子] 自动触发 Stellar 自动化脚本...')
          const runAll = require('./scripts/index.js')
          runAll()
        } catch (err) {
          console.error('[HBuilderX 构建钩子] Stellar 脚本自动执行异常:', err)
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [
    uni(),
    stellarAutoScriptsPlugin()
  ]
})
