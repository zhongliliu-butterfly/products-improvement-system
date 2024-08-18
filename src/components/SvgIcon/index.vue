<script setup lang="ts" name="SvgIcon">
import { computed, useAttrs } from 'vue'

interface Props {
  icon: string
  className?: string
  size?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '20px',
  color: 'currentColor',
})

const attr: any = useAttrs()

function external(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const isExternal = computed(() => external(props.icon))

const styleExternalIcon = computed(() => ({
  'mask': `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
}))

const iconName = computed(() => `#icon-${props.icon}`)
</script>

<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon" :class="[className]"
  />
  <svg
    v-else
    class="svg-icon" :class="[className]"
    :style="attr.style"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: v-bind('props.size');
  height: v-bind('props.size');
  margin-right: 8px;
  overflow: hidden;
  color: v-bind('props.color');
  vertical-align: middle;
}
.svg-external-icon {
  display: inline-block;
  background-color: currentColor;
  mask-size: cover !important;
}
</style>
