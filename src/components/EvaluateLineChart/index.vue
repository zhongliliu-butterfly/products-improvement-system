<!-- 环比折线 -->
<script setup lang='ts' name='EvaluateLineChart'>
import type { ECOption } from "@/components/ECharts/config";
import echarts from "@/components/ECharts/config";
const props = defineProps<{
  data: {
    date: "";
    num;
    rate;
    xAxisdata: []
    data: []
  };
}>();

const options = ref<ECOption>({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        color: "#ccc",
      },
    },
  },

  grid: {
    left: "1%",
    right: "4%",
    bottom: "2%",
    top: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisLine: {
      show: false,
    },
    splitLine: { show: true, lineStyle: { type: "dashed", color: "#EAEAEA" } },
    axisTick: { show: false },
    data: props.data.xAxisdata
  },
  yAxis: {
    type: "value",
    show: false,
    name: "单位（%）",
  },
  series: [
    {
      name: "demo",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      showSymbol: true,
      lineStyle: {
        width: 1,
      },
      color: "#0073EB",
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: "#C7DFFA",
            },
            {
              offset: 1,
              color: "#FAFDFF",
            },
          ],
          false
        ),
        // shadowColor: '#0073EB',
        // shadowBlur: 10,
      },
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
      },
      data: props.data.data,
    },
  ],
});

watch(
  () => props,
  () => {
    options.value = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#ccc",
          },
        },
      },

      grid: {
        left: "1%",
        right: "4%",
        bottom: "2%",
        top: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        splitLine: { show: true, lineStyle: { type: "dashed", color: "#EAEAEA" } },
        axisTick: { show: false },
        data: props.data.xAxisdata
      },
      yAxis: {
        type: "value",
        show: false,
        name: "单位（%）",
      },
      series: [
        {
          name: "demo",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          showSymbol: true,
          lineStyle: {
            width: 1,
          },
          color: "#0073EB",
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#C7DFFA",
                },
                {
                  offset: 1,
                  color: "#FAFDFF",
                },
              ],
              false
            ),
            // shadowColor: '#0073EB',
            // shadowBlur: 10,
          },
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
          },
          data: props.data.data,
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
  <div class="card h-full flex-col">
    <div class="title h80">
      <div class="fbc">
        <span class="text-minor">{{ data?.date }}</span>
        <svg-icon icon="tip" class="cur-p" />
      </div>
      <div class="data mt10 fc">
        <b text="30 main">{{ data?.num }}</b>
        <span v-if="data?.rate < 0" class="ml20 inline-block rounded-15 bg-#EFF9ED px16 py5 text-success">
          <svg-icon icon="down" size="16px" />
          环比下降{{ -data?.rate }}%</span>
        <span v-if="data?.rate >= 0" class="ml20 inline-block rounded-15 bg-#EFF9ED px16 py5 text-success">
          <svg-icon icon="down" size="16px" />
          环比上升{{ data?.rate }}%</span>
      </div>
    </div>
    <div class="chart flex-1">
      <ECharts :option="options" />
    </div>
  </div>
</template>
