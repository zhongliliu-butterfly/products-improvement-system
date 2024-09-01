// vite.config.ts
import { resolve as resolve2 } from "node:path";
import { defineConfig, loadEnv } from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/vite/dist/node/index.js";
import dayjs from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/dayjs/dayjs.min.js";

// build/getEnv.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT")
      realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// build/proxy.ts
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// build/plugins/index.ts
import { resolve } from "node:path";
import { createHtmlPlugin } from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/vite-plugin-html/dist/index.mjs";
import { visualizer } from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createSvgIconsPlugin } from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import vue from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueSetupExtend from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
import NextDevTools from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import UnoCSS from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/unocss/dist/vite.mjs";

// build/plugins/compression.ts
import viteCompression from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/vite-plugin-compression/dist/index.mjs";
var createCompression = (viteEnv) => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  return plugins;
};

// build/plugins/autoImports.ts
import AutoImport from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/unplugin-auto-import/dist/vite.js";
var createAutoImport = () => {
  return AutoImport({
    imports: ["vue", "vue-router", "vue-i18n", "pinia", "@vueuse/core"],
    dts: "types/auto-imports.d.ts",
    dirs: ["src/components"]
  });
};

// build/plugins/components.ts
import Components from "file:///C:/Users/liuzhongli/Desktop/products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce/node_modules/unplugin-vue-components/dist/vite.js";
var createComponentPlugin = () => {
  return Components({
    dts: "types/components.d.ts",
    dirs: ["src/components"]
  });
};

// build/plugins/index.ts
var createVitePlugins = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_DEVTOOLS, VITE_PWA } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    UnoCSS(),
    vueJsx(),
    // devTools
    VITE_DEVTOOLS && NextDevTools({ launchEditor: "code" }),
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
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    createAutoImport(),
    createComponentPlugin(),
    // vitePWA
    // VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true })
  ];
};

// package.json
var package_default = {
  name: "products-improvement-system",
  type: "module",
  version: "0.0.1",
  private: true,
  engines: {
    node: ">=16.18.0"
  },
  scripts: {
    dev: "vite",
    serve: "vite",
    "build:dev": "vue-tsc && vite build --mode development",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vite build --mode production",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    preview: "pnpm build:dev && vite preview",
    "lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
    "lint:prettier": 'prettier --write "src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}"',
    "lint:stylelint": 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',
    "lint:lint-staged": "lint-staged",
    prepare: "husky install",
    release: "standard-version",
    commit: "git add -A && czg && git push"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.3.1",
    "@vueuse/core": "^10.11.0",
    axios: "^1.7.2",
    dayjs: "^1.11.11",
    "driver.js": "^1.3.1",
    echarts: "^5.5.1",
    "echarts-wordcloud": "^2.1.0",
    "element-plus": "^2.7.6",
    md5: "^2.3.0",
    mitt: "^3.0.1",
    nprogress: "^0.2.0",
    pinia: "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    qs: "^6.12.1",
    screenfull: "^6.0.2",
    sortablejs: "^1.15.2",
    vue: "^3.4.31",
    "vue-i18n": "^9.13.1",
    "vue-router": "^4.4.0",
    vuedraggable: "^4.1.0"
  },
  devDependencies: {
    "@antfu/eslint-config": "^2.25.1",
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "@types/md5": "^2.3.5",
    "@types/nprogress": "^0.2.3",
    "@types/qs": "^6.9.15",
    "@types/sortablejs": "^1.15.8",
    "@typescript-eslint/eslint-plugin": "^7.14.1",
    "@typescript-eslint/parser": "^7.14.1",
    "@unocss/eslint-config": "^0.61.9",
    "@unocss/preset-rem-to-px": "^0.62.1",
    "@unocss/reset": "^0.62.1",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    autoprefixer: "^10.4.19",
    "cz-git": "1.9.2",
    czg: "^1.9.2",
    eslint: "^8.57.0",
    husky: "^9.0.11",
    "lint-staged": "^15.2.5",
    postcss: "^8.4.38",
    "postcss-html": "^1.7.0",
    "postcss-px-to-viewport": "^1.1.1",
    "postcss-pxtorem": "^6.1.0",
    "rollup-plugin-visualizer": "^5.12.0",
    sass: "^1.77.6",
    stylelint: "^16.6.1",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-recess-order": "^5.0.1",
    "stylelint-config-recommended-scss": "^14.0.0",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard": "^36.0.0",
    "stylelint-config-standard-scss": "^13.1.0",
    typescript: "^5.5.2",
    unocss: "^0.61.9",
    "unocss-preset-extra": "^0.5.3",
    "unplugin-auto-import": "^0.18.2",
    "unplugin-vue-components": "^0.27.4",
    "unplugin-vue-setup-extend-plus": "^1.0.1",
    vite: "^5.3.2",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-html": "^3.2.2",
    "vite-plugin-pwa": "^0.20.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vue-devtools": "^7.3.5",
    "vue-tsc": "^2.0.22"
  },
  browserslist: {
    production: [
      "> 1%",
      "not dead",
      "not op_mini all"
    ],
    development: [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\liuzhongli\\Desktop\\products-improvement-system-master-36bda9b3ed85330965c45ebd561035f3550d71ce";
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: createVitePlugins(viteEnv),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      sourcemap: true,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2e3,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZ2V0RW52LnRzIiwgImJ1aWxkL3Byb3h5LnRzIiwgImJ1aWxkL3BsdWdpbnMvaW5kZXgudHMiLCAiYnVpbGQvcGx1Z2lucy9jb21wcmVzc2lvbi50cyIsICJidWlsZC9wbHVnaW5zL2F1dG9JbXBvcnRzLnRzIiwgImJ1aWxkL3BsdWdpbnMvY29tcG9uZW50cy50cyIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsaXV6aG9uZ2xpXFxcXERlc2t0b3BcXFxccHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsaXV6aG9uZ2xpXFxcXERlc2t0b3BcXFxccHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9saXV6aG9uZ2xpL0Rlc2t0b3AvcHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB0eXBlIHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXG5pbXBvcnQgeyB3cmFwcGVyRW52IH0gZnJvbSAnLi9idWlsZC9nZXRFbnYnXG5pbXBvcnQgeyBjcmVhdGVQcm94eSB9IGZyb20gJy4vYnVpbGQvcHJveHknXG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2lucyB9IGZyb20gJy4vYnVpbGQvcGx1Z2lucydcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbmNvbnN0IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSA9IHBrZ1xuY29uc3QgX19BUFBfSU5GT19fID0ge1xuICBwa2c6IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSxcbiAgbGFzdEJ1aWxkVGltZTogZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbn1cblxuLy8gQHNlZTogaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKVxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpXG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudilcblxuICByZXR1cm4ge1xuICAgIGJhc2U6IHZpdGVFbnYuVklURV9QVUJMSUNfUEFUSCxcbiAgICByb290LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgICAndnVlLWkxOG4nOiAndnVlLWkxOG4vZGlzdC92dWUtaTE4bi5janMuanMnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgX19BUFBfSU5GT19fOiBKU09OLnN0cmluZ2lmeShfX0FQUF9JTkZPX18pLFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL3N0eWxlcy92YXIuc2Nzc1wiO2AsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgICBwb3J0OiB2aXRlRW52LlZJVEVfUE9SVCxcbiAgICAgIG9wZW46IHZpdGVFbnYuVklURV9PUEVOLFxuICAgICAgY29yczogdHJ1ZSxcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eSh2aXRlRW52LlZJVEVfUFJPWFkpLFxuICAgIH0sXG4gICAgcGx1Z2luczogY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudiksXG4gICAgZXNidWlsZDoge1xuICAgICAgcHVyZTogdml0ZUVudi5WSVRFX0RST1BfQ09OU09MRSA/IFsnY29uc29sZS5sb2cnLCAnZGVidWdnZXInXSA6IFtdLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgbWluaWZ5OiAnZXNidWlsZCcsXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgICAvLyBcdTc5ODFcdTc1MjggZ3ppcCBcdTUzOEJcdTdGMjlcdTU5MjdcdTVDMEZcdTYyQTVcdTU0NEFcdUZGMENcdTUzRUZcdTc1NjVcdTVGQUVcdTUxQ0ZcdTVDMTFcdTYyNTNcdTUzMDVcdTY1RjZcdTk1RjRcbiAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcbiAgICAgIC8vIFx1ODlDNFx1NUI5QVx1ODlFNlx1NTNEMVx1OEI2Nlx1NTQ0QVx1NzY4NCBjaHVuayBcdTU5MjdcdTVDMEZcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMCxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgLy8gU3RhdGljIHJlc291cmNlIGNsYXNzaWZpY2F0aW9uIGFuZCBwYWNrYWdpbmdcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbGl1emhvbmdsaVxcXFxEZXNrdG9wXFxcXHByb2R1Y3RzLWltcHJvdmVtZW50LXN5c3RlbS1tYXN0ZXItMzZiZGE5YjNlZDg1MzMwOTY1YzQ1ZWJkNTYxMDM1ZjM1NTBkNzFjZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbGl1emhvbmdsaVxcXFxEZXNrdG9wXFxcXHByb2R1Y3RzLWltcHJvdmVtZW50LXN5c3RlbS1tYXN0ZXItMzZiZGE5YjNlZDg1MzMwOTY1YzQ1ZWJkNTYxMDM1ZjM1NTBkNzFjZVxcXFxidWlsZFxcXFxnZXRFbnYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2xpdXpob25nbGkvRGVza3RvcC9wcm9kdWN0cy1pbXByb3ZlbWVudC1zeXN0ZW0tbWFzdGVyLTM2YmRhOWIzZWQ4NTMzMDk2NWM0NWViZDU2MTAzNWYzNTUwZDcxY2UvYnVpbGQvZ2V0RW52LnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEZXZGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09ICdkZXZlbG9wbWVudCdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZEZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Rlc3RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09ICd0ZXN0J1xufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gZ2VuZXJhdGUgcGFja2FnZSBwcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlcG9ydE1vZGUoKTogYm9vbGVhbiB7XG4gIHJldHVybiBwcm9jZXNzLmVudi5WSVRFX1JFUE9SVCA9PT0gJ3RydWUnXG59XG5cbi8vIFJlYWQgYWxsIGVudmlyb25tZW50IHZhcmlhYmxlIGNvbmZpZ3VyYXRpb24gZmlsZXMgdG8gcHJvY2Vzcy5lbnZcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcbiAgY29uc3QgcmV0OiBhbnkgPSB7fVxuXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpXG4gICAgcmVhbE5hbWUgPSByZWFsTmFtZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IHJlYWxOYW1lID09PSAnZmFsc2UnID8gZmFsc2UgOiByZWFsTmFtZVxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QT1JUJylcbiAgICAgIHJlYWxOYW1lID0gTnVtYmVyKHJlYWxOYW1lKVxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QUk9YWScpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZSlcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnJvcikge31cbiAgICB9XG4gICAgcmV0W2Vudk5hbWVdID0gcmVhbE5hbWVcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogR2V0IHVzZXIgcm9vdCBkaXJlY3RvcnlcbiAqIEBwYXJhbSBkaXIgZmlsZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290UGF0aCguLi5kaXI6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgLi4uZGlyKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsaXV6aG9uZ2xpXFxcXERlc2t0b3BcXFxccHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsaXV6aG9uZ2xpXFxcXERlc2t0b3BcXFxccHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlXFxcXGJ1aWxkXFxcXHByb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9saXV6aG9uZ2xpL0Rlc2t0b3AvcHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlL2J1aWxkL3Byb3h5LnRzXCI7aW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJ1xuXG50eXBlIFByb3h5SXRlbSA9IFtzdHJpbmcsIHN0cmluZ11cblxudHlwZSBQcm94eUxpc3QgPSBQcm94eUl0ZW1bXVxuXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz5cblxuLyoqXG4gKiBcdTUyMUJcdTVFRkFcdTRFRTNcdTc0MDZcdUZGMENcdTc1MjhcdTRFOEVcdTg5RTNcdTY3OTAgLmVudi5kZXZlbG9wbWVudCBcdTRFRTNcdTc0MDZcdTkxNERcdTdGNkVcbiAqIEBwYXJhbSBsaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eShsaXN0OiBQcm94eUxpc3QgPSBbXSkge1xuICBjb25zdCByZXQ6IFByb3h5VGFyZ2V0TGlzdCA9IHt9XG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XG4gICAgY29uc3QgaHR0cHNSRSA9IC9eaHR0cHM6XFwvXFwvL1xuICAgIGNvbnN0IGlzSHR0cHMgPSBodHRwc1JFLnRlc3QodGFyZ2V0KVxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2h0dHAtcGFydHkvbm9kZS1odHRwLXByb3h5I29wdGlvbnNcbiAgICByZXRbcHJlZml4XSA9IHtcbiAgICAgIHRhcmdldCxcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIHdzOiB0cnVlLFxuICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7cHJlZml4fWApLCAnJyksXG4gICAgICAvLyBodHRwcyBpcyByZXF1aXJlIHNlY3VyZT1mYWxzZVxuICAgICAgLi4uKGlzSHR0cHMgPyB7IHNlY3VyZTogZmFsc2UgfSA6IHt9KSxcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldFxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsaXV6aG9uZ2xpXFxcXERlc2t0b3BcXFxccHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxpdXpob25nbGlcXFxcRGVza3RvcFxcXFxwcm9kdWN0cy1pbXByb3ZlbWVudC1zeXN0ZW0tbWFzdGVyLTM2YmRhOWIzZWQ4NTMzMDk2NWM0NWViZDU2MTAzNWYzNTUwZDcxY2VcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGl1emhvbmdsaS9EZXNrdG9wL3Byb2R1Y3RzLWltcHJvdmVtZW50LXN5c3RlbS1tYXN0ZXItMzZiZGE5YjNlZDg1MzMwOTY1YzQ1ZWJkNTYxMDM1ZjM1NTBkNzFjZS9idWlsZC9wbHVnaW5zL2luZGV4LnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJ1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG4vLyBpbXBvcnQgZXNsaW50UGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1lc2xpbnRcIjtcbmltcG9ydCB2dWVTZXR1cEV4dGVuZCBmcm9tICd1bnBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kLXBsdXMvdml0ZSdcbmltcG9ydCBOZXh0RGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCB7IGNyZWF0ZVZpdGVQd2EgfSBmcm9tICcuL3B3YSdcbmltcG9ydCB7IGNyZWF0ZUNvbXByZXNzaW9uIH0gZnJvbSAnLi9jb21wcmVzc2lvbidcbmltcG9ydCB7IGNyZWF0ZUF1dG9JbXBvcnQgfSBmcm9tICcuL2F1dG9JbXBvcnRzJ1xuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50UGx1Z2luIH0gZnJvbSAnLi9jb21wb25lbnRzJ1xuXG4vKipcbiAqIFx1NTIxQlx1NUVGQSB2aXRlIFx1NjNEMlx1NEVGNlxuICogQHBhcmFtIHZpdGVFbnZcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVZpdGVQbHVnaW5zID0gKHZpdGVFbnY6IFZpdGVFbnYpOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10gPT4ge1xuICBjb25zdCB7IFZJVEVfR0xPQl9BUFBfVElUTEUsIFZJVEVfUkVQT1JULCBWSVRFX0RFVlRPT0xTLCBWSVRFX1BXQSB9ID0gdml0ZUVudlxuICByZXR1cm4gW1xuICAgIHZ1ZSgpLFxuICAgIC8vIHZ1ZSBcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjgganN4L3RzeCBcdThCRURcdTZDRDVcbiAgICBVbm9DU1MoKSxcbiAgICB2dWVKc3goKSxcbiAgICAvLyBkZXZUb29sc1xuICAgIFZJVEVfREVWVE9PTFMgJiYgTmV4dERldlRvb2xzKHsgbGF1bmNoRWRpdG9yOiAnY29kZScgfSksXG4gICAgLy8gZXNMaW50IFx1NjJBNVx1OTUxOVx1NEZFMVx1NjA2Rlx1NjYzRVx1NzkzQVx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NzU0Q1x1OTc2Mlx1NEUwQVxuICAgIC8vIGVzbGludFBsdWdpbigpLFxuICAgIC8vIG5hbWUgXHU1M0VGXHU0RUU1XHU1MTk5XHU1NzI4IHNjcmlwdCBcdTY4MDdcdTdCN0VcdTRFMEFcbiAgICB2dWVTZXR1cEV4dGVuZCh7fSksXG4gICAgLy8gXHU1MjFCXHU1RUZBXHU2MjUzXHU1MzA1XHU1MzhCXHU3RjI5XHU5MTREXHU3RjZFXG4gICAgY3JlYXRlQ29tcHJlc3Npb24odml0ZUVudiksXG4gICAgLy8gXHU2Q0U4XHU1MTY1XHU1M0Q4XHU5MUNGXHU1MjMwIGh0bWwgXHU2NTg3XHU0RUY2XG4gICAgY3JlYXRlSHRtbFBsdWdpbih7XG4gICAgICBtaW5pZnk6IHRydWUsXG4gICAgICBpbmplY3Q6IHtcbiAgICAgICAgZGF0YTogeyB0aXRsZTogVklURV9HTE9CX0FQUF9USVRMRSB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICAvLyBcdTRGN0ZcdTc1Mjggc3ZnIFx1NTZGRVx1NjgwN1xuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgIH0pLFxuICAgIGNyZWF0ZUF1dG9JbXBvcnQoKSxcbiAgICBjcmVhdGVDb21wb25lbnRQbHVnaW4oKSxcbiAgICAvLyB2aXRlUFdBXG4gICAgLy8gVklURV9QV0EgJiYgY3JlYXRlVml0ZVB3YSh2aXRlRW52KSxcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTc1MUZcdTYyMTBcdTUzMDVcdTk4ODRcdTg5QzhcdUZGMENcdTUyMDZcdTY3OTBcdTRGOURcdThENTZcdTUzMDVcdTU5MjdcdTVDMEZcdTUwNUFcdTRGMThcdTUzMTZcdTU5MDRcdTc0MDZcbiAgICBWSVRFX1JFUE9SVCAmJiAodmlzdWFsaXplcih7IGZpbGVuYW1lOiAnc3RhdHMuaHRtbCcsIGd6aXBTaXplOiB0cnVlLCBicm90bGlTaXplOiB0cnVlIH0pIGFzIFBsdWdpbk9wdGlvbiksXG4gIF1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbGl1emhvbmdsaVxcXFxEZXNrdG9wXFxcXHByb2R1Y3RzLWltcHJvdmVtZW50LXN5c3RlbS1tYXN0ZXItMzZiZGE5YjNlZDg1MzMwOTY1YzQ1ZWJkNTYxMDM1ZjM1NTBkNzFjZVxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsaXV6aG9uZ2xpXFxcXERlc2t0b3BcXFxccHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcY29tcHJlc3Npb24udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2xpdXpob25nbGkvRGVza3RvcC9wcm9kdWN0cy1pbXByb3ZlbWVudC1zeXN0ZW0tbWFzdGVyLTM2YmRhOWIzZWQ4NTMzMDk2NWM0NWViZDU2MTAzNWYzNTUwZDcxY2UvYnVpbGQvcGx1Z2lucy9jb21wcmVzc2lvbi50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBcdTY4MzlcdTYzNkUgY29tcHJlc3MgXHU5MTREXHU3RjZFXHVGRjBDXHU3NTFGXHU2MjEwXHU0RTBEXHU1NDBDXHU3Njg0XHU1MzhCXHU3RjI5XHU4OUM0XHU1MjE5XG4gKiBAcGFyYW0gdml0ZUVudlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQ29tcHJlc3Npb24gPSAodml0ZUVudjogVml0ZUVudik6IFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdID0+IHtcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTID0gJ25vbmUnLCBWSVRFX0JVSUxEX0NPTVBSRVNTX0RFTEVURV9PUklHSU5fRklMRSB9ID0gdml0ZUVudlxuICBjb25zdCBjb21wcmVzc0xpc3QgPSBWSVRFX0JVSUxEX0NPTVBSRVNTLnNwbGl0KCcsJylcbiAgY29uc3QgcGx1Z2luczogUGx1Z2luT3B0aW9uW10gPSBbXVxuICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcbiAgICBwbHVnaW5zLnB1c2goXG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgICBleHQ6ICcuZ3onLFxuICAgICAgICBhbGdvcml0aG06ICdnemlwJyxcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZTogVklURV9CVUlMRF9DT01QUkVTU19ERUxFVEVfT1JJR0lOX0ZJTEUsXG4gICAgICB9KSxcbiAgICApXG4gIH1cbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcygnYnJvdGxpJykpIHtcbiAgICBwbHVnaW5zLnB1c2goXG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgICBleHQ6ICcuYnInLFxuICAgICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFLFxuICAgICAgfSksXG4gICAgKVxuICB9XG4gIHJldHVybiBwbHVnaW5zXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxpdXpob25nbGlcXFxcRGVza3RvcFxcXFxwcm9kdWN0cy1pbXByb3ZlbWVudC1zeXN0ZW0tbWFzdGVyLTM2YmRhOWIzZWQ4NTMzMDk2NWM0NWViZDU2MTAzNWYzNTUwZDcxY2VcXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbGl1emhvbmdsaVxcXFxEZXNrdG9wXFxcXHByb2R1Y3RzLWltcHJvdmVtZW50LXN5c3RlbS1tYXN0ZXItMzZiZGE5YjNlZDg1MzMwOTY1YzQ1ZWJkNTYxMDM1ZjM1NTBkNzFjZVxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXGF1dG9JbXBvcnRzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9saXV6aG9uZ2xpL0Rlc2t0b3AvcHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlL2J1aWxkL3BsdWdpbnMvYXV0b0ltcG9ydHMudHNcIjtpbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQXV0b0ltcG9ydCA9ICgpID0+IHtcbiAgcmV0dXJuIEF1dG9JbXBvcnQoe1xuICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAndnVlLWkxOG4nLCAncGluaWEnLCAnQHZ1ZXVzZS9jb3JlJ10sXG4gICAgZHRzOiAndHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcbiAgfSlcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbGl1emhvbmdsaVxcXFxEZXNrdG9wXFxcXHByb2R1Y3RzLWltcHJvdmVtZW50LXN5c3RlbS1tYXN0ZXItMzZiZGE5YjNlZDg1MzMwOTY1YzQ1ZWJkNTYxMDM1ZjM1NTBkNzFjZVxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsaXV6aG9uZ2xpXFxcXERlc2t0b3BcXFxccHJvZHVjdHMtaW1wcm92ZW1lbnQtc3lzdGVtLW1hc3Rlci0zNmJkYTliM2VkODUzMzA5NjVjNDVlYmQ1NjEwMzVmMzU1MGQ3MWNlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcY29tcG9uZW50cy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGl1emhvbmdsaS9EZXNrdG9wL3Byb2R1Y3RzLWltcHJvdmVtZW50LXN5c3RlbS1tYXN0ZXItMzZiZGE5YjNlZDg1MzMwOTY1YzQ1ZWJkNTYxMDM1ZjM1NTBkNzFjZS9idWlsZC9wbHVnaW5zL2NvbXBvbmVudHMudHNcIjtpbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ29tcG9uZW50UGx1Z2luID0gKCkgPT4ge1xuICByZXR1cm4gQ29tcG9uZW50cyh7XG4gICAgZHRzOiAndHlwZXMvY29tcG9uZW50cy5kLnRzJyxcbiAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJ10sXG4gIH0pXG59XG4iLCAie1xuICBcIm5hbWVcIjogXCJwcm9kdWN0cy1pbXByb3ZlbWVudC1zeXN0ZW1cIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MTYuMTguMFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJzZXJ2ZVwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkOmRldlwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgZGV2ZWxvcG1lbnRcIixcbiAgICBcImJ1aWxkOnRlc3RcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIHRlc3RcIixcbiAgICBcImJ1aWxkOnByb1wiOiBcInZpdGUgYnVpbGQgLS1tb2RlIHByb2R1Y3Rpb25cIixcbiAgICBcInR5cGU6Y2hlY2tcIjogXCJ2dWUtdHNjIC0tbm9FbWl0IC0tc2tpcExpYkNoZWNrXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwicG5wbSBidWlsZDpkZXYgJiYgdml0ZSBwcmV2aWV3XCIsXG4gICAgXCJsaW50OmVzbGludFwiOiBcImVzbGludCAtLWZpeCAtLWV4dCAuanMsLnRzLC52dWUgLi9zcmNcIixcbiAgICBcImxpbnQ6cHJldHRpZXJcIjogXCJwcmV0dGllciAtLXdyaXRlIFxcXCJzcmMvKiovKi57anMsdHMsanNvbix0c3gsY3NzLGxlc3Msc2Nzcyx2dWUsaHRtbCxtZH1cXFwiXCIsXG4gICAgXCJsaW50OnN0eWxlbGludFwiOiBcInN0eWxlbGludCAtLWNhY2hlIC0tZml4IFxcXCIqKi8qLnt2dWUsbGVzcyxwb3N0Y3NzLGNzcyxzY3NzfVxcXCIgLS1jYWNoZSAtLWNhY2hlLWxvY2F0aW9uIG5vZGVfbW9kdWxlcy8uY2FjaGUvc3R5bGVsaW50L1wiLFxuICAgIFwibGludDpsaW50LXN0YWdlZFwiOiBcImxpbnQtc3RhZ2VkXCIsXG4gICAgXCJwcmVwYXJlXCI6IFwiaHVza3kgaW5zdGFsbFwiLFxuICAgIFwicmVsZWFzZVwiOiBcInN0YW5kYXJkLXZlcnNpb25cIixcbiAgICBcImNvbW1pdFwiOiBcImdpdCBhZGQgLUEgJiYgY3pnICYmIGdpdCBwdXNoXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIjogXCJeMi4zLjFcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC4xMS4wXCIsXG4gICAgXCJheGlvc1wiOiBcIl4xLjcuMlwiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMVwiLFxuICAgIFwiZHJpdmVyLmpzXCI6IFwiXjEuMy4xXCIsXG4gICAgXCJlY2hhcnRzXCI6IFwiXjUuNS4xXCIsXG4gICAgXCJlY2hhcnRzLXdvcmRjbG91ZFwiOiBcIl4yLjEuMFwiLFxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuNy42XCIsXG4gICAgXCJtZDVcIjogXCJeMi4zLjBcIixcbiAgICBcIm1pdHRcIjogXCJeMy4wLjFcIixcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcbiAgICBcInBpbmlhLXBsdWdpbi1wZXJzaXN0ZWRzdGF0ZVwiOiBcIl4zLjIuMVwiLFxuICAgIFwicXNcIjogXCJeNi4xMi4xXCIsXG4gICAgXCJzY3JlZW5mdWxsXCI6IFwiXjYuMC4yXCIsXG4gICAgXCJzb3J0YWJsZWpzXCI6IFwiXjEuMTUuMlwiLFxuICAgIFwidnVlXCI6IFwiXjMuNC4zMVwiLFxuICAgIFwidnVlLWkxOG5cIjogXCJeOS4xMy4xXCIsXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuNC4wXCIsXG4gICAgXCJ2dWVkcmFnZ2FibGVcIjogXCJeNC4xLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYW50ZnUvZXNsaW50LWNvbmZpZ1wiOiBcIl4yLjI1LjFcIixcbiAgICBcIkBjb21taXRsaW50L2NsaVwiOiBcIl4xOC40LjNcIixcbiAgICBcIkBjb21taXRsaW50L2NvbmZpZy1jb252ZW50aW9uYWxcIjogXCJeMTguNC4zXCIsXG4gICAgXCJAdHlwZXMvbWQ1XCI6IFwiXjIuMy41XCIsXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4zXCIsXG4gICAgXCJAdHlwZXMvcXNcIjogXCJeNi45LjE1XCIsXG4gICAgXCJAdHlwZXMvc29ydGFibGVqc1wiOiBcIl4xLjE1LjhcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjcuMTQuMVwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl43LjE0LjFcIixcbiAgICBcIkB1bm9jc3MvZXNsaW50LWNvbmZpZ1wiOiBcIl4wLjYxLjlcIixcbiAgICBcIkB1bm9jc3MvcHJlc2V0LXJlbS10by1weFwiOiBcIl4wLjYyLjFcIixcbiAgICBcIkB1bm9jc3MvcmVzZXRcIjogXCJeMC42Mi4xXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjRcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeMy4xLjBcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXG4gICAgXCJjei1naXRcIjogXCIxLjkuMlwiLFxuICAgIFwiY3pnXCI6IFwiXjEuOS4yXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ny4wXCIsXG4gICAgXCJodXNreVwiOiBcIl45LjAuMTFcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuNVwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzhcIixcbiAgICBcInBvc3Rjc3MtaHRtbFwiOiBcIl4xLjcuMFwiLFxuICAgIFwicG9zdGNzcy1weC10by12aWV3cG9ydFwiOiBcIl4xLjEuMVwiLFxuICAgIFwicG9zdGNzcy1weHRvcmVtXCI6IFwiXjYuMS4wXCIsXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMi4wXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNzcuNlwiLFxuICAgIFwic3R5bGVsaW50XCI6IFwiXjE2LjYuMVwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1odG1sXCI6IFwiXjEuMS4wXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY2Vzcy1vcmRlclwiOiBcIl41LjAuMVwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1yZWNvbW1lbmRlZC1zY3NzXCI6IFwiXjE0LjAuMFwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1yZWNvbW1lbmRlZC12dWVcIjogXCJeMS41LjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmRcIjogXCJeMzYuMC4wXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkLXNjc3NcIjogXCJeMTMuMS4wXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNS4yXCIsXG4gICAgXCJ1bm9jc3NcIjogXCJeMC42MS45XCIsXG4gICAgXCJ1bm9jc3MtcHJlc2V0LWV4dHJhXCI6IFwiXjAuNS4zXCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE4LjJcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjcuNFwiLFxuICAgIFwidW5wbHVnaW4tdnVlLXNldHVwLWV4dGVuZC1wbHVzXCI6IFwiXjEuMC4xXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMy4yXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tZXNsaW50XCI6IFwiXjEuOC4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1odG1sXCI6IFwiXjMuMi4yXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1wd2FcIjogXCJeMC4yMC4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICBcInZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29sc1wiOiBcIl43LjMuNVwiLFxuICAgIFwidnVlLXRzY1wiOiBcIl4yLjAuMjJcIlxuICB9LFxuICBcImJyb3dzZXJzbGlzdFwiOiB7XG4gICAgXCJwcm9kdWN0aW9uXCI6IFtcbiAgICAgIFwiPiAxJVwiLFxuICAgICAgXCJub3QgZGVhZFwiLFxuICAgICAgXCJub3Qgb3BfbWluaSBhbGxcIlxuICAgIF0sXG4gICAgXCJkZXZlbG9wbWVudFwiOiBbXG4gICAgICBcImxhc3QgMSBjaHJvbWUgdmVyc2lvblwiLFxuICAgICAgXCJsYXN0IDEgZmlyZWZveCB2ZXJzaW9uXCIsXG4gICAgICBcImxhc3QgMSBzYWZhcmkgdmVyc2lvblwiXG4gICAgXVxuICB9LFxuICBcImNvbmZpZ1wiOiB7XG4gICAgXCJjb21taXRpemVuXCI6IHtcbiAgICAgIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9jei1naXRcIlxuICAgIH1cbiAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBaWYsU0FBUyxXQUFBQSxnQkFBZTtBQUV6Z0IsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXOzs7QUNtQlgsU0FBUyxXQUFXLFNBQThCO0FBQ3ZELFFBQU0sTUFBVyxDQUFDO0FBRWxCLGFBQVcsV0FBVyxPQUFPLEtBQUssT0FBTyxHQUFHO0FBQzFDLFFB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
