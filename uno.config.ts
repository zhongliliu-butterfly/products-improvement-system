import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  // @ts-expect-error
  presets: [presetUno(), presetAttributify(), presetExtra(), presetRemToPx({ baseFontSize: 4 })],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    [
      /^ell-(\d+)$/,
      ([, ell]) => ({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-line-clamp': ell,
        '-webkit-box-orient': 'vertical',
      }),
    ],
    [
      /^a-d-(\d+)$/,
      ([, delay]) => ({
        'animation-delay': `${delay}ms`,
      }),
    ],
    [
      /^flex-(\d+)$/,
      ([, d]) => ({
        flex: d,
      }),
    ],
  ],
  shortcuts: {
    'fcc': 'flex justify-center items-center',
    'fbc': 'flex justify-between items-center',
    'fjc': 'flex justify-center',
    'fc': 'flex items-center',
    'flex-col': 'flex flex-col',
    'f-col-c': 'flex-col justify-center items-center',
    'a-d': 'animated-delay',
    'trans-c': 'absolute top-50% right-50% -translate-x-1/2 -translate-y-1/2',
    'cur-p': 'cursor-pointer',
    'o-auto': 'overflow-auto',
    'o-hidden': 'overflow-hidden',
  },
  theme: {
    colors: {
      'primary': 'var(--primary)',
      'primary-b': 'var(--primary-b)',
      'success': 'var(--success)',
      'error': 'var(--error)',
      'main': 'var(--main)',
      'minor': 'var(--minor)',
      'little': 'var(--little)',
    },
    borderRadius: {
      '4xl': '20px',
    },
  },
})
