<script setup lang='ts' name='Comment'>
const activeName = ref("all");
const switchVal = ref(false);
interface CommentData {
  reviews: Array<Object>;
  total: number;
}
const props = defineProps<{ comment_data: CommentData }>();
const emits = defineEmits(["tabClick"]);
const tabClick = (v) => {
  emits("tabClick", v.props.name as string);
};
</script>

<template>
  <div class="card relative">
    <span class="absolute right-20 top-20 z-99">
      <el-switch v-model="switchVal" active-text="翻译" active-color="#f00" />
    </span>
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane>
        <template #label>
          <span class="text-(20 main!) font-600" @click.stop="">原生列表</span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="all">
        <template #label>
          <span>全部({{ comment_data.total }})</span>
        </template>
        <div class="content max-h-full o-auto p10">
          <CommentItem
            v-for="item in comment_data.reviews"
            :key="item.review_id"
            :data="item"
            :translate="switchVal"
          />
          <!-- TODO: 评论列表无数据 -->
          <el-empty v-show="false" />
        </div>
      </el-tab-pane>
      <el-tab-pane name="img">
        <template #label>
          <span>有图片({{ comment_data.total }})</span>
        </template>
        <div class="content p10">
          <CommentItem
            v-for="item in comment_data.reviews"
            :key="item.review_id"
            :data="item"
            :translate="switchVal"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
