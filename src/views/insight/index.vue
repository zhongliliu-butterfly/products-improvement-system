<script setup lang='ts'>
import http from "@/api";
const activeBtn = ref(0);
const activeTab = ref(0);
const btns = ref(["统计", "详情"]);

const filterMethod = (node: any, keyword: string) => {
  return node.text.toLowerCase().includes(keyword.toLowerCase());
};

const remoteMethod = async (query: string) => {
  if (query) {
    const search_parent_asin_res = await http.get(
      `/system/search_parent_asin`,
      {
        parent_asin: query,
        user_id: "1555073968740999936",
      },
      { loading: false }
    );
    detailList.value[5].options = search_parent_asin_res?.data || [];
  }
};

const get_insight_statistics_select_info = async ()=>{
  const insight_statistics_select_info = await http.get(
      `/system/insight_statistics_select_info`,
      { loading: false }
    );
    const { market_place_id = [] } = {
      ...insight_statistics_select_info.data,
    };

    statList.value[0].options = insight_statistics_select_info.data;
}
const init_query = async () => {
    const insight_statistics_select_info = await http.get(
      `/system/insight_statistics_select_info`,
      { loading: false }
    );
    statList.value[0].options = insight_statistics_select_info.data;

    const insight_details_select_info = await http.get(
      `/system/insight_details_select_info`,
      {
        user_id: "1555073968740999936",
      },
      { loading: false }
    );
    const {
      market_place_id = [],
      cate_name = [],
      parent_asin = [],
      review_channel = [],
      label_emotion_type = [],
      review_tags = [],
    } = {
      ...insight_details_select_info.data,
    };
    detailList.value[0].options = market_place_id;
    detailList.value[1].options = cate_name;
    detailList.value[2].options = review_tags;
    detailList.value[4].options = label_emotion_type;
    detailList.value[5].options = review_channel;
    detailList.value[6].options = parent_asin;
  }

const handle = async (v) => {
  if (activeBtn.value == 0) {
    console.log(`类目：${v[0].value}`);
    console.log(`时间：${v[1].value}`);
    const res = await http.get(
      `/system/customer_feedback_analysis`,
      {
        cate_hierarchy_data: v[0].value,
        interval_date: v[1].value,
      },
      { loading: true }
    );
  } else {
    console.log(`国家/地区：${v[0].value}`);
    console.log(`类目：${v[1].value}`);
    console.log(`原声标签：${v[2].value}`);
    console.log(`评分范围：${v[3].value}`);
    console.log(`情感：${v[4].value}`);
    console.log(`评价渠道：${v[5].value}`);
    console.log(`商品ASIN：${v[6].value}`);
    console.log(`时间：${v[7].value}`);
    const res = await http.get(
      `/system/insights_reviews_list`,
      {
        user_id: "1555073968740999936",
        market_place_id: v[0].value,
        cate_hierarchy_data: v[1].value,
        review_tags: v[2].value,
        emotion_type: v[4].value,
        review_channel: v[5].value,
        parent_asin: v[6].value,
        interval_date: v[6].value,
      },
      { loading: true }
    );
  }
};

const handletab = async (index) => {
  activeTab.value = index;
  if (index == 0) {
    const res = await http.get(
      `/system/customer_feedback_analysis`,
      {
        cate_hierarchy_data: detailList[0].value,
        interval_date: detailList[1].value,
      },
      { loading: true }
    );
  } else {
  }
};

const statList = ref<QueryCard[]>([
  {
    title: "类目",
    icon: "category",
    type: "cascader",
    filterMethod: filterMethod,
    props: {
      multiple: true,
    },
    attrs: {
      placeholder: "请选择/搜索",
    },
    span: 4,
  },
  {
    title: "时间",
    icon: "calendar",
    span: 4,
    options: [
      { label: "近一个月", value: "0" },
      { label: "近三个月", value: "1" },
      { label: "近半年", value: "2" },
      { label: "近一年", value: "3" },
      { label: "上架至今", value: "4" },
    ],
  },
]);

onBeforeMount(async () => {
  console.log("init query", activeBtn.value);
  init_query();
});

const detailList = ref<QueryCard[]>([
  {
    title: "国家/地区",
    icon: "country",
    isMultiple: true,
  },
  {
    title: "类目",
    icon: "category",
    type: "cascader",
    filterMethod: filterMethod,
    props: {
      multiple: true,
    },
    attrs: {
      placeholder: "请选择/搜索",
    },
  },
  {
    title: "原声标签",
    icon: "asin",
  },
  {
    title: "评分范围",
    icon: "evaluate",
    attrs: {
      placeholder: ["最小值", "最大值"],
    },
    type: "rank",
    value: [],
  },
  {
    title: "情感",
    icon: "emotion",
  },
  {
    title: "评价渠道",
    icon: "channel",
  },
  {
    title: "商品ASIN",
    icon: "asin",
    type: "select",
    attrs: {
      placeholder: "请输入ASIN",
    },
    isMultiple: true,
    remoteMethod: remoteMethod,
  },
  {
    title: "时间",
    icon: "calendar",
    options: [
      { label: "近一个月", value: "0" },
      { label: "近三个月", value: "1" },
      { label: "近半年", value: "2" },
      { label: "近一年", value: "3" },
      { label: "上架至今", value: "4" },
    ],
  },
  // {
  //   title: "时间",
  //   icon: "calendar",
  //   type: "date-picker",
  //   style: { "min-width": "230px" },
  //   attrs: {
  //     type: "daterange",
  //   },
  //   value: "",
  //   span: 5,
  // },
]);
const tabs = ["客户反馈分析", "对比分析"];

const formItems = ref<QueryCard[]>([
  {
    title: "国家",
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
    value: "",
  },
  {
    title: "类目",
    value: "",
    attrs: {
      placeholder: "请选择/搜索",
    },
  },
  {
    title: "店铺",
    value: "",
    attrs: {
      placeholder: "请选择/搜索",
    },
  },
]);
const comparisonTabs = ref([
  {
    label: "商品 VS 商品",
    formItems,
  },
]);
</script>

<template>
  <div class="page_wrapper">
    <div class="detailBtns">
      <span
        v-for="(btn, index) in btns"
        :key="index"
        :class="{ active: index === activeBtn }"
        @click="activeBtn = index"
        >{{ btn }}</span
      >
    </div>
    <query-card
      :card-list="activeBtn === 0 ? statList : detailList"
      @handle="handle"
    />
    <div v-show="activeBtn === 0" class="content f-col-16">
      <div class="tabs_wrap">
        <div class="tabs">
          <span
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ active: index === activeTab }"
            @click="handletab(index)"
            >{{ item }}</span
          >
        </div>
      </div>
      <!-- 反馈分析 -->
      <div v-if="activeTab === 0" class="f-col-16">
        <div class="feedback h280 fc gap20">
          <EvaluateLineChart
            v-for="(item, index) in 3"
            :key="index"
            class="flex-1"
          />
        </div>
        <el-row class="card flex-1">
          <el-col>
            <EvaluateAnalyse />
          </el-col>
        </el-row>
      </div>
      <!-- 对比分析 -->
      <div v-else class="f-col-16">
        <ComparisonTabs :comparison-tabs="comparisonTabs" />
        <comparison-table class="flex-1" />
      </div>
    </div>
    <Comment v-show="activeBtn === 1" class="comment-card flex-1" />
  </div>
</template>

<style scoped lang='scss'>
.f-col-16 {
  @apply flex-(col 1) gap16;
}
.comment-card {
  :deep(.el-tabs__content) {
    max-height: calc(100vh - 400px);
    overflow: auto;
  }
}
</style>
