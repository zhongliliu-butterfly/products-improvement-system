<script setup lang='ts'>
import QuestionCard from "./components/questionCard.vue";
import FeedBack from "./components/feedBack.vue";
import Comparison from "./components/comparison.vue";

const route = useRoute();
const goodsId = route.params.id;
console.log("goodsId", goodsId);
const cardList = ref<QueryCard[]>([
  {
    title: "国家/地区",
    icon: "country",
    options: [
      {
        label: "中国",
        value: "1",
      },
      {
        label: "美国",
        value: "2",
      },
    ],
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
const dateValue = ref("");
const activeOperation = ref(0);
const tabs = ["重点问题跟进", "客户反馈分析", "对比分析"];
</script>

<template>
  <div class="goods-detail min-h-full flex-col gap16">
    <div class="query">
      <QueryCard :card-list="cardList" />
    </div>
    <!-- 商品信息 -->
    <div class="goods-info card h130 fbc">
      <div class="left fc gap12">
        <img src="@/assets/images/test-goods.jpeg" class="rounded-4 size-80" />
        <div class="info flex-col self-stretch justify-between text-12">
          <span class="font-600"
            >Under Armour 安德瑪 男款 Tech Golf Polo 衫1</span
          >
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
        <el-button type="primary" size="large"> 关注商品 </el-button>
        <el-button plain size="large"> 查看原声 </el-button>
      </el-space>
    </div>
    <!-- 分析tabs -->
    <div class="analysis flex-(col 1) gap16">
      <div class="tabs h40 fbc!">
        <div class="left fc gap20">
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
    .tabs {
      .left {
        transition: all 0.2s;
        span {
          color: $secondary-text-color;
          cursor: pointer;
          &:hover {
            color: $main-color;
          }
          &.active {
            font-size: 18px;
            font-weight: bold;
            color: $main-text-color;
          }
        }
      }
    }
  }
}
</style>
