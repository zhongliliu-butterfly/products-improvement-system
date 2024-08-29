<!-- 评价分析 -->
<script setup lang='ts' name='EvaluateAnalyse'>
import http from "@/api";
const activeName = ref('negative')
const route = useRoute();
const parent_asin = route.params.parent_asin;

onMounted( async () => {
  // 差评/好评分析
  const reviews_analysis = await http.get(`/system/reviews_analysis`, {
    flag:activeName.value==='negative'?0:1,
    parent_asin: parent_asin,
    // min_data:"2024-08-09",
    // max_data:"2024-08-10",
    // interval_date: dateValue.value,
    // color:'',
    // size:''
  });
  for (var i in reviews_analysis.data) {

  }
})
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
