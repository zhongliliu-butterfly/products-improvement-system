<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useGlobalStore } from '@/stores/modules/global'
import type { LanguageType } from '@/stores/interface'

const i18n = useI18n()
const globalStore = useGlobalStore()
const language = computed(() => globalStore.language)

const languageList = [
  { label: '简体中文', value: 'zh' },
  { label: 'English', value: 'en' },
]

const changeLanguage = (lang: string) => {
  i18n.locale.value = lang
  globalStore.setGlobalState('language', lang as LanguageType)
}
</script>

<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <!-- <i class="iconfont icon-zhongyingwen toolBar-icon" /> -->
    <div class="icon fcc cur-p bg-[#F7F7FA] text-[#666666]">
      中/E
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.icon {
  width: 52px;
  height: 40px;
  border-radius: 4px;
}
</style>
