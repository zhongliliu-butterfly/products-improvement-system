<script setup lang='ts'>
import type { ECOption } from '@/components/ECharts/config'

interface IProps {
  currentIndex: number
}
const props = withDefaults(defineProps<IProps>(), {
  currentIndex: 0,
})
const colors = [
  ['#0073EB', '#3088E3', '#569DE7', '#85B7EC'],
  ['#EB3F00', '#FF5516', '#FF8558 ', '#FFA483'],
  ['#EBAB00', '#FFC427', '#FFD566 ', '#FFE6A2'],
]
const pieOption = ref<ECOption>({
  title: { text: '9999', subtext: '评价量', left: 'center', top: 'center' },
  grid: {
    top: '10%',
    right: '2%',
    left: '0.3%',
    bottom: '1%',
    containLabel: true,
  },
  color: colors[props.currentIndex],
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
        { value: 1048, name: 'Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
      ],
    },
  ],
})
const barOption = ref<ECOption>({
  grid: {
    top: '15%',
    right: '2%',
    left: '1%',
    bottom: '10%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis:
  {
    type: 'value',
    show: false,
  },
  yAxis: {
    type: 'category',
    show: false,
    data: ['袖子', '肩膀', '胸口', '腰腹'],

  },
  color: colors[props.currentIndex],

  series: [
    {
      name: 'Access From',
      type: 'bar',
      colorBy: 'data',
      label: {
        show: true,
        position: [5, -15],
        // position: 'top',
        formatter: (params) => {
          // @ts-expect-error
          return `${params.data.name} ${params.data.value}`
        },
      },
      barWidth: '20%',
      itemStyle: {
        borderRadius: [20],
      },
      data: [
        { value: 1048, name: '袖子' },
        { value: 735, name: '肩膀' },
        { value: 580, name: '胸口' },
        { value: 484, name: '腰腹' },
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
      <span fc gap10>
        <i class="fcc border-(1 solid) rounded-1/2 size-20">{{ currentIndex + 1 }}</i>
        一级标签占比
      </span>
      <div v-show="currentIndex !== 0" class="fc flex-1 gap10">
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
        <ECharts :option="pieOption" />
      </div>
      <div class="right flex-1">
        <ECharts :option="barOption" />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.charts {
  height: calc(100% - 40px);
}
</style>
