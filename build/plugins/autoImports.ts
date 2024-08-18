import AutoImport from 'unplugin-auto-import/vite'

export const createAutoImport = () => {
  return AutoImport({
    imports: ['vue', 'vue-router', 'vue-i18n', 'pinia', '@vueuse/core'],
    dts: 'types/auto-imports.d.ts',
    dirs: ['src/components'],
  })
}
