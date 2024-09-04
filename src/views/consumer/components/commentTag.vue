<script setup lang='ts'>
import type { ECOption } from '@/components/ECharts/config'
const props = defineProps<{
  xAxisdata: [],
  negdata: [],
  posdata: []
}>();

const option = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    right: '0',
    top: '0',
  },

  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '12%',
    containLabel: true,
  },
  xAxis:
  {
    type: 'category',
    data: props.xAxisdata,
    axisLabel: {
      show: true,
      color: '#666',
    },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#ccc',
    },
    splitLine: {
      lineStyle: {
        color: '#F5F5F5',
      },
    },
  },
  series: [
    {
      name: '正向标签',
      type: 'bar',
      itemStyle: {
        borderRadius: [20, 20, 0, 0], // （顺时针左上，右上，右下，左下）
        color:
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#50A5FF', // 0% 处的颜色
          }, {
            offset: 1,
            color: '#0073EB', // 100% 处的颜色
          }],
          // global: false, // 缺省为 false
        },
      },
      barWidth: '15%',
      // barGap: 10,
      data: props.posdata,
    },
    {
      name: '负向标签',
      type: 'bar',
      // emphasis: {
      //   focus: 'series',
      // },
      itemStyle: {
        borderRadius: [20, 20, 0, 0], // （顺时针左上，右上，右下，左下）
        color:
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#39EBDD', // 0% 处的颜色
          }, {
            offset: 1,
            color: '#0CC2A7', // 100% 处的颜色
          }],
          // global: false, // 缺省为 false
        },
      },
      barWidth: '15%',
      // barGap: 10,
      data: props.negdata,
    },
  ],
})

watch(
  () => props,
  () => {
    option.value = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        right: '0',
        top: '0',
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '12%',
        containLabel: true,
      },
      xAxis:
      {
        type: 'category',
        data: props.xAxisdata,
        axisLabel: {
          show: true,
          color: '#666',
        },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#ccc',
        },
        splitLine: {
          lineStyle: {
            color: '#F5F5F5',
          },
        },
      },
      series: [
        {
          name: '正向标签',
          type: 'bar',
          itemStyle: {
            borderRadius: [20, 20, 0, 0], // （顺时针左上，右上，右下，左下）
            color:
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#50A5FF', // 0% 处的颜色
              }, {
                offset: 1,
                color: '#0073EB', // 100% 处的颜色
              }],
              // global: false, // 缺省为 false
            },
          },
          barWidth: '15%',
          // barGap: 10,
          data: props.posdata,
        },
        {
          name: '负向标签',
          type: 'bar',
          // emphasis: {
          //   focus: 'series',
          // },
          itemStyle: {
            borderRadius: [20, 20, 0, 0], // （顺时针左上，右上，右下，左下）
            color:
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#39EBDD', // 0% 处的颜色
              }, {
                offset: 1,
                color: '#0CC2A7', // 100% 处的颜色
              }],
              // global: false, // 缺省为 false
            },
          },
          barWidth: '15%',
          // barGap: 10,
          data: props.negdata,
        },
      ],
    }
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="card h-full flex-(col 1)">
    <span class="text-(18 main) font-600">评论标签</span>
    <div class="flex-1">
      <ECharts :option="option" />
    </div>
  </div>
</template>

<style scoped lang='scss'></style>
