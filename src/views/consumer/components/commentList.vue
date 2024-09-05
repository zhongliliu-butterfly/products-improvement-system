<script setup lang='ts'>
import type { ECOption } from '@/components/ECharts/config'
import words from '@/assets/json/wordClound'

const commentTabs = ['评论词云', '评论列表']
const activeTab = ref(0)
const switchVal = ref(false)
const props = defineProps<{
  wordList: [],
  translate_wordList: []
  commentList: [],
  total: 0
}>();
const options = ref<ECOption>({
  series: [{
    name: 'wordCloud',
    // @ts-expect-error
    type: 'wordCloud',
    size: ['0%', '99%'],
    sizeRange: [8, 30],
    textRotation: [0, 45, 90, -45],
    rotationRange: [-45, 90],
    textPadding: 5,
    left: 10,
    right: 0,
    top: 'center',
    bottom: 0,
    autoSize: {
      enable: true,
      minSize: 6,
    },
    gridSize: 10,
    textStyle: {
      color() {
        return `rgb(${[
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160),
          Math.round(Math.random() * 160),
        ].join(',')})`
      },
      emphasis: {
        shadowBlur: 10,
        shadowColor: '#333',
      },
    },
    height: '90%',
    width: '80%',
    data: !switchVal.value ? props.wordList : props.translate_wordList,
  }],
})
const list = ref([
  { name: '女装' },
  { name: '男装' },
  { name: '服饰' },
  { name: '文胸' },
  { name: '鞋包' },
  { name: '服饰' },
  { name: '母婴' },
  { name: '男鞋' },
])

const handleSelectionChange = (val) => {
  console.log('val', val)
}
const pageable = reactive({
  pageNum: 1,
  pageSize: 10,
  total: props.total,
})
const emits = defineEmits(["handleSizeChange", "handleCurrentChange"]);
const handleSizeChange = (size: number) => {
  emits("handleSizeChange", size);
  console.log('size', size)
  pageable.pageSize = size
}
const handleCurrentChange = (curPage: number) => {
  emits("handleCurrentChange", curPage);
  console.log('curPage', curPage)
  pageable.pageNum = curPage
}

watch(
  () => [props, switchVal],
  () => {
    options.value = {
      series: [{
        name: 'wordCloud',
        // @ts-expect-error
        type: 'wordCloud',
        size: ['0%', '99%'],
        sizeRange: [8, 30],
        textRotation: [0, 45, 90, -45],
        rotationRange: [-45, 90],
        textPadding: 5,
        left: 10,
        right: 0,
        top: 'center',
        bottom: 0,
        autoSize: {
          enable: true,
          minSize: 6,
        },
        gridSize: 10,
        textStyle: {
          color() {
            return `rgb(${[
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
            ].join(',')})`
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        height: '90%',
        width: '80%',
        data: !switchVal.value ? props.wordList : props.translate_wordList,
      }],
    }
    pageable.total = props.total
  }, {
  deep: true
}
)
</script>

<template>
  <div class="card h-full flex-(col 1)">
    <div class="header fc">
      <div class="tabs_wrap">
        <div class="tabs">
          <span v-for="(tab, index) in commentTabs" :key="index" :class="{ active: index === activeTab }"
            @click="activeTab = index">
            {{ tab }}
          </span>
        </div>
      </div>
      <div class="right m-l-auto fc gap20">
        <el-button v-show="activeTab === 1" type="primary" size="small" plain>
          批量添加至指标
        </el-button>
        <span class="fc gap20" v-if="activeTab == 0">
          <el-switch v-model="switchVal" active-text="翻译" />
        </span>
      </div>
    </div>
    <div v-show="activeTab === 0" class="content relative flex flex-1">
      <ECharts :option="options" />
      <!-- <ul class="scroll-none absolute right-0 max-h-full flex-col gap8 o-auto">
        <li v-for="(item, index) in list" :key="item.name" class="fc gap10">
          <span class="list-item">{{ index + 1 }}</span>
          {{ item.name }}
        </li>
      </ul> -->
    </div>
    <div v-show="activeTab === 1" class="list">
      <el-table size="small" :data="commentList" style="width: 100%" height="200" row-key="value"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="评论词语" prop="name" />
        <el-table-column label="频次" prop="value" width="150" />
        <el-table-column label="操作" width="150">
          <a class="mr10 text-primary-b">
            添加标签
          </a>
          <a class="text-primary-b">
            筛选原声
          </a>
        </el-table-column>
      </el-table>
      <Pagination class="h40 items-center justify-end" :pageable size="small" :handle-size-change
        :handle-current-change />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.header {
  .right {
    // --el-color-primary:var(--primary-b);
  }
}

.content {
  .list-item {
    @apply size-20 bg-primary-b rounded-full fcc cur-p text-white;
  }
}
</style>
