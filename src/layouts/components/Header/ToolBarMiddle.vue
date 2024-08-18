<script setup lang='ts'>
import { Search } from '@element-plus/icons-vue'

const input = ref('')
</script>

<template>
  <div class="search">
    <el-input
      v-model="input"
      size="large"
      style="width: 440px"
      placeholder="请输入您想搜索内容的关键词"
      :suffix-icon="Search"
    />
  </div>
</template>

<style scoped lang='scss'>
.search {
  :deep(.el-input__wrapper) {
    background-color: #F7F7FA;
  }
}

// #F7F7FA
</style>
