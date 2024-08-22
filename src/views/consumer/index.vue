<script setup lang='ts'>
import commentTag from './components/commentTag.vue'
import commentList from './components/commentList.vue'
import TagMange from './components/tagMamage.vue'

const btns = ref(['消费者说', '标签管理'])
const activeBtn = ref(0)
const cardList = ref<QueryCard[]>([
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
    icon: 'asin',
    value: '',
  },
  {
    title: '时间',
    icon: 'calendar',
    value: '',
    span: 5,
  },
])
</script>

<template>
  <div class="page_wrapper">
    <div class="detailBtns">
      <span v-for="(btn, index) in btns" :key="index" :class="{ active: index === activeBtn }" @click="activeBtn = index">{{ btn }}</span>
    </div>
    <div v-show="activeBtn === 0" class="consumerSay flex-(col 1) gap16">
      <query-card :card-list="cardList" />
      <div class="comment h300 fc gap16">
        <comment-tag />
        <div class="commentList h-full flex-1">
          <comment-list />
        </div>
      </div>
      <Comment class="comment-card flex-1" />
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
  :deep(.content){
    max-height: calc(100vh - 400px);
    overflow: auto;
  }
}
</style>
