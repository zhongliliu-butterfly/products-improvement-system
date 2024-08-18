<script setup lang='ts'>
import type { ECOption } from '@/components/ECharts/config'

const option = ref<ECOption>({

  tooltip: {
    show: true,
    trigger: 'item',
  },
  legend: {
    show: true,
    icon: 'circle',
    right: '20%',
    top: 'center',
    orient: 'vertical',
    itemGap: 30,
    textStyle: {
      fontSize: 15,
      color: '#000',
    },
    data: ['我方', '对方'],
  },
  radar: {
    center: ['35%', '50%'],
    radius: '70%',
    startAngle: 90,
    splitNumber: 4,
    shape: 'circle',
    splitArea: {
      areaStyle: {
        color: ['transparent'],
      },
    },
    axisLabel: {
      show: false,
      fontSize: 12,
      color: '#000',

    },
    axisLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#000',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {

        color: '#000',
      },
    },
    indicator: [{
      name: '五保',
      max: 888,
    }, {
      name: '版型',
      max: 88,
    }, {
      name: '其他',
      max: 88,
    }, {
      name: '颜色',
      max: 88,
    }],
  },
  series: [{
    name: '我方',
    type: 'radar',
    symbol: 'circle',
    symbolSize: 10,
    areaStyle: {
      color: 'rgba(86,199,60, 0.4)',
    },
    itemStyle: {
      color: 'rgba(86,199,60, 1)',
      borderColor: 'rgba(86,199,60, 0.3)',
      borderWidth: 10,
    },
    lineStyle: {
      color: 'rgba(86,199,60, 1)',
      width: 2,
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
      color: 'rgba(0,183,238, 1)',
      borderColor: 'rgba(0,183,238, 0.4)',
      borderWidth: 10,
    },
    areaStyle: {
      color: 'rgba(0,183,238, 1)',
    },
    lineStyle: {
      color: 'rgba(0,183,238, 1)',
      width: 2,
    },
    data: [
      [60, 60, 65, 60, 70, 40],
    ],
  }],
})
</script>

<template>
  <div class="evaluateRadarChart card h-full">
    <ECharts :option="option" />
  </div>
</template>

<style scoped lang='scss'>
</style>
