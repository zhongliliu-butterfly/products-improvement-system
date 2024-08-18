<script setup lang='ts'>
import EvaluateBarChart from './evaluateBarChart.vue'

const activeName = ref('negative')
</script>

<template>
  <div class="feedback card flex-(col 1)">
    <el-row class="header" :gutter="16">
      <el-col class="item">
        <label class="text-#999">尺码</label>
        <el-space>
          <span v-for="it in 6" :key="it" class="tag">
            X-Large{{ it }}
          </span>
        </el-space>
      </el-col>
      <el-col class="item">
        <label class="text-#999">颜色</label>
        <el-space>
          <span v-for="it in 6" :key="it" class="tag">
            蓝色{{ it }}
          </span>
        </el-space>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" class="feedback-tabs flex-1">
      <el-tab-pane label="差评分析" name="negative">
        <EvaluateBarChart />
        <EvaluateBarChart />
        <EvaluateBarChart />
      </el-tab-pane>
      <el-tab-pane label="好评分析" name="good">
        <template v-if="activeName === 'good'">
          <EvaluateBarChart />
          <EvaluateBarChart />
          <EvaluateBarChart />
        </template>
      </el-tab-pane>
    </el-tabs>
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
  &-tabs {
    .el-tab-pane{
      display:  flex;
      gap: 20px;
      height: 100%;
    }
  }
}
</style>
