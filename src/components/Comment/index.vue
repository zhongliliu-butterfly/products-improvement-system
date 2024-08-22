<script setup lang='ts' name='Comment'>
const activeName = ref('first')
const switchVal = ref(false)
</script>

<template>
  <div class="card relative">
    <span class="absolute right-20 top-20 z-99">
      <el-switch v-model="switchVal" active-text="翻译" active-color="#f00" />
    </span>
    <el-tabs v-model="activeName">
      <el-tab-pane>
        <template #label>
          <span class="text-(20 main!) font-600" @click.stop="">原生列表</span>
        </template>
      </el-tab-pane>
      <el-tab-pane name="first">
        <template #label>
          <span>全部(9999)</span>
        </template>
        <div class="content max-h-full o-auto p10">
          <CommentItem v-for="item in 10" :key="item" />
          <!-- TODO: 评论列表无数据 -->
          <el-empty v-show="false" />
        </div>
      </el-tab-pane>
      <el-tab-pane name="second">
        <template #label>
          <span>有图片(333)</span>
        </template>
        <div class="content p10">
          <CommentItem />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
