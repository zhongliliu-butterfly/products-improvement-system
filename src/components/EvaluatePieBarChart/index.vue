<script setup lang='ts'>
import type { ECOption } from "@/components/ECharts/config";

interface IProps {
  lable_options?: Array<any>;
  currentIndex: number | string;
  num?: number | string;
  option_yAxis_data?: Array<any>;
  option_data?: Array<any>;
  selected_value?: string;
}
const props = defineProps<{
  lable_options: [];
  currentIndex: 0;
  num: "";
  option_yAxis_data: [];
  option_data: [];
  selected_value: ""
}>();

const colors = [
  ["#0073EB", "#3088E3", "#569DE7", "#85B7EC"],
  ["#EB3F00", "#FF5516", "#FF8558 ", "#FFA483"],
  ["#EBAB00", "#FFC427", "#FFD566 ", "#FFE6A2"],
];
const pieOption = ref<ECOption>({
  title: { text: props.num, subtext: "评价量", left: "center", top: "center" },
  tooltip: {
    trigger: "item",
  },
  grid: {
    top: "10%",
    right: "2%",
    left: "0.3%",
    bottom: "1%",
    containLabel: true,
  },
  color: colors[props.currentIndex],
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["70%", "92%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        // label: {
        //   show: true,
        //   fontSize: 20,
        //   fontWeight: 'bold',
        // },
      },
      data: props.option_data,
    },
  ],
});
const barOption = ref<ECOption>({
  grid: {
    top: "5%",
    right: "20%",
    left: "1%",
    bottom: "1%",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    type: "value",
    show: false,
  },
  yAxis: {
    type: "category",
    show: true,
    position: "right",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    data: props.option_yAxis_data,
  },
  color: colors[props.currentIndex],

  series: [
    {
      name: "Access From",
      type: "bar",
      colorBy: "data",
      label: {
        show: true,
        position: [5, -15],
        // position: "top",
        formatter: (params) => {
          // @ts-expect-error
          return `${params.data.name} ${params.data.value}`;
        },
      },
      barWidth: "20%",
      itemStyle: {
        borderRadius: [20],
      },
      data: props.option_data,
    },
  ],
});
const select_value = ref("");

watch(
  () => props,
  () => {
    select_value.value = props.selected_value;
    pieOption.value = {
      title: {
        text: props.num,
        subtext: "评价量",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      grid: {
        top: "10%",
        right: "2%",
        left: "0.3%",
        bottom: "1%",
        containLabel: true,
      },
      color: colors[props.currentIndex],
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["70%", "92%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            // label: {
            //   show: true,
            //   fontSize: 20,
            //   fontWeight: 'bold',
            // },
          },
          data: props.option_data,
        },
      ],
    };
    barOption.value = {
      grid: {
        top: "5%",
        right: "20%",
        left: "1%",
        bottom: "1%",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "value",
        show: false,
      },
      yAxis: {
        type: "category",
        show: true,
        position: "right",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        data: props.option_yAxis_data,
      },
      color: colors[props.currentIndex],

      series: [
        {
          name: "Access From",
          type: "bar",
          colorBy: "data",
          label: {
            show: true,
            position: [5, -15],
            // position: "top",
            formatter: (params) => {
              // @ts-expect-error
              return `${params.data.name} ${params.data.value}`;
            },
          },
          barWidth: "20%",
          itemStyle: {
            borderRadius: [20],
          },
          data: props.option_data,
        },
      ],
    };
  },
  {
    deep: true,
  }
);

const handle_tab_evaluatePieBarChart_select = inject(
  "handle_tab_evaluatePieBarChart_select"
);
const evaluatePieBarChart_select_change = (value) => {
  const emit_data = { lable_options: props.lable_options, selected_value: value, currentIndex: props.currentIndex }
  handle_tab_evaluatePieBarChart_select(emit_data);
};
</script>

<template>
  <div class="flex-1 o-auto p-t-10">
    <div class="title fc gap30">
      <span fc gap10>
        <i class="fcc border-(1 solid) rounded-1/2 size-20">{{
          Number(currentIndex) + 1
        }}</i>
        {{ Number(currentIndex) + 1 }}级标签占比
      </span>
      <div v-show="currentIndex != 0" class="fc flex-1 gap10">
        <label class="break-keep text-(11 #ccc)">所属上级标签</label>
        <el-select v-model="select_value" placeholder="请选择" class="w-170!" @change="evaluatePieBarChart_select_change">
          <el-option v-for="item in lable_options" :key="item.value" :label="item.label" :value="item.value" />
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
