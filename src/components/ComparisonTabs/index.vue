<script setup lang='ts' name="ComparisonTabs">
import http from "@/api";
export interface ComparisonTabsType {
  comparisonTabs: {
    label: string;
    formItems: QueryCard[];
  }[];
}
const country_value = ref();
const asin_value = ref();
const goodsInfo = ref({
  title:'',
  review_channel:'',
  review_score:0,
  evaluate_num:'',
  review_count:''
})
const props = defineProps<ComparisonTabsType>();
const handle = async () => {
  const one_product = await http.get(
    `/system/one_product`,
    {
      parent_asin: asin_value.value||'B0B7MS96L8',
      market_place_id: country_value.value,
    },
    { loading: false }
  );
  goodsInfo.value = one_product.data;
};

const item_change = (card) => {
  console.log(card);
  if (card.title == "商品ASIN") {
    asin_value.value = card.value;
  } else {
    country_value.value = card.value;
  }
};
const activeName = ref(0);
</script>

<template>
  <div class="card">
    <el-tabs v-model="activeName" class="h150 flex-1">
      <el-tab-pane
        v-for="(tab, index) in comparisonTabs"
        :key="index"
        :label="tab.label"
        :name="index"
      >
        <div class="pane fc">
          <el-form class="comparisonCom flex flex-1 gap16" label-position="top">
            <el-row class="w-full" :gutter="20">
              <el-col
                v-for="(card, idx) in tab.formItems"
                :key="idx"
                :span="card.span || 3"
              >
                <component :is="card.itemRender(card)" v-if="card.itemRender" />
                <el-form-item v-else :label="card.title">
                  <component
                    :is="`el-${card.type ?? 'select'}`"
                    v-bind="card.attrs"
                    v-model="card.value"
                    @change="item_change(card)"
                  >
                    <el-option
                      v-for="(option, ix) in card.options"
                      :key="ix"
                      :label="option.label"
                      :value="option.value"
                    />
                  </component>
                  <template v-if="card.titleRender" #label>
                    <component :is="card.titleRender(card)" />
                  </template>
                </el-form-item>
              </el-col>
              <el-form-item class="items-end flex!">
                <el-button type="primary" @click="handle"> 开始对比 </el-button>
              </el-form-item>
            </el-row>
          </el-form>
          <div v-if="goodsInfo" class="goodsInfo">
            <span class="w40 break-keep text-minor">对方 信息</span>
            <img src="@/assets/images/test-goods.jpeg" size="62" rounded-5 />
            <div class="infos">
              <span class="name font-600">
                {{goodsInfo.title}}
              </span>
              <div class="rate fc gap20">
                <i class="text-little">{{ goodsInfo.review_channel }}</i>
                <el-rate
                  :model-value="goodsInfo.review_score"
                  disabled
                  show-score
                  score-template="{value}.0"
                />
                <i text="#666">{{ goodsInfo.evaluate_num }}条评价</i>
                <i text="#666">{{ goodsInfo.review_count }}条退货评价</i>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品ASIN" name="2"> 22 </el-tab-pane>
      <el-tab-pane label="商品 VS 店铺" name="3"> 33 </el-tab-pane>
      <el-tab-pane label="商品 VS 行业" name="4"> 444 </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang='scss'>
.el-form-item {
  margin-bottom: 0;
}
.search {
  @apply h-full w70px fcc rounded-6 text-white cur-p;

  background: url("@/assets/images/search-bg.png") no-repeat;
  background-size: 100% 100%;
}
.pane {
  .goodsInfo {
    @apply text-12 fc flex-1 gap20 bg-#F8F8FA rounded-8 px20 py10;
  }
}
</style>
