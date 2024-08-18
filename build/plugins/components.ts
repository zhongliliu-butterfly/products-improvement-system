import Components from 'unplugin-vue-components/vite'

export const createComponentPlugin = () => {
  return Components({
    dts: 'types/components.d.ts',
    dirs: ['src/components'],
  })
}
