<script setup lang='ts' name='CommentItem'>
const props = defineProps<{ data: {}; translate: false }>();
</script>

<template>
  <div class="mb25 flex gap16 p16">
    <img :src="data.user_avatar" alt="" class="rounded-4 size-55" />
    <div class="content flex-col gap10">
      <span>{{ data.user_name }}</span>
      <span fc>
        <el-rate :model-value="data.review_score" disabled />{{
          data.review_title
        }}
      </span>
      <span class="time text-little"
        >{{ data.gmt_create }}在{{ data.market_place }}评论</span
      >
      <span class="goods text-little"
        >颜色：{{ data.color }} | 尺寸：{{ data.size }}</span
      >
      <p class="leading-relaxed" v-if="!translate">
        {{ data.review_content }}
      </p>
      <p class="text-little leading-relaxed" v-if="translate">
        翻译：{{ data.transl_review_content }}
      </p>
      <div class="tags fc gap16">
        <el-tag round color="#FF6E00" size="large" class="text-white!">
          {{ data.level3_label_name }}
        </el-tag>
        <el-tag round size="large" effect="plain" type="primary">
          + 添加标签
        </el-tag>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.tags {
  :deep(.el-tag) {
    --el-color-primary: $primary-b !important;
  }
}
</style>
