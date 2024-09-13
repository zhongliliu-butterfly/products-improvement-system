<script setup lang='ts'>
import http from "@/api";
import commentTag from "./components/commentTag.vue";
import commentList from "./components/commentList.vue";
import TagMange from "./components/tagMamage.vue";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

const btns = ref(["消费者说", "标签管理"]);
const activeBtn = ref(0);
const dateList = ref([
  { label: "近一个月", value: "0" },
  { label: "近三个月", value: "1" },
  { label: "近半年", value: "2" },
  { label: "近一年", value: "3" },
  { label: "上架至今", value: "4" },
]);

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
    cardList.value[6].options = search_parent_asin_res?.data || [];
  }
};

const cardList = ref<QueryCard[]>([
  {
    title: "国家/地区",
    icon: "country",
    isMultiple: true,
  },
  {
    title: "类目",
    icon: "category",
    type: "cascader",
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
    options: dateList.value,
    value: "0",
  },
]);
const comment_data = ref([]);
const cate_hierarchy_data = ref([]);
const comment_tabClick_value = ref("all");
const comment_label = ref({
  xAxisdata: [],
  negdata: [],
  posdata: [],
});
const comment_list = ref({
  word_counts: [],
  translate_word_counts: [],
  page_words: [],
  total: 0,
});
const comment_list_pageable = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});

const comment_tabClick = async (v) => {
  comment_tabClick_value.value = v;
  await render_commentList(cardList.value, cate_hierarchy_data.value);
};
const commentListSizeChange = async (val) => {
  comment_list_pageable.pageSize = val;
  comment_list_pageable.pageNum = 1;
  await render_commentList(cardList.value, cate_hierarchy_data.value);
};
const commentListCurrentChange = async (val) => {
  comment_list_pageable.pageNum = val;
  await render_commentList(cardList.value, cate_hierarchy_data.value);
};

onBeforeMount(async () => {
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
  cardList.value[0].options = market_place_id;
  cardList.value[1].options = cate_name;
  cardList.value[2].options = review_tags;
  cardList.value[4].options = label_emotion_type;
  cardList.value[5].options = review_channel;
  cardList.value[6].options = parent_asin;
});

const get_all_first_label = async (v, a, return_flag) => {
  return await http.get(
    "/system/all_first_label",
    {
      market_place_id: JSON.stringify(v[0].value),
      review_tags: v[2].value,
      cate_hierarchy_data: JSON.stringify(a),
      emotion_type: v[4].value,
      review_channel: v[5].value,
      parent_asin: JSON.stringify(v[6].value),
      interval_date: v[7].value,
      user_id: "1555073968740999936",
      min_data: "",
      max_data: "",
      return_flag: return_flag,
      flag: comment_tabClick_value.value == "all" ? 1 : 2,
      pageNumber: comment_list_pageable.pageNum,
      pageSize: comment_list_pageable.pageSize,
    },
    { loading: true }
  );
};
const render_commentLabel = async (v, a) => {
  const commentLabel = await get_all_first_label(v, a, 1);
  const xAxisdata = [],
    negdata = [],
    posdata = [];
  commentLabel?.data.forEach((element) => {
    xAxisdata.push(element.label_name);
    negdata.push(element.neg_num);
    posdata.push(element.pos_num);
  });
  comment_label.value = {
    xAxisdata,
    negdata,
    posdata,
  };
};
const render_commentData = async (v, a) => {
  const commentData = await get_all_first_label(v, a, 3);
  comment_data.value = commentData.data;
};
const render_commentList = async (v, a) => {
  const commentList = await get_all_first_label(v, a, 2);
  comment_list.value = commentList.data;
};

const handle = async (v, a) => {
  cate_hierarchy_data.value = a;
  render_commentLabel(v, a);
  render_commentData(v, a);
  render_commentList(v, a);
};
</script>

<template>
  <div class="page_wrapper">
    <div class="detailBtns">
      <span v-for="(btn, index) in btns" :key="index" :class="{ active: index === activeBtn }"
        @click="activeBtn = index">{{ btn }}</span>
    </div>
    <div v-show="activeBtn === 0" class="consumerSay flex-(col 1) gap16">
      <query-card :card-list="cardList" @handle="handle" />
      <div class="comment h300 fc gap16">
        <comment-tag :xAxisdata="comment_label.xAxisdata" :negdata="comment_label.negdata"
          :posdata="comment_label.posdata" />
        <div class="commentList h-full flex-1">
          <comment-list :wordList="comment_list?.word_counts" :translate_wordList="comment_list?.translate_word_counts"
            :commentList="comment_list?.page_words" :total="comment_list.total"
            @handleSizeChange="commentListSizeChange" @handleCurrentChange="commentListCurrentChange" />
        </div>
      </div>
      <Comment class="comment-card flex-1" :comment_data="comment_data" @tabClick="comment_tabClick" />
    </div>
    <div v-show="activeBtn === 1" class="tagManage flex-(col 1)">
      <p class="mb20 text-little">
        通过此模块：1、查看标签列表；2、管理自定义标签；3、管理系统标签；4、设置对立标签。
      </p>
      <TagMange />
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment-card {
  :deep(.content) {
    max-height: calc(100vh - 400px);
    overflow: auto;
  }
}
</style>
