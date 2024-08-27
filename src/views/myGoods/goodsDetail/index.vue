<script setup lang='ts'>
import QuestionCard from "./components/questionCard.vue";
import FeedBack from "./components/feedBack.vue";
import Comparison from "./components/comparison.vue";
import http from "@/api";
import { ElMessage } from "element-plus";

const route = useRoute();
const parent_asin = route.params.parent_asin;
const market_place_id = route.query.market_place_id;
const goodInfo = ref({});
const feedback_color = ref([]);
const feedback_size = ref([]);
const comparison_options1 = ref([]);
const comparison_options2 = ref([]);

const cardList = ref<QueryCard[]>([
  {
    title: "国家/地区",
    icon: "country",
    span: 4,
    value: market_place_id,
  },
  {
    title: "数据源",
    icon: "calendar",
    span: 4,
  },
]);

const dateValue_change = (v) => {
  console.log(v, 11111111111);
};
onBeforeMount(async () => {
  const { data } = await http.get(
    `/system/detail_select_info`,
    {
      user_id: "1555073968740999936",
    },
    { loading: false }
  );
  const { marketplaces_data, data_source } = { ...data };
  cardList.value[0].options = marketplaces_data;
  cardList.value[1].options = data_source;

  const one_product = await http.get(
    `/system/one_product`,
    {
      parent_asin: parent_asin,
      market_place_id: market_place_id,
    },
    { loading: false }
  );
  goodInfo.value = one_product.data;
  console.log(goodInfo.value);
});

const handle = async (v) => {
  console.log(`国家/地区：${v[0].value}`);
  console.log(`数据源：${v[1].value}`);
  // const res = await http.get(
  //   `/system/focus_follow`,
  //   {
  //     parent_asin: "",
  //     market_place_id: "",
  //     min_data: "",
  //     max_data: "",
  //     interval_date: "",
  //     user_id: "1555073968740999936",
  //   },
  //   { loading: true }
  // );
};

const follow = async () => {
  const { data, msg } = await http.post(
    `/system/search_product`,
    {
      market_place_id: market_place_id || cardList.value[0].value,
      parent_asin: parent_asin,
      user_id: "1555073968740999936",
    },
    { loading: false }
  );
  ElMessage.success(msg);
};

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

const dateValue = ref("");
const activeOperation = ref(0);

const tabs = ["重点问题跟进", "客户反馈分析", "对比分析"];
const handle_tab = async (index: number) => {
  activeOperation.value = index;
  if (index == 0) {
    const focus_follow = await http.get(`/system/focus_follow`, {
      parent_asin: parent_asin,
      // market_place_id: market_place_id || cardList.value[0].value,
      market_place_id: "ATVPDKIKX0DER",
      min_data: dateValue.value[0] || "2024-08-09",
      max_data: dateValue.value[1] || "2024-08-10",
      // interval_date: 0,
    });
  } else if (index == 1) {
    // 尺码颜色
    const color_size_label = await http.get(`/system/color_size_label`, {
      parent_asin: parent_asin,
      // market_place_id: market_place_id || cardList.value[0].value,
    });
    feedback_color.value = color_size_label.data.color;
    feedback_size.value = color_size_label.data.size;
  } else {
    // 对比分析筛选栏
    const comparative_analysis_select_info = await http.get(
      `/system/comparative_analysis_select_info`,
      {
        parent_asin: parent_asin,
        flag: 1,
        user_id: "1555073968740999936",
      }
    );
    comparison_options1.value =
      comparative_analysis_select_info.data.market_place;
    comparison_options2.value = comparative_analysis_select_info.data.result;
  }
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
            <el-rate
              :model-value="goodInfo.review_score"
              disabled
              show-score
              score-template="{value}.0"
            />
            <i text="secondary">{{ goodInfo.evaluate_num }}条评价</i>
            <i text="secondary">{{ goodInfo.review_count }}条退货评价</i>
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
          <span
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ active: activeOperation === index }"
            @click="handle_tab(index)"
            >{{ tab }}</span
          >
        </div>
        <div class="right fc gap12">
          <el-radio-group v-model="dateValue">
            <el-radio-button label="近一个月" value="近一个月" />
            <el-radio-button label="近三个月" value="近三个月" />
            <el-radio-button label="近半年" value="近半年" />
            <el-radio-button label="近一年" value="近一年" />
            <el-radio-button label="上架至今" value="上架至今" />
          </el-radio-group>
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="-"
            start-placeholder="Start date"
            end-placeholder="End date"
            @change="dateValue_change"
          />
        </div>
      </div>
      <div class="content flex flex-(1) gap16">
        <template v-if="activeOperation === 0">
          <question-card />
          <question-card />
          <question-card />
        </template>
        <template v-if="activeOperation === 1">
          <FeedBack :color="feedback_color" :size="feedback_size" />
        </template>
        <template v-if="activeOperation === 2">
          <Comparison
            :options1="comparison_options1"
            :options2="comparison_options2"
          />
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
