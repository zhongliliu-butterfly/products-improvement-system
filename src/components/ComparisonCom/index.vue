<script setup lang='ts'>
const props = defineProps<{ cardList: QueryCard[] }>()
const handle = () => {
  console.log('handle', props.cardList)
}
</script>

<template>
  <el-form
    class="comparisonCom flex gap16" label-position="top"
  >
    <el-row class="w-full" :gutter="20">
      <el-col v-for="(card, index) in cardList" :key="index" :span="card.span || 3">
        <el-form-item :label="card.title">
          <component :is="`el-${card.type ?? 'select'}`" v-bind="card.attrs" v-model="card.value">
            <el-option v-for="(option, idx) in card.options" :key="idx" :label="option.label" :value="option.value" />
          </component>
        </el-form-item>
      </el-col>
      <el-form-item class="items-end flex!">
        <el-button type="primary" @click="handle">
          开始对比
        </el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<style scoped lang='scss'>
.el-form-item {
  margin-bottom: 0;
}
  .search {
    @apply h-full w70px fcc rounded-6 text-white cur-p;

    background: url('@/assets/images/search-bg.png') no-repeat;
    background-size: 100% 100%;
  }
</style>
