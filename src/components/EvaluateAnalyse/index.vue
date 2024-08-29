<!-- 评价分析 -->
<script setup lang='ts' name='EvaluateAnalyse'>
const activeName = ref("negative");
const handle_tab_activeName = inject("handle_tab_activeName");
const tab_click = (value: any) => {
  if (handle_tab_activeName) {
    handle_tab_activeName(value);
  }
};
const evaluatePieBarChart = ref([]);
const props = defineProps<{ evaluatePieBarChart: [] }>();
watch(
  () => props,
  () => {
    evaluatePieBarChart.value = props.evaluatePieBarChart;
  },
  {
    deep: true,
  }
);
onMounted(async () => {});
</script>

<template>
  <!-- <div class=""> -->
  <el-tabs
    v-model="activeName"
    class="feedback-tabs h-full min-h-300 w-full"
    @tab-click="tab_click"
  >
    <el-tab-pane label="差评分析" name="negative">
      <EvaluatePieBarChart
        v-for="(it, index) in evaluatePieBarChart"
        :key="it"
        :current-index="index"
        :lable_options="it.lable_options"
        :num="it.num"
        :option_yAxis_data="it.option_yAxis_data"
        :option_data="it.option_data"
      />
    </el-tab-pane>
    <el-tab-pane label="好评分析" name="good">
      <template v-if="activeName === 'good'">
        <EvaluatePieBarChart
          v-for="(it, index) in evaluatePieBarChart"
          :key="it"
          :current-index="index"
          :lable_options="it.lable_options"
          :num="it.num"
          :option_yAxis_data="it.option_yAxis_data"
          :option_data="it.option_data"
        />
      </template>
    </el-tab-pane>
  </el-tabs>
  <!-- </div> -->
</template>

<style scoped lang='scss'>
.el-tabs {
  .el-tab-pane {
    display: flex;
    gap: 20px;
    height: 100%;
  }
}
</style>
