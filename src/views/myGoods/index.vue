<script setup lang='ts'>
import { id } from "element-plus/es/locale";
import type { ColumnProps } from "@/components/ProTable/interface";
import TestGoods from "@/assets/images/test-goods.jpeg";
import http from "@/api";
import { h, onBeforeUnmount, provide, ref, watch } from "vue";

const myref = ref();
const router = useRouter();

const cardList = ref<QueryCard[]>([
  {
    title: "国家/地区",
    icon: "country",
    options: [],
    value: "",
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
    value: "",
    span: 4,
  },
  {
    title: "父ASIN",
    icon: "asin",
    type: "input",
    attrs: {
      placeholder: "请输入父ASIN",
    },
    value: "",
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
    value: "",
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
const tabledata = Array.from({ length: 10 }).map((_, index) => ({
  title: "商品名称" + index,
  main_image_url: TestGoods,
  parent_asin: "ASINASINASINASIN",
  total: "100",
  refund: "10",
  star: 4.0,
  forward: "100",
  negative: "100",
  refundRate: "12%",
  id: index + "商品名称1",
}));
let tabledatas = reactive({ data: tabledata });

const handleRowClick = async (row: any) => {
  router.push({ name: "goodsDetail", params: { id: row.title } });
  // console.log("router", router);
  console.log("row", row);
};

const toUrl = (url: string) => {
  window.open(url);
};

const follow = async (row: object) => {
  const { data } = await http.post(
    `/system/search_product`,
    {
      market_place_id: row?.market_place_id,
      asin: row?.parent_asin,
      u_id: "1555073968740999936",
    },
    { loading: false }
  );
  console.log("关注：", data);
};

const unfollow = async (row: string) => {
  const { data } = await http.put(
    `/system/search_product`,
    {
      market_place_id: row?.market_place_id,
      asin: row?.parent_asin,
      u_id: "1555073968740999936",
    },
    { loading: false }
  );
  console.log("取关：", data);
};

const activeName = ref<string>("first");
const handleactiveName =async (tab: string,flag:number) => {
  activeName.value = tab;
  console.log(tab);
  const res = await http.get(
    `/system/search_product`,
    {
      // market_place_id: "",
      // cate_name: "",
      // cate_level: "",
      // parent_asin: "",
      // review_channel: "",
      flag: flag,
      user_id: "1555073968740999936",
    },
    { loading: true }
  );
  tabledatas.data = res.data;
};


onBeforeMount(async () => {
  console.log("init query");
  const { data } = await http.get(
    `/system/prodcut_select_info`,
    {
      market_place_id: "",
      cate_name: "",
      cate_level: "",
      parent_asin: "",
      review_channel: "",
      user_id: "1555073968740999936",
    },
    { loading: false }
  );
  const {
    market_place_id,
    cate_name,
    cate_level,
    parent_asin,
    review_channel,
  } = { ...data };
  cardList.value[0].options = market_place_id;
  cardList.value[1].options = cate_name;
  cardList.value[4].options = review_channel;
});

const handle = async (v) => {
  console.log(`国家/地区：${v[0].value}`);
  console.log(`类目：${v[1].value}`);
  console.log(`父Asin：${v[2].value}`);
  console.log(`评分范围：${v[3].value}`);
  console.log(`评价渠道：${v[4].value}`);
  console.log(`时间：${v[5].value}`);
  const res = await http.get(
    `/system/search_product`,
    {
      // market_place_id: "",
      // cate_name: "",
      // cate_level: "",
      // parent_asin: "",
      // review_channel: "",
      flag: 1,
      user_id: "1555073968740999936",
    },
    { loading: true }
  );
  tabledatas.data = res.data;
};
// watch(data, (newVal, oldVal, onCleanup) => {
//   console.log(newVal, oldVal);
//   onCleanup(() => {
//     console.log("clear");
//   });
// });
</script>

<template>
  <div class="max-h-full flex-col gap16">
    <div class="query">
      <QueryCard :card-list="cardList" ref="myref" @handle="handle" />
    </div>
    <div class="table-box">
      <ProTable
        class="proTable"
        :columns="columns"
        :tool-button="false"
        :data="tabledatas.data"
        :border="false"
        row-key="title"
        ize="small"
        @row-click="handleRowClick"
      >
        <template #tableHeader>
          <div class="tableHeader w-full fcc gap20 text-(12 #666)">
            <span
              :class="{ active: activeName === 'all' }"
              @click="handleactiveName('all',1)"
              >全部商品</span
            >
            <span
              :class="{ active: activeName === 'myFollow' }"
              @click="handleactiveName('myFollow',2)"
              >我的关注</span
            >
            <span
              class="fc gap5"
              :class="{ active: activeName === 'warning' }"
              @click="handleactiveName('warning',1)"
            >
              告警商品
              <svg-icon icon="warning" />
            </span>
            <span class="text-(12 #999) ml-auto!">
              全部商品会在此展示，点击关注商品，该商品会归纳到我的关注，告警商品会被标为红色
            </span>
          </div>
        </template>
        <template #title="{ row }">
          <div class="goods-info fcc gap10 text-12">
            <img :src="row.main_image_url" alt="" class="size-72" />
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
          <span class="text-#999999">{{ row.reviews_ratings }}</span>
        </template>
        <template #return_volume="{ row }">
          <span class="text-#999999">{{ row.return_volume }}</span>
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
            <a><svg-icon icon="tendency" />查看趋势</a>
            <a @click="toUrl(row.item_link)"
              ><svg-icon icon="link" />链接直达</a
            >
            <a @click="follow(row)"><svg-icon icon="heart" />关注商品</a>
            <a @click="unfollow(row)"><svg-icon icon="unheart" />取消关注</a>
          </div>
        </template>
      </ProTable>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.table-box {
  .tableHeader {
    span {
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
  .name {
    max-width: 140px;
    white-space: normal;
  }
  :deep(.header-button-lf) {
    width: 100%;
  }
  :deep(thead .cell) {
    font-size: 12px;
    font-weight: normal;
    color: #999999;
  }
  .negative,
  .forward {
    @apply flex-col gap10 o-hidden;

    padding: 0 10px;
    font-size: 12px;
    .proportion {
      // height: 16px;
      padding: 0 5px;

      // line-height: 16px;
      color: #ffffff;
      background-color: #ff6e00;
      border-radius: 16px;
    }
  }
  .negative .proportion {
    background-color: #358270;
  }
  .operation {
    a {
      @apply text-(#0073EB) cur-p;

      margin: 0;
      font-size: 12px;
    }
  }
}
</style>
