<script setup lang='ts'>
import type { ECOption } from '@/components/ECharts/config'

const options = [
  {
    label: '版型',
    value: 1,
  },
]
const value = ref('')
const option = computed<ECOption>(() => ({
  tooltip: {
    show: true,
    trigger: 'item',
  },
  legend: [
    {
      show: true,
      icon: 'circle',
      left: '0%',
      top: 15,
      textStyle: {
        fontSize: 15,
        color: '#999999',
      },
      data: ['我方'],
    },
    {
      show: true,
      icon: 'circle',
      right: '0',
      top: 15,
      textStyle: {
        fontSize: 15,
        color: '#999999',
      },
      data: ['对方'],
    },
  ],
  radar: {
    center: ['50%', '50%'],
    radius: '70%',
    // startAngle: 90,
    splitNumber: 5,
    shape: 'circle',
    splitArea: {
      areaStyle: {
        color: ['transparent'],
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        type: 'solid',
        color: '#ccc',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ccc',
      },
    },
    // axisLabel: { show: true },
    indicator: [{
      name: '袖子',
      color: '#111111',
    }, {
      name: '版型',
      color: '#111111',
    }, {
      name: '其他',
      color: '#111111',
    }, {
      name: '颜色',
      color: '#111111',
    }, {
      name: '胸口',
      color: '#111111',
    }],
  },
  series: [{
    name: '我方',
    type: 'radar',
    symbol: 'circle',
    symbolSize: 10,
    areaStyle: {
      color: 'rgba( 0,115,235, .3)',
    },
    itemStyle: {
      color: '#0073EB',
      borderColor: 'rgba(  0,115,235, 0.3)',
      borderWidth: 10,
    },
    lineStyle: {
      color: 'rgba(0,115,235, .6)',
      width: 2,
      join: 'miter',
      cap: 'round',
    },
    data: [
      [80, 50, 55, 80, 50, 80],
    ],
  }, {
    name: '对方',
    type: 'radar',
    symbol: 'circle',
    symbolSize: 10,
    itemStyle: {
      color: '#FF3600',
      borderColor: 'rgba(255, 54, 0, 0.4)',
      borderWidth: 10,
    },
    areaStyle: {
      color: 'rgba(255, 54, 0, .5)',
    },
    lineStyle: {
      color: 'rgba(255, 54, 0, .6)',
      width: 2,
    },
    data: [
      [60, 60, 65, 60, 70, 40],
    ],
  }],
}))
</script>

<template>
  <div class="evaluateRadarChart card relative h-full min-h-300">
    <div class="title fbc gap30">
      <span>1. 一级标签占比</span>
      <div class="fc gap10">
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
    <div class="charts">
      <ECharts :option="option" />
    </div>
    <span class="comment_count self absolute left-20 top-95 text-(primary-b)">评价数: 999</span>
    <span class="comment_count opposite absolute right-20 top-95 text-error">评价数: 199</span>
    <span class="absolute bottom-30 left-20 text-little">单位：%（百分比）</span>
  </div>
</template>

<style scoped lang='scss'>
.charts {
  height: calc(100% - 40px);
}
</style>
