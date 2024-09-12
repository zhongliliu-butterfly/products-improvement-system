<script setup lang='ts'>
import QuestionCard from "./components/questionCard.vue";
import FeedBack from "./components/feedBack.vue";
import Comparison from "./components/comparison.vue";
import http from "@/api";
import { ElMessage } from "element-plus";

interface Questioncard_data {
  title?: Array<any>;
  size_rate: Array<any>;
  color_rate?: Array<any>;
  size_num?: Array<any>;
  color_num?: Array<any>;
  color_xAxis?: Array<any>;
  color_yAxis?: Array<any>;
  size_xAxis?: Array<any>;
  size_yAxis?: Array<any>;
}
const route = useRoute();
const parent_asin = route.params.parent_asin;
const market_place_id = route.query.market_place_id;
const goodInfo = ref({});
const feedback_color = ref([]);
const feedback_size = ref([]);
const comparison_options1 = ref([]);
const comparison_options2 = ref([]);
const tab_activeName = ref("negative");
const tabs = ["重点问题跟进", "客户反馈分析", "对比分析"];
const question_card_change_value1 = ref("color");
const question_card_change_value2 = ref("color");
const question_card_change_value3 = ref("color");
const active_color = ref<any>();
const active_color_change = (val) => {
  active_color.value = val;
};
const active_size = ref<any>();
const active_size_change = (val) => {
  active_size.value = val;
};
const questioncard_data = ref<Questioncard_data>({
  title: [],
  size_rate: [],
  color_rate: [],
  size_num: [],
  color_num: [],
  color_xAxis: [],
  color_yAxis: [],
  size_xAxis: [],
  size_yAxis: [],
});
const cardList = ref<QueryCard[]>([
  {
    title: "国家/地区",
    icon: "country",
    span: 4,
    isMultiple: true,
    value: [market_place_id],
  },
  {
    title: "数据源",
    icon: "calendar",
    span: 4,
  },
]);
const dateValue = ref("0");
const timeValue = ref("");
const activeOperation = ref(0);
const evaluatePieBarChart_data = ref([]);

const handle_tab_activeName = async (val: any) => {
  console.log(val);
  tab_activeName.value = val.props.name;
  evaluatePieBarChart_data.value = await get_reviews_analysis(
    tab_activeName.value === "negative" ? 0 : 1,
    parent_asin
  );
};
provide("handle_tab_activeName", handle_tab_activeName);

const handle_tab_evaluatePieBarChart_select = async (val: any) => {
  console.log(val, 1111111111111111111111111111111111111111111111111111111111);
  const data = await get_detail_parent_label(
    cardList.value,
    tab_activeName.value == "negative" ? "neg" : "pos",
    Number(val.currentIndex) + 1,
    val.selected_value
  );
  data[0].lable_options = val.lable_options;
  data[0].selected_value = val.selected_value;
  if (val.currentIndex == 1) {
    evaluatePieBarChart_data.value[1] = data[0];
    evaluatePieBarChart_data.value[2] = data[1];
  } else {
    evaluatePieBarChart_data.value[2] = data[0];
  }
};
provide(
  "handle_tab_evaluatePieBarChart_select",
  handle_tab_evaluatePieBarChart_select
);

// 产品详情
const get_product_detail = async (parent_asin, market_place_id) => {
  const one_product = await http.get(
    `/system/one_product`,
    {
      parent_asin: parent_asin,
      market_place_id: JSON.stringify(market_place_id),
    },
    { loading: false }
  );
  goodInfo.value = one_product.data;
};

const get_detail_select_info = async () => {
  const { data } = await http.get(
    `/system/detail_select_info`,
    {
      user_id: "1555073968740999936",
      parent_asin: parent_asin,
    },
    { loading: true }
  );
  const { marketplaces_data, data_source } = { ...data };
  cardList.value[0].options = marketplaces_data;
  cardList.value[1].options = data_source;
};

onBeforeMount(async () => {
  get_detail_select_info();
  get_color_size_label(cardList.value);
  get_product_detail(parent_asin, [market_place_id]);
  get_focus_follow(cardList.value);
});

// 尺码颜色
const get_color_size_label = async (v) => {
  const color_size_label = await http.get(`/system/color_size_label`, {
    parent_asin: parent_asin,
    market_place_id: JSON.stringify(v[0].value),
  });
  feedback_color.value = color_size_label.data.color;
  feedback_size.value = color_size_label.data.size;
};

// 关注
const follow = async () => {
  const { data, msg } = await http.post(
    `/system/search_product`,
    {
      market_place_id: market_place_id,
      parent_asin: parent_asin,
      user_id: "1555073968740999936",
    },
    { loading: false }
  );
  ElMessage.success(msg);
};

//重点问题跟进
const get_focus_follow = async (v) => {
  const focus_follow = await http.get(
    `/system/focus_follow`,
    {
      parent_asin: parent_asin,
      market_place_id: JSON.stringify(v[0].value),
      interval_date: dateValue.value,
      min_data: "",
      max_data: "",
    },
    { loading: true }
  );
  const qcarddata: Questioncard_data = {
    title: [],
    size_rate: [],
    color_rate: [],
    size_num: [],
    color_num: [],
    color_xAxis: [],
    color_yAxis: [],
    size_xAxis: [],
    size_yAxis: [],
  };
  for (var i in focus_follow.data) {
    const color_xAxis = [],
      color_yAxis = [],
      size_xAxis = [],
      size_yAxis = [];
    for (var s in focus_follow.data[i].color) {
      color_xAxis.push(s);
      color_yAxis.push(focus_follow.data[i].color[s]);
    }
    for (var c in focus_follow.data[i].size) {
      size_xAxis.push(c);
      size_yAxis.push(focus_follow.data[i].size[c]);
    }
    qcarddata.title.push(i);
    qcarddata.size_rate.push(focus_follow.data[i].size_ratio);
    qcarddata.color_rate.push(focus_follow.data[i].color_ratio);
    qcarddata.size_num.push(focus_follow.data[i].size_num);
    qcarddata.color_num.push(focus_follow.data[i].color_num);
    qcarddata.color_xAxis.push(color_xAxis);
    qcarddata.color_yAxis.push(color_yAxis);
    qcarddata.size_xAxis.push(size_xAxis);
    qcarddata.size_yAxis.push(size_yAxis);
  }
  console.log(qcarddata);
  questioncard_data.value = qcarddata;
};

// 点击查询
const handle = async (v) => {
  console.log(`国家/地区：${JSON.stringify(v[0].value)}`);
  console.log(`数据源：${v[1].value}`);
  if (activeOperation.value == 0) {
    await get_focus_follow(v);
  } else if (activeOperation.value == 1) {
    get_color_size_label(cardList.value);
    evaluatePieBarChart_data.value = await get_reviews_analysis(0, parent_asin);
  } else {
    await get_comparative_analysis_select_info();

    // const d1 = await get_reviews_analysis(2, parent_asin);
    // const d2 = await get_reviews_analysis(2, parent_asin);
  }
};

// 差评好评分析数据
const get_reviews_analysis = async (flag, parent_asin) => {
  const reviews_analysis = await http.get(`/system/reviews_analysis`, {
    flag: flag,
    parent_asin: parent_asin,
    market_place_id: JSON.stringify(cardList.value[0].value),
    interval_date: dateValue.value,
    min_data: "",
    max_data: "",
    color: JSON.stringify(active_color.value),
    size: JSON.stringify(active_size.value),
  });
  const list = [];
  if (!reviews_analysis.data) return [];
  for (var i in reviews_analysis.data["tags"]) {
    const option_data = [],
      option_yAxis_data = [];
    reviews_analysis.data["tags"][i][0]?.forEach((element: any) => {
      option_yAxis_data.push(`${element.label_ratio}%`);
      option_data.push({
        name: element.label_name,
        value: element.num,
      });
    });
    const list_data = {
      num: String(reviews_analysis.data[`level${i}_num`]),
      lable_options: reviews_analysis.data["tags"][i][1],
      option_yAxis_data: option_yAxis_data,
      option_data: option_data,
      selected_value: reviews_analysis.data["tags"][i][1][0]?.value,
    };
    list.push(list_data);
  }
  return list;
};

// 客户反馈分析差评/好评分析的根据上一级标签id以及查询条件查找当前级的标签
const get_detail_parent_label = async (
  v,
  label_emotion_type,
  current_level,
  label_id
) => {
  const detail_parent_label = await http.get(
    `/system/detail_parent_label`,
    {
      parent_asin: parent_asin,
      current_level: current_level,
      label_id: label_id,
      label_emotion_type: label_emotion_type,
      market_place_id: JSON.stringify(cardList.value[0].value),
      interval_date: dateValue.value,
      min_data: "",
      max_data: "",
      color: JSON.stringify(active_color.value),
      size: JSON.stringify(active_size.value),
    },
    { loading: false }
  );
  const list = [];
  if (!detail_parent_label.data) return [];
  for (var i in detail_parent_label.data["tags"]) {
    const option_data = [],
      option_yAxis_data = [];
    detail_parent_label.data["tags"][i][0]?.forEach((element: any) => {
      option_yAxis_data.push(`${element.label_ratio}%`);
      option_data.push({
        name: element.label_name,
        value: element.num,
      });
    });
    const list_data = {
      num: String(detail_parent_label.data[`level${i}_num`]),
      lable_options: detail_parent_label.data["tags"][i][1],
      option_yAxis_data: option_yAxis_data,
      option_data: option_data,
      selected_value: detail_parent_label.data["tags"][i][1][0]?.value,
    };
    list.push(list_data);
  }
  return list;
};

// 对比分析筛选栏
const get_comparative_analysis_select_info = async () => {
  const comparative_analysis_select_info = await http.get(
    `/system/comparative_analysis_select_info`,
    {
      parent_asin: parent_asin,
      flag: 0,
      user_id: "1555073968740999936",
    }
  );
  comparison_options1.value =
    comparative_analysis_select_info.data.market_place;
  comparison_options2.value = comparative_analysis_select_info.data.result;
};

const question_card_change1 = (v) => {
  question_card_change_value1.value = v;
};
const question_card_change2 = (v) => {
  question_card_change_value2.value = v;
};
const question_card_change3 = (v) => {
  question_card_change_value3.value = v;
};

// 查看原声
const originView = async () => {
  const res = await http.get(
    `/system/product_detial_reviews`,
    {
      parent_asin: parent_asin,
      market_place_id: market_place_id || cardList.value[0].value,
      data_source: cardList.value[1].value,
    },
    { loading: true }
  );
  ElMessage.info("查看原声");
};

const handle_tab = async (index: number) => {
  activeOperation.value = index;
  await handle(cardList.value);
};
</script>

<template>
  <div class="goods-detail min-h-full flex-col gap16">
    <div class="query">
      <QueryCard :card-list="cardList" @handle="handle" />
    </div>
    <!-- 商品信息 -->
    <div class="goods-info card h130 fbc">
      <div class="left fc gap12">
        <img :src="goodInfo.main_image_url" class="rounded-4 size-80" />
        <div class="info flex-col self-stretch justify-between text-12">
          <span class="font-600">{{ goodInfo.title }}</span>
          <span text="little">{{ goodInfo.review_channel }}</span>
          <div class="rate fc gap20">
            <el-rate :model-value="goodInfo.review_score" disabled show-score score-template="{value}.0" />
            <i text="secondary">{{ goodInfo.review_count }}条评价</i>
            <i text="secondary">{{ goodInfo.return_num }}条退货评价</i>
          </div>
        </div>
      </div>
      <el-space size="large">
        <el-button type="primary" size="large" @click="follow">
          关注商品
        </el-button>
        <el-button plain size="large" @click="originView"> 查看原声 </el-button>
      </el-space>
    </div>
    <!-- 分析tabs -->
    <div class="analysis flex-(col 1) gap16">
      <div class="tabs_wrap">
        <div class="tabs">
          <span v-for="(tab, index) in tabs" :key="index" :class="{ active: activeOperation === index }"
            @click="handle_tab(index)">{{ tab }}</span>
        </div>
        <div class="right fc gap12">
          <el-radio-group v-model="dateValue">
            <el-radio-button label="近一个月" value="0" />
            <el-radio-button label="近三个月" value="1" />
            <el-radio-button label="近半年" value="2" />
            <el-radio-button label="近一年" value="3" />
            <el-radio-button label="上架至今" value="4" />
          </el-radio-group>
          <el-date-picker v-model="timeValue" type="daterange" range-separator="-" start-placeholder="Start date"
            end-placeholder="End date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
        </div>
      </div>
      <div class="content flex flex-(1) gap16">
        <template v-if="activeOperation === 0">
          <question-card @question_card_change="question_card_change1" :title="questioncard_data.title[0]" :number="question_card_change_value1 === 'color'
            ? questioncard_data.color_num[0]
            : questioncard_data.size_num[0]
            " :rate="question_card_change_value1 === 'color'
              ? questioncard_data.color_rate[0]
              : questioncard_data.size_rate[0]
              " :xAxis="question_card_change_value1 === 'color'
                ? questioncard_data.color_xAxis[0]
                : questioncard_data.size_xAxis[0]
                " :yAxis="question_card_change_value1 === 'color'
                  ? questioncard_data.color_yAxis[0]
                  : questioncard_data.size_yAxis[0]
                  " />
          <question-card @question_card_change="question_card_change2" :title="questioncard_data.title[1]" :number="question_card_change_value2 === 'color'
            ? questioncard_data.color_num[1]
            : questioncard_data.size_num[1]
            " :rate="question_card_change_value2 === 'color'
              ? questioncard_data.color_rate[1]
              : questioncard_data.size_rate[1]
              " :xAxis="question_card_change_value2 === 'color'
                ? questioncard_data.color_xAxis[1]
                : questioncard_data.size_xAxis[1]
                " :yAxis="question_card_change_value2 === 'color'
                  ? questioncard_data.color_yAxis[1]
                  : questioncard_data.size_yAxis[1]
                  " />
          <question-card @question_card_change="question_card_change3" :title="questioncard_data.title[2]" :number="question_card_change_value3 === 'color'
            ? questioncard_data.color_num[2]
            : questioncard_data.size_num[2]
            " :rate="question_card_change_value3 === 'color'
              ? questioncard_data.color_rate[2]
              : questioncard_data.size_rate[2]
              " :xAxis="question_card_change_value3 === 'color'
                ? questioncard_data.color_xAxis[2]
                : questioncard_data.size_xAxis[2]
                " :yAxis="question_card_change_value3 === 'color'
                  ? questioncard_data.color_yAxis[2]
                  : questioncard_data.size_yAxis[2]
                  " />
        </template>
        <template v-if="activeOperation === 1">
          <FeedBack :color="feedback_color" :size="feedback_size" :evaluatePieBarChart_data="evaluatePieBarChart_data"
            @active_color_change="active_color_change" @active_size_change="active_size_change" />
        </template>
        <template v-if="activeOperation === 2">
          <Comparison :options1="comparison_options1" :options2="comparison_options2" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.goods-detail {
  .analysis {
    //   .tabs {
    //     .left {
    //      >span {
    //        color:$minor-text-color;
    //        cursor: pointer;
    //        &:hover {
    //          color: $main-color;
    //         }
    //         &.active {
    //          font-size: 18px;
    //          font-weight: bold;
    //          color: $main-text-color;
    //       }
    //     }
    //   }
    // }
  }
}
</style>
