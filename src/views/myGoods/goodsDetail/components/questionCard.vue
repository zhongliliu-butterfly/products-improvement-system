<script setup lang='ts'>
import type { ECOption } from '@/components/ECharts/config'

const value = ref('颜色')
const option = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },

  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis:
  {
    type: 'category',
    data: ['蓝色', '红色', '绿色', '深蓝色', '橙色'],
    axisLabel: {
      color: '#666',
    },
    axisTick: { show: false },
    // show: false,
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
      name: 'Direct',
      type: 'bar',
      emphasis: {
        focus: 'series',
      },
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
      barWidth: '40%',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
  ],
})
setTimeout(() => {
  // @ts-expect-error
  option.value.xAxis.data[0] = '999'
  console.log('option', option)
}, 3000)
</script>

<template>
  <div class="card flex-(col 1)">
    <div class="header fbc">
      <span>
        <i class="text-error">TOP1</i> 颜色与描述不符
      </span>
      <el-radio-group v-model="value">
        <el-radio-button label="颜色" value="颜色" />
        <el-radio-button label="尺码" value="尺码" />
      </el-radio-group>
    </div>
    <div class="desc text-(12 #999)">
      <span>
        反馈量：34，占全部反馈占比：3.68%，<br>
        在蓝色上反馈最多，在红色上该问题反馈占比最大
      </span>
    </div>
    <div class="chart flex-1">
      <ECharts :option="option" />
    </div>
  </div>
</template>

<style scoped lang='scss'></style>
