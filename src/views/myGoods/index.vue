<script setup lang='ts'>
import { id } from "element-plus/es/locale";
import CommentTendency from "./components/commentTendency.vue";
import type { ColumnProps } from "@/components/ProTable/interface";
import TestGoods from "@/assets/images/test-goods.jpeg";
import http from "@/api";
import { h, onBeforeUnmount, provide, ref, watch } from "vue";
import { ElMessage } from "element-plus";

const myref = ref();
const router = useRouter();
const cate_hierarchy_data = ref([]);

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
    cardList.value[2].options = search_parent_asin_res?.data || [];
    console.log(search_parent_asin_res.data);
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
    span: 4,
  },
  {
    title: "父ASIN",
    icon: "asin",
    type: "select",
    attrs: {
      placeholder: "请输入父ASIN",
    },
    isMultiple: true,
    remoteMethod: remoteMethod,
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
    title: "评价渠道",
    icon: "channel",
    attrs: {
      placeholder: "请选择/搜索",
    },
    value: "",
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
    value: "0",
  },
]);
const columns = reactive<ColumnProps<any>[]>([
  {
    label: "商品信息",
    prop: "title",
    width: 235,
  },
  {
    label: "总评价量",
    prop: "reviews_ratings",
    sortable: true,
    width: 120,
  },
  {
    label: "退货量",
    prop: "return_volume",
    sortable: true,
  },
  {
    label: "退货率",
    prop: "return_rate",
    sortable: true,
  },
  {
    label: "星级评分",
    prop: "avg_reviews_score",
    sortable: true,
    width: 160,
  },
  {
    label: "TOP3正向评价",
    prop: "forward_3_label",
    width: 260,
  },
  {
    label: "TOP3负向评价",
    prop: "negative_3_labels",
    width: 260,
  },
  {
    label: "操作",
    prop: "operation",
    fixed: "right",
    width: 130,
  },
]);

const tabledatas = reactive({ data: [] });
const handleSizeChange = (v) => {
  pageable.currentPage = 1;
  pageable.pageSize = v;
  get_product_table(cardList.value, []);
};

const handleCurrentChange = (v) => {
  pageable.currentPage = v;
  get_product_table(cardList.value, []);
};
const pageable = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100,
  handleSizeChange: handleSizeChange,
  handleCurrentChange: handleCurrentChange,
});

const handleRowClick = async (row: any, col: any) => {
  console.log("col", col);
  if (col.property !== "title") return;
  router.push({
    name: "goodsDetail",
    params: { parent_asin: row.parent_asin },
    query: { market_place_id: row.market_place_id },
  });
};

const toUrl = (url: string) => {
  window.open(url);
};

const follow = async (row: object) => {
  const { data, msg } = await http.post(
    `/system/search_product`,
    {
      market_place_id: row?.market_place_id,
      parent_asin: row?.parent_asin,
      user_id: "1555073968740999936",
    },
    { loading: false }
  );
  ElMessage.success(msg);
};

const unfollow = async (row: string) => {
  const { data, msg } = await http.put(
    `/system/search_product`,
    {
      market_place_id: row?.market_place_id,
      parent_asin: row?.parent_asin,
      user_id: "1555073968740999936",
    },
    { loading: false }
  );
  ElMessage.success(msg);
};

const activeTab = ref(0);
const tabs = ["全部商品", "我的关注", "告警商品"];
const tendencyVisible = ref(false);
const tendency_xAxis = ref(Array<any>());
const tendency_data1 = ref(Array<any>());
const tendency_data2 = ref(Array<any>());
const postotal = ref(0);
const negtotal = ref(0);

const opentendencyVisible = async (parent_asin: string) => {
  const review_trend_res = await http.get(
    `/system/review_trend`,
    {
      parent_asin: parent_asin,
    },
    { loading: false }
  );
  const x: any[] = [],
    d1: any[] = [],
    d2: any[] = [];
  for (var i in review_trend_res.data.review_trend) {
    x.push(i);
    d1.push(review_trend_res.data.review_trend[i].pos);
    d2.push(review_trend_res.data.review_trend[i].neg);
  }
  tendency_xAxis.value = x;
  tendency_data1.value = d1;
  tendency_data2.value = d2;
  postotal.value = review_trend_res.data.total.pos;
  negtotal.value = review_trend_res.data.total.neg;
  tendencyVisible.value = true;
};

const get_product_table = async (v, a, flag = 1) => {
  const res = await http.get(
    `/system/search_product`,
    {
      market_place_id: JSON.stringify(v[0].value),
      cate_hierarchy_data: JSON.stringify(a),
      parent_asin: JSON.stringify(v[2].value),
      min_score: v[3].value[0],
      max_score: v[3].value[1],
      review_channel: v[4].value,
      interval_date: v[5].value,
      min_data: "",
      max_data: "",
      flag: flag,
      user_id: "1555073968740999936",
      pageSize: pageable.pageSize,
      pageNumber: pageable.currentPage,
    },
    { loading: true }
  );
  tabledatas.data = res.data.data;
  pageable.total = res.data.total;
};

const handleactiveName = async (index: number) => {
  activeTab.value = index;
  get_product_table(cardList.value, [], index + 1);
};

const get_product_select_info = async () => {
  const prodcut_select_info_res = await http.get(
    `/system/product_select_info`,
    {
      user_id: "1555073968740999936",
    },
    { loading: true }
  );
  const {
    market_place_id = [],
    cate_name = [],
    parent_asin = [],
    review_channel = [],
  } = {
    ...prodcut_select_info_res.data,
  };

  cardList.value[0].options = market_place_id;
  cardList.value[1].options = cate_name;
  cardList.value[2].options = parent_asin;
  cardList.value[4].options = review_channel;
};

onBeforeMount(async () => {
  console.log("init query");
  get_product_select_info();
  get_product_table(cardList.value, [], activeTab.value + 1);
});

const handle = async (v, a) => {
  cate_hierarchy_data.value = a;
  console.log(`国家/地区：${JSON.stringify(v[0].value)}`);
  console.log(`类目：${JSON.stringify(a)}`);
  console.log(`父Asin：${JSON.stringify(v[2].value)}`);
  console.log(`评分范围：${v[3].value}`);
  console.log(`评价渠道：${v[4].value}`);
  console.log(`时间：${v[5].value}`);
  get_product_table(v, a);
};
</script>

<template>
  <div class="page_wrapper">
    <div class="query">
      <QueryCard :card-list="cardList" ref="myref" @handle="handle" />
    </div>
    <div class="my_goods_list relative">
      <ProTable
        class="proTable"
        :columns="columns"
        :tool-button="false"
        :data="tabledatas.data"
        :border="false"
        row-key="id"
        height="calc(100vh - 390px)"
        @row-click="handleRowClick"
        :paginationOptions="pageable"
      >
        <template #tableHeader>
          <div class="tabs_wrap">
            <div class="tabs">
              <span
                v-for="(item, index) in tabs"
                :key="index"
                class="fc gap5"
                :class="[index === activeTab ? 'active' : '']"
                @click="handleactiveName(index)"
              >
                {{ item }}
                <svg-icon v-show="index === 2" icon="warning" color="#D40000" />
              </span>
            </div>

            <span class="text-(12 #999) ml-auto!">
              全部商品会在此展示，点击关注商品，该商品会归纳到我的关注，告警商品会被标为红色
            </span>
          </div>
        </template>
        <template #title="{ row }">
          <div class="goods-info">
            <div class="image">
              <div class="mask">
                <span v-if="row.warning">
                  <svg-icon icon="warning" color="#fff" class="mr0" />
                  {{ row.warning ? "告警" : "" }}
                </span>
                <span v-else class="opacity-80% bg-white!">
                  <svg-icon icon="heart" class="mr0" color="#666" size="14px" />
                  <i text-minor>已关注</i>
                </span>
              </div>
              <img :src="row.main_image_url" alt="" class="size-full" />
            </div>
            <div class="info flex-col gap10">
              <div class="name">
                {{ row.title }}
              </div>
              <div class="asin text-#aaa">
                {{ row.parent_asin }}
              </div>
            </div>
          </div>
        </template>
        <template #reviews_ratings="{ row }">
          <span class="text-minor">{{ row.reviews_ratings }}</span>
        </template>
        <template #return_volume="{ row }">
          <span class="text-error">{{ row.return_volume }}</span>
        </template>
        <template #return_rate="{ row }">
          <span class="text-error">{{ row.return_rate }}</span>
        </template>
        <template #avg_reviews_score="{ row }">
          <el-rate v-model="row.avg_reviews_score" disabled allow-half />
          <div>
            {{ row.avg_reviews_score }}
          </div>
        </template>
        <template #forward_3_label="{ row }">
          <div class="forward">
            <div
              v-for="item in row.forward_3_label"
              :key="item"
              class="item fc gap5"
            >
              <div class="proportion">
                {{ item.count }} / {{ item.proportion }}
              </div>
              <span class="desc truncate">{{ item.label_name }}</span>
            </div>
          </div>
        </template>
        <template #negative_3_labels="{ row }">
          <div class="negative">
            <div
              v-for="item in row.negative_3_labels"
              :key="item"
              class="item fc gap5"
            >
              <div class="proportion">
                {{ item.count }} / {{ item.proportion }}
              </div>
              <span class="desc truncate">{{ item.label_name }}</span>
            </div>
          </div>
        </template>
        <!-- 表格操作 -->
        <template #operation="{ row }">
          <div class="operation flex-col gap-5">
            <a type="primary" @click="opentendencyVisible(row.parent_asin)">
              <svg-icon icon="tendency" size="18px" />查看趋势
            </a>
            <a @click="toUrl(row.item_link)"
              ><svg-icon icon="link" size="18px" />链接直达</a
            >
            <a @click="follow(row)">
              <svg-icon icon="heart" size="18px" />关注商品
            </a>
            <i class="cur-p text-minor" @click="unfollow(row)">
              <svg-icon icon="unheart" color="#aaa" size="18px" />取消关注
            </i>
          </div>
        </template>
      </ProTable>
      <!-- 评论趋势 -->
      <CommentTendency
        v-model="tendencyVisible"
        :xAxis="tendency_xAxis"
        :data1="tendency_data1"
        :data2="tendency_data2"
        :postotal="postotal"
        :negtotal="negtotal"
      />
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import "./style";
.el-dialog .el-dialog__header {
  border-bottom: none;
}
</style>
