<script setup lang='ts'>
const props = defineProps<{ size: [], color: [] }>();
</script>

<template>
  <div class="feedback card flex-(col 1)">
    <el-row class="header" :gutter="16">
      <el-col class="item">
        <label class="text-little">尺码</label>
        <el-space>
          <span v-for="it in size" :key="it" class="tag">
            {{ it }}
          </span>
        </el-space>
      </el-col>
      <el-col class="item">
        <label class="text-little">颜色</label>
        <el-space>
          <span v-for="it in color" :key="it" class="tag">
            {{ it }}
          </span>
        </el-space>
      </el-col>
    </el-row>
    <!-- 评价分析tab -->
    <EvaluateAnalyse class="flex-1" />
  </div>
</template>

<style scoped lang='scss'>
.feedback {
  .header {
    border-bottom: 1px solid #F8F8FB;
    .item {
      @apply fc gap20 mb16px;
      .tag {
        padding: 8px 20px;
        font-size: 12px;
        color: $main-text-color;
        border:1px solid #E4E5EB;
        border-radius: 6px;
      }
    }
  }
}
</style>
