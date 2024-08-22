<script setup lang='ts' name='CommentItem'>
</script>

<template>
  <div class="mb25 flex gap16 p16">
    <img src="@/assets/images/avatar.jpg" alt="" class="rounded-4 size-55">
    <div class="content flex-col gap10">
      <span>Edward Llyod MALLARI</span>
      <span fc>
        <el-rate :model-value="4" disabled />很合身
      </span>
      <span class="time text-little">2024年6月23日在美国评论</span>
      <span class="goods text-little">颜色：卡其色  |  尺寸3X-Large</span>
      <p class="leading-relaxed">
        The shirts look good. my husband wore them in the ocean and they worked great. He is on medication and cannot be exposed to the sun. They are lightweight and dry quickly.
        He also has worn them underneath a golf shirt to protect his arms. They are comfortable.
      </p>
      <p class="text-little leading-relaxed">
        翻译：这些衬衫看起来不错。我丈夫在海里穿着它们而且效果很好。他正在服药，不能暴露在阳光下。它们重量轻，干得快。为了保护自己的手臂，他还将它们穿在高尔夫球衣下面。它们很舒服。这些衬衫看起来不错。我丈夫在海里穿着它们而且效果很好。他正在服药，不能暴露在阳光下。它们重量轻，干得快。为了保护自己的手臂，他还将它们穿在高尔夫球衣下面。它们很舒服。
      </p>
      <div class="tags fc gap16">
        <el-tag round color="#FF6E00" size="large" class="text-white!">
          舒适
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
  :deep(.el-tag){
    --el-color-primary:$primary-b !important;
  }
}
</style>
