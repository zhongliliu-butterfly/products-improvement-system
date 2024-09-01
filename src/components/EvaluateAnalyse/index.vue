<!-- 评价分析 -->
<script setup lang='ts' name='EvaluateAnalyse'>
const activeName = ref("negative");
const handle_tab_activeName = inject("handle_tab_activeName");
const tab_click = (value: any) => {
  if (handle_tab_activeName) {
    handle_tab_activeName(value);
  }
};
const evaluatePieBarChart0 = ref({});
const evaluatePieBarChart1 = ref({});
const evaluatePieBarChart2 = ref({});
const props = defineProps<{
  evaluatePieBarChart0: {};
  evaluatePieBarChart1: {};
  evaluatePieBarChart2: {};
}>();

watch(
  () => props,
  () => {
    evaluatePieBarChart0.value = props.evaluatePieBarChart0;
    evaluatePieBarChart1.value = props.evaluatePieBarChart1;
    evaluatePieBarChart2.value = props.evaluatePieBarChart2;
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
      <template v-if="activeName === 'negative'">
        <EvaluatePieBarChart
          :currentIndex="0"
          :lable_options="evaluatePieBarChart0?.lable_options"
          :num="evaluatePieBarChart0?.num"
          :option_yAxis_data="evaluatePieBarChart0?.option_yAxis_data"
          :option_data="evaluatePieBarChart0?.option_data"
        />
        <EvaluatePieBarChart
          :currentIndex="1"
          :lable_options="evaluatePieBarChart1?.lable_options"
          :num="evaluatePieBarChart1?.num"
          :option_yAxis_data="evaluatePieBarChart1?.option_yAxis_data"
          :option_data="evaluatePieBarChart1?.option_data"
        />
        <EvaluatePieBarChart
          :currentIndex="2"
          :lable_options="evaluatePieBarChart2?.lable_options"
          :num="evaluatePieBarChart2?.num"
          :option_yAxis_data="evaluatePieBarChart2?.option_yAxis_data"
          :option_data="evaluatePieBarChart2?.option_data"
        />
      </template>
    </el-tab-pane>
    <el-tab-pane label="好评分析" name="good">
      <template v-if="activeName === 'good'">
        <EvaluatePieBarChart
          :currentIndex="0"
          :lable_options="evaluatePieBarChart0?.lable_options"
          :num="evaluatePieBarChart0?.num"
          :option_yAxis_data="evaluatePieBarChart0?.option_yAxis_data"
          :option_data="evaluatePieBarChart0?.option_data"
        />
        <EvaluatePieBarChart
          :currentIndex="1"
          :lable_options="evaluatePieBarChart1?.lable_options"
          :num="evaluatePieBarChart1?.num"
          :option_yAxis_data="evaluatePieBarChart1?.option_yAxis_data"
          :option_data="evaluatePieBarChart1?.option_data"
        />
        <EvaluatePieBarChart
          :currentIndex="2"
          :lable_options="evaluatePieBarChart2?.lable_options"
          :num="evaluatePieBarChart2?.num"
          :option_yAxis_data="evaluatePieBarChart2?.option_yAxis_data"
          :option_data="evaluatePieBarChart2?.option_data"
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
