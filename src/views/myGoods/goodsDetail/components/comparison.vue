<script setup lang='ts'>
import EvaluateRadarChart from './evaluateRadarChart.vue'

const activeName = ref('1')
const cardList = ref<QueryCard[]>([
  {
    title: '国家',
    icon: 'country',
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
    span: 8,
    value: '',
  },
  {
    title: '商品ASIN',
    icon: 'calendar',
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 8,
  },
])
</script>

<template>
  <div class="comparison w-full flex-col gap16">
    <div class="goods card">
      <el-tabs v-model="activeName" class="feedback-tabs flex-1">
        <el-tab-pane label="商品 VS 商品" name="1">
          <div class="pane fc">
            <comparison-com :card-list="cardList" class="flex-1" />
            <div class="goodsInfo">
              <span class="text-secondary w40 break-keep">对方 信息</span>
              <img src="@/assets/images/test-goods.jpeg" size="62" rounded-5>
              <div class="infos">
                <span class="name font-600">
                  Under Armour 安德瑪 男款 Tech Golf Polo 衫
                </span>
                <div class="rate fc gap20">
                  <i class="text-little">亚马逊</i>
                  <el-rate
                    :model-value="4"
                    disabled
                    show-score
                    score-template="{value}.0"
                  />
                  <i text="#666">529条评价</i>
                  <i text="#666">189条退货评价</i>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品ASIN" name="2">
          22
        </el-tab-pane>
        <el-tab-pane label="商品 VS 店铺" name="3">
          33
        </el-tab-pane>
        <el-tab-pane label="商品 VS 行业" name="4">
          444
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-row class="chart" :gutter="16">
      <el-col v-for="it in 3" :key="it" :span="8">
        <EvaluateRadarChart />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang='scss'>
.pane{
  .goodsInfo{
    @apply text-12  fc flex-1 gap20 bg-#F8F8FA rounded-8 px20 py10;
  }
}
.chart {
  min-height:max(260px, 70%)
}
</style>
