<script setup lang='tsx'>
const cardList = ref<QueryCard[]>([
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
    title: '品牌',
    icon: 'brand',
    attrs: {
      placeholder: '请选择/搜索',
    },
    value: '',
    span: 4,
  },
  {
    title: '店铺',
    icon: 'shop',
    attrs: {
      placeholder: '请选择/搜索',
    },
    value: '',
    span: 4,
  },

  {
    title: '时间',
    icon: 'calendar',
    type: 'date-picker',
    attrs: {
      type: 'daterange',
    },
    span: 4,
    value: '',
  },
])
const activeTab = ref(0)
const tabs = ['行业反馈分析', '对比分析']
const titleRender = (type: 'opposite' | 'self') => {
  return (card: QueryCard) => {
    return (
      <span>
        <i class={['text-primary-b', type === 'opposite' ? 'text-error!' : '']}>{type === 'opposite' ? '对方' : '我方'}</i>
        {' - '}
        {card.title}
      </span>
    )
  }
}
const formItems = ref<QueryCard[]>([
  {
    title: '品类',
    titleRender: titleRender('self'),
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
    span: 3,
    value: '',
  },
  {
    title: '品牌',
    titleRender: titleRender('self'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
  {
    title: '店铺',
    titleRender: titleRender('self'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
  {
    itemRender: () => (
      <div class="fcc items-end pb10 size-full">VS</div>
    ),
    value: '',
    span: 1,
  },
  {
    title: '品类',
    titleRender: titleRender('opposite'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
  {
    title: '品牌',
    titleRender: titleRender('opposite'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
  {
    title: '店铺',
    titleRender: titleRender('opposite'),
    value: '',
    attrs: {
      placeholder: '请选择/搜索',
    },
    span: 3,
  },
])
const comparisonTabs = ref([
  {
    label: '品类 VS 品类',
    formItems,
  },
])
</script>

<template>
  <div class="page_wrapper analyse">
    <query-card :card-list="cardList" />

    <div class="content f-col-16">
      <div class="tabs_wrap">
        <div class="tabs">
          <span v-for="(item, index) in tabs" :key="index" :class="{ active: index === activeTab }" @click="activeTab = index">{{ item }}</span>
        </div>
      </div>
      <!-- 行业反馈分析 -->
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
        <el-row class="chart flex-1" :gutter="16">
          <el-col v-for="it in 3" :key="it" :span="8">
            <EvaluateRadarChart />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.f-col-16 {
  @apply  flex-(col 1) gap16;
}
.analyse {
  .vs{
    @apply fcc size-full;
  }
}
</style>
