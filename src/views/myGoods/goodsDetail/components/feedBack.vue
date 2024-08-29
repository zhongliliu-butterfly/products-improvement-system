<script setup lang='ts'>
import { h, onBeforeUnmount, provide, ref, watch } from "vue";
const props = defineProps<{ size: [], color: []}>();
const active_size = ref('')
const active_color = ref('')
const size_click = (v) =>{
  active_size.value = v
}
const color_click = (v) =>{
  active_color.value = v
}
</script>

<template>
  <div class="feedback card flex-(col 1)">
    <el-row class="header" :gutter="16">
      <el-col class="item">
        <label class="text-little">尺码</label>
        <el-space>
          <span v-for="it in size" :key="it" class="tag" @click="size_click(it)" :class="active_size==it?'activetab':''">
            {{ it }}
          </span>
        </el-space>
      </el-col>
      <el-col class="item">
        <label class="text-little">颜色</label>
        <el-space>
          <span v-for="it in color" :key="it" class="tag" @click="color_click(it)" :class="active_size==it?'activetab':''">
            {{ it }}
          </span>
        </el-space>
      </el-col>
    </el-row>
    <!-- 评价分析tab -->
    <EvaluateAnalyse class="flex-1" />
  </div>
</template>

<style scoped lang='scss'>
.feedback {
  .header {
    border-bottom: 1px solid #F8F8FB;
    .item {
      @apply fc gap20 mb16px;
      .tag {
        padding: 8px 20px;
        font-size: 12px;
        color: $main-text-color;
        border:1px solid #E4E5EB;
        border-radius: 6px;
      }
      .activetab {
        border:1px solid red;
      }
    }
  }
}
</style>
