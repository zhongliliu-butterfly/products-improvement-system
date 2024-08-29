<script setup lang='ts'>
import type { ECOption } from "@/components/ECharts/config";
const props = defineProps<{
  title: string;
  number: string | number;
  rate: string | number;
  xAxis: [];
  yAxis: [];
}>();
const radio_value = ref("color");
const emits = defineEmits(["question_card_change"]);
const radio_change = (v: string): void => {
  emits("question_card_change", v);
};
const option = ref<ECOption>({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: props.xAxis,
    axisLabel: {
      color: "#666",
    },
    axisTick: { show: false },
    axisLine: { show: false },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      color: "#ccc",
    },
    splitLine: {
      lineStyle: {
        color: "#F5F5F5",
      },
    },
  },
  series: [
    {
      name: "Direct",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        borderRadius: [20, 20, 0, 0], // （顺时针左上，右上，右下，左下）
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#50A5FF", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0073EB", // 100% 处的颜色
            },
          ],
          // global: false, // 缺省为 false
        },
      },
      barWidth: "40%",
      data: props.yAxis,
    },
  ],
});

function drawChart() {
  option.value = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: props.xAxis,
      axisLabel: {
        color: "#666",
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#ccc",
      },
      splitLine: {
        lineStyle: {
          color: "#F5F5F5",
        },
      },
    },
    series: [
      {
        name: "Direct",
        type: "bar",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          borderRadius: [20, 20, 0, 0], // （顺时针左上，右上，右下，左下）
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#50A5FF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0073EB", // 100% 处的颜色
              },
            ],
            // global: false, // 缺省为 false
          },
        },
        barWidth: "40%",
        data: props.yAxis,
      },
    ],
  };
}

watch(
  () => props,
  () => {
    drawChart();
  },
  {
    deep: true,
  }
);

// setTimeout(() => {
//   // @ts-expect-error
//   option.value.xAxis.data = props.xAxis
//   option.value.series[0].data = props.yAxis
//   console.log('option', option)
// }, 3000)
</script>

<template>
  <div class="card flex-(col 1)">
    <div class="header fbc">
      <span>
        <i class="text-error">{{ title }}</i>
      </span>
      <el-radio-group v-model="radio_value" @change="radio_change">
        <el-radio-button label="颜色" value="color" />
        <el-radio-button label="尺码" value="size" />
      </el-radio-group>
    </div>
    <div class="desc text-(12 #999)">
      <span class="leading-20">
        反馈量：{{ number }}，占全部反馈占比：{{ rate }}%，<br />
        在蓝色上反馈最多，在红色上该问题反馈占比最大
      </span>
    </div>
    <div class="chart flex-1">
      <ECharts :option="option" />
    </div>
  </div>
</template>

<style scoped lang='scss'></style>
