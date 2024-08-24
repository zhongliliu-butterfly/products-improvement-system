<script setup lang='ts' name='CommentTendency'>
import type { ECOption } from '@/components/ECharts/config'
import echarts from '@/components/ECharts/config'

const visible = defineModel<boolean>({ required: true })
const tendencyRef = ref<HTMLDivElement | null>(null)
onClickOutside(tendencyRef, () => visible.value = false)
const tendencyOptions = ref<ECOption>({
  title: {
    text: '评论趋势',
    textStyle: {
      fontSize: 18,
      color: '#111111',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#ccc',
      },
    },
  },
  legend: {
    right: 20,
    icon: 'circle',
    itemGap: 20,
    textStyle: { fontSize: 14 },
    formatter: (name) => {
      if (name === '正向') {
        return '正向 :999'
      }
      else {
        return '负向: 333'
      }
    },
  },

  grid: {
    left: '1%',
    right: '5%',
    bottom: '2%',
    top: '15%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: false,
    },
    splitLine: { show: true, lineStyle: { type: 'dashed', color: '#EAEAEA' } },
    axisTick: { show: false },
    data: ['07/01', '07/10', '07/20', '07/30', '08/10', '08/20'],
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  series: [
    {
      name: '正向',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      showSymbol: true,
      lineStyle: {
        width: 1,
      },
      color: '#FF3600',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#FFD2C8',
        }, {
          offset: 1,
          color: '#FFF6F3',
        }], false),
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
      },
      data: [220, 182, 191, 134, 150, 120],
    },
    {
      name: '负向',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      showSymbol: true,
      lineStyle: {
        width: 1,
      },
      color: '#23B99C',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#DEE7DF',
        }, {
          offset: 1,
          color: '#F6FDFC',
        }], false),
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
      },
      data: [270, 112, 141, 234, 250, 320],
    },
  ],
})
</script>

<template>
  <div v-if="visible" ref="tendencyRef" class="wrapper">
    <div class="chart h-full">
      <ECharts :option="tendencyOptions" class="size-full" />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.wrapper {
  @apply absolute right-180 top-115 z-10 h50% w35% rounded-6 bg-white p16 shadow-xl animated animated-(fade-in);
}
</style>
