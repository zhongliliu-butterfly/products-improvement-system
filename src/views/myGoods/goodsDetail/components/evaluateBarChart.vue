<script setup lang='ts'>
import type { ECOption } from '@/components/ECharts/config'

const option = ref<ECOption>({
  title: { text: '9999', subtext: '评价量', left: 'center', top: 'center' },
  // tooltip: {},
  grid: {
    top: '10%',
    right: '2%',
    left: '0.3%',
    bottom: '1%',
    containLabel: true,
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['70%', '92%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        // label: {
        //   show: true,
        //   fontSize: 20,
        //   fontWeight: 'bold',
        // },
      },

      data: [
        { value: 1048, name: 'Engine', itemStyle: { color: '#c23531' } },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
      ],
    },
  ],
})
const option2 = ref<ECOption>({
  grid: {
    top: '15%',
    right: '2%',
    left: '1%',
    bottom: '15%',
    // containLabel: true,
  },
  xAxis:
  {
    type: 'value',
    show: false,
  },
  yAxis: {
    type: 'category',
    show: false,
    // axisLabel: { show: true, inside: true, rotate: 45, margin: 20 },
  },
  series: [
    {
      name: 'Access From',
      type: 'bar',
      label: {
        show: true,
        position: 'top',
        // position: [0, '-10%'],
      },
      barWidth: '20%',
      itemStyle: {
        borderRadius: [20],
      },
      data: [
        { value: 1048, name: 'Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
      ],
    },
  ],
})
const options = [
  {
    label: '版型',
    value: 1,
  },
]
const value = ref('')
</script>

<template>
  <div class="flex-1 o-auto p-t-10">
    <div class="title fc gap30">
      <span>1. 一级标签占比</span>
      <div class="fc flex-1 gap10">
        <label class="break-keep text-(11 #ccc)">所属上级标签</label>
        <el-select v-model="value" placeholder="请选择" class="w-170!">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="charts flex">
      <div class="left flex-1">
        <ECharts :option="option" />
      </div>
      <div class="right flex-1">
        <ECharts :option="option2" />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.charts {
  height: calc(100% - 40px);
}
</style>
