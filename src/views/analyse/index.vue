<script setup lang='tsx'>
import http from "@/api";
const dateList = ref([
  { label: "近一个月", value: "0" },
  { label: "近三个月", value: "1" },
  { label: "近半年", value: "2" },
  { label: "近一年", value: "3" },
  { label: "上架至今", value: "4" },
]);
const cardList = ref<QueryCard[]>([
  {
    title: '类目',
    icon: 'category',
    props: {
      multiple: true,
    },
    type:'cascader',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 4,
  },
  {
    title: '品牌',
    icon: 'brand',
    isMultiple: true,
    attrs: {
      placeholder: '请选择',
    },
    span: 4,
  },
  {
    title: '店铺',
    icon: 'shop',
    isMultiple: true,
    attrs: {
      placeholder: '请选择',
    },
    span: 4,
  },
  {
    title: "时间",
    icon: "calendar",
    span: 4,
    options: dateList.value,
    value: "0",
  },
])
const activeTab = ref(0)
// const tabs = ['行业反馈分析', '对比分析']
const tabs = ['行业反馈分析']
const tab_activeName = ref("negative")
const evaluateLineChart_data = ref([]);
const evaluatePieBarChart_data = ref([]);

const handle_tab_activeName = async (val: any) => {
  tab_activeName.value = val.props.name;
  evaluatePieBarChart_data.value = await get_industry_feedback_analysis(cardList.value,[])
};
provide("handle_tab_activeName", handle_tab_activeName);

const handle_tab_evaluatePieBarChart_select = async (val: any,index) => {
  evaluatePieBarChart_data.value = await get_industry_feedback_analysis(cardList.value,[])
};
provide("handle_tab_evaluatePieBarChart_select", handle_tab_evaluatePieBarChart_select);

onBeforeMount(async () => {
  const industry_analysis_select_infoasync = await http.get(`/system/industry_analysis_select_info`);
  const {
    cate_name = [],
    brand_name = [],
    shop_name = [],
  } = {
    ...industry_analysis_select_infoasync.data,
  };
  cardList.value[0].options = cate_name;
  cardList.value[1].options = brand_name;
  cardList.value[2].options = shop_name;
  await get_industry_analysis_ring_ratio(cardList.value,[])
  evaluatePieBarChart_data.value = await get_industry_feedback_analysis(cardList.value,[])
});

const get_industry_feedback_analysis = async (v,a)=>{
  const industry_analysis_ring_ratio = await http.get(`/system/industry_feedback_analysis`,{
    cate_hierarchy_data: JSON.stringify(a),
    brand_name:v[1].value,
    seller_id:v[2].value,
    interval_date:v[3].value,
    min_data:'',
    max_data:'',
    label_emotion_type:tab_activeName.value == "negative"?'neg':'pos'
  });
  const list = [];
  for (var i in industry_analysis_ring_ratio.data["tags"]) {
    const option_data = [],
      option_yAxis_data = [],
      lable_options = {}
    industry_analysis_ring_ratio.data["tags"][i][0]?.forEach((element:any) => {
      option_yAxis_data.push(`${element.label_ratio}%`);
      option_data.push({
        name: element.label_name,
        value: element.num,
      });
    });
    const list_data = {
      num: String(industry_analysis_ring_ratio.data[`level${i}_num`]),
      lable_options: industry_analysis_ring_ratio.data["tags"][i][1],
      option_yAxis_data: option_yAxis_data,
      option_data: option_data,
    };
    list.push(list_data);
  }
  return list;
}
const get_industry_analysis_ring_ratio = async (v,a)=>{
  const industry_analysis_ring_ratio = await http.get(`/system/industry_analysis_ring_ratio`,{
    cate_hierarchy_data: JSON.stringify(a),
    brand_name:v[1].value,
    seller_id:v[2].value,
    interval_date:v[3].value,
    min_data:'',
    max_data:''
  });
  const date = dateList.value[v[3]?.value]?.label || "";
  evaluateLineChart_data.value = [
    {
      date: `总评价量（${date}）`,
      num: industry_analysis_ring_ratio.data.total_reviews_num,
      rate: industry_analysis_ring_ratio.data.total_reviews_ratio,
    },
    {
      date: `负向原声值（${date}）`,
      num: industry_analysis_ring_ratio.data.neg_reviews_num,
      rate: industry_analysis_ring_ratio.data.neg_reviews_ratio,
    },
    {
      date: `正向原声值（${date}）`,
      num: industry_analysis_ring_ratio.data.pos_reviews_num,
      rate: industry_analysis_ring_ratio.data.pos_reviews_ratio,
    },
  ];
  evaluatePieBarChart_data.value = await get_industry_feedback_analysis(v,a);

}

const handle = async (v,a) => {
  console.log(`类目：${JSON.stringify(a)}`);
  console.log(`品牌：${v[1].value}`);
  console.log(`店铺：${v[2].value}`);
  console.log(`时间：${v[3].value}`);
  await get_industry_analysis_ring_ratio(v,a)

};

const titleRender = (type: 'opposite' | 'self') => {
  return (card: QueryCard) => {
    return (
      <span>
        <i class={['text-primary-b', type === 'opposite' ? 'text-error!' : '']}>{type === 'opposite' ? '对方' : '我方'}</i>
        {' - '}
        {card.title}
      </span>
    )
  }
}
const formItems = ref<QueryCard[]>([
  {
    title: '品类',
    titleRender: titleRender('self'),
    options: [
      {
        label: '中国',
        value: '1',
      },
      {
        label: '美国',
        value: '2',
      },
    ],
    span: 3,
    value: '',
  },
  {
    title: '品牌',
    titleRender: titleRender('self'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
  {
    title: '店铺',
    titleRender: titleRender('self'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
  {
    itemRender: () => (
      <div class="fcc items-end pb10 size-full">VS</div>
    ),
    value: '',
    span: 1,
  },
  {
    title: '品类',
    titleRender: titleRender('opposite'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
  {
    title: '品牌',
    titleRender: titleRender('opposite'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
  {
    title: '店铺',
    titleRender: titleRender('opposite'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
])
const comparisonTabs = ref([
  {
    label: '品类 VS 品类',
    formItems,
  },
])
</script>

<template>
  <div class="page_wrapper analyse">
    <query-card :card-list="cardList" @handle="handle" />
    <div class="content f-col-16">
      <div class="tabs_wrap">
        <div class="tabs">
          <span
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ active: index === activeTab }"
            @click="activeTab = index"
            >{{ item }}</span
          >
        </div>
      </div>
      <!-- 行业反馈分析 -->
      <div v-if="activeTab === 0" class="f-col-16">
        <div class="feedback h280 fc gap20">
          <EvaluateLineChart
            v-for="(item, index) in evaluateLineChart_data"
            :key="index"
            class="flex-1"
            :data="item"
          />
        </div>
        <el-row class="card flex-1">
          <el-col>
            <EvaluateAnalyse
              :evaluatePieBarChart0="evaluatePieBarChart_data[0]"
              :evaluatePieBarChart1="evaluatePieBarChart_data[1]"
              :evaluatePieBarChart2="evaluatePieBarChart_data[2]"
            />
          </el-col>
        </el-row>
      </div>
      <!-- 对比分析 -->
      <!-- <div v-else class="f-col-16">
        <ComparisonTabs :comparison-tabs="comparisonTabs" />
        <el-row class="chart flex-1" :gutter="16">
          <el-col v-for="it in 3" :key="it" :span="8">
            <EvaluateRadarChart />
          </el-col>
        </el-row>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang='scss'>
.f-col-16 {
  @apply flex-(col 1) gap16;
}
.analyse {
  .vs {
    @apply fcc size-full;
  }
}
</style>
