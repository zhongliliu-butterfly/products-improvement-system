import { resolve } from 'node:path'
import type { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import eslintPlugin from "vite-plugin-eslint";
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import NextDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import { createVitePwa } from './pwa'
import { createCompression } from './compression'
import { createAutoImport } from './autoImports'
import { createComponentPlugin } from './components'

/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_DEVTOOLS, VITE_PWA } = viteEnv
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    UnoCSS(),
    vueJsx(),
    // devTools
    VITE_DEVTOOLS && NextDevTools({ launchEditor: 'code' }),
    // esLint 报错信息显示在浏览器界面上
    // eslintPlugin(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 创建打包压缩配置
    createCompression(viteEnv),
    // 注入变量到 html 文件
    createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: VITE_GLOB_APP_TITLE },
      },
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    createAutoImport(),
    createComponentPlugin(),
    // vitePWA
    // VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && (visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }) as PluginOption),
  ]
}
