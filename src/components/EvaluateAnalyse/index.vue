<!-- 评价分析 -->
<script setup lang='ts' name='EvaluateAnalyse'>
const activeName = ref('negative')
</script>

<template>
  <!-- <div class=""> -->
  <el-tabs v-model="activeName" class="feedback-tabs h-full min-h-300 w-full">
    <el-tab-pane label="差评分析" name="negative">
      <EvaluatePieBarChart v-for="(it, index) in 3" :key="it" :current-index="index" />
    </el-tab-pane>
    <el-tab-pane label="好评分析" name="good">
      <template v-if="activeName === 'good'">
        <EvaluatePieBarChart v-for="(it, index) in 3" :key="it" :current-index="index" />
      </template>
    </el-tab-pane>
  </el-tabs>
  <!-- </div> -->
</template>

<style scoped lang='scss'>
.el-tabs {
    .el-tab-pane{
      display:  flex;
      gap: 20px;
      height: 100%;
    }
}
</style>
