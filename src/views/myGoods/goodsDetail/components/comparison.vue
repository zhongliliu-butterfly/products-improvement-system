<script setup lang='ts'>
const formItems = ref<QueryCard[]>([
  {
    title: '国家',
    icon: 'country',
    options: [
      {
        label: '中国',
        value: '1',
      },
      {
        label: '美国',
        value: '2',
      },
    ],
    span: 8,
    value: '',
  },
  {
    title: '商品ASIN',
    icon: 'calendar',
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 8,
  },
])
const comparisonTabs = ref([
  {
    label: '商品 VS 商品',
    formItems,
  },
])
</script>

<template>
  <div class="comparison w-full flex-col gap10">
    <ComparisonTabs :comparison-tabs="comparisonTabs" :goods-info="{}" />
    <el-row class="chart flex-1" :gutter="16">
      <el-col v-for="it in 3" :key="it" :span="8">
        <EvaluateRadarChart />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang='scss'>
.pane{
  .goodsInfo{
    @apply text-12  fc flex-1 gap20 bg-#F8F8FA rounded-8 px20 py10;
  }
}
</style>
