<script setup lang='ts'>
import QuestionCard from "./components/questionCard.vue";
import FeedBack from "./components/feedBack.vue";
import Comparison from "./components/comparison.vue";
import http from "@/api";
import { ElMessage } from "element-plus";

const route = useRoute();
const goods = route.params.id;
console.log("goods", goods);

const cardList = ref<QueryCard[]>([
  {
    title: "国家/地区",
    icon: "country",
    span: 4,
    value: "",
  },
  {
    title: "数据源",
    icon: "calendar",
    value: "",
    span: 4,
  },
]);

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
      user_id: "1555073968740999936",
    },
    { loading: false }
  );
  console.log();
});

const handle = async (v) => {
  console.log(`国家/地区：${v[0].value}`);
  console.log(`数据源：${v[1].value}`);
  const res = await http.get(
    `/system/focus_follow`,
    {
      parent_asin: "",
      market_place_id: "",
      min_data: "",
      max_data: "",
      interval_date: "",
      user_id: "1555073968740999936",
    },
    { loading: true }
  );
};

const follow = async (row: object) => {
  const { data } = await http.post(
    `/system/search_product`,
    {
      market_place_id: "",
      asin: "",
      u_id: "1555073968740999936",
    },
    { loading: false }
  );
  console.log("关注：", data);
};

const originView = () => {
  ElMessage.info("查看原声");
};

const dateValue = ref("");
const activeOperation = ref(0);
const tabs = ["重点问题跟进", "客户反馈分析", "对比分析"];
</script>

<template>
  <div class="goods-detail min-h-full flex-col gap16">
    <div class="query">
      <QueryCard :card-list="cardList" @handle="handle" />
    </div>
    <!-- 商品信息 -->
    <div class="goods-info card h130 fbc">
      <div class="left fc gap12">
        <img src="@/assets/images/test-goods.jpeg" class="rounded-4 size-80" />
        <div class="info flex-col self-stretch justify-between text-12">
          <span class="font-600">{{ goods }}</span>
          <span text="little">亚马逊</span>
          <div class="rate fc gap20">
            <el-rate
              :model-value="4"
              disabled
              show-score
              score-template="{value}.0"
            />
            <i text="secondary">529条评价</i>
            <i text="secondary">189条退货评价</i>
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
            @click="activeOperation = index"
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
          <FeedBack />
        </template>
        <template v-if="activeOperation === 2">
          <Comparison />
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
