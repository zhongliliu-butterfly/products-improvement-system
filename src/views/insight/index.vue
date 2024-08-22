<script setup lang='ts'>
const activeBtn = ref(0)
const activeTab = ref(0)
const btns = ref(['统计', '详情'])
const statList = ref<QueryCard[]>([
  {
    title: '类目',
    icon: 'category',
    attrs: {
      placeholder: '请选择/搜索',
    },
    value: '',
    span: 4,
  },

  {
    title: '时间',
    icon: 'calendar',
    span: 4,
    value: '',
  },
])
const detailList = ref<QueryCard[]>([
  {
    title: '国家/地区',
    icon: 'country',
    value: '',
  },
  {
    title: '品类',
    icon: 'category',
    value: '',
  },
  {
    title: '原声标签',
    icon: 'asin',
    value: '',
  },
  {
    title: '评分范围',
    icon: 'evaluate',
    value: '',
  },
  {
    title: '情感',
    icon: 'emotion',
    value: '',
  },
  {
    title: '评价渠道',
    icon: 'channel',
    value: '',
  },
  {
    title: '商品ASIN',
    type: 'input',
    icon: 'asin',
    value: '',
    attrs: {
      placeholder: '请输入ASIN',
    },
  },
  {
    title: '时间',
    icon: 'calendar',
    type: 'date-picker',
    style: { 'min-width': '230px' },
    attrs: {
      type: 'daterange',
    },
    value: '',
    span: 5,
  },
])
const tabs = ['客户反馈分析', '对比分析']

const formItems = ref<QueryCard[]>([
  {
    title: '国家',
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
    value: '',
  },
  {
    title: '类目',
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
  },
  {
    title: '店铺',
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
  },
])
const comparisonTabs = ref(
  [
    {
      label: '商品 VS 商品',
      formItems,
    },
  ],
)
</script>

<template>
  <div class="page_wrapper">
    <div class="detailBtns">
      <span v-for="(btn, index) in btns" :key="index" :class="{ active: index === activeBtn }" @click="activeBtn = index">{{ btn }}</span>
    </div>
    <query-card :card-list="activeBtn === 0 ? statList : detailList" />
    <div v-show="activeBtn === 0" class="content f-col-16">
      <div class="tabs_wrap">
        <div class="tabs">
          <span v-for="(item, index) in tabs" :key="index" :class="{ active: index === activeTab }" @click="activeTab = index">{{ item }}</span>
        </div>
      </div>
      <!-- 反馈分析 -->
      <div v-if="activeTab === 0" class="f-col-16">
        <div class="feedback h280 fc gap20">
          <EvaluateLineChart v-for="(item, index) in 3" :key="index" class="flex-1" />
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
  :deep(.el-tabs__content){
    max-height: calc(100vh - 400px);
    overflow: auto;
  }
}
</style>
