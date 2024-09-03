<script setup lang='ts'>
import { h, onBeforeUnmount, provide, ref, watch } from "vue";
const props = defineProps<{
  size: [];
  color: [];
  evaluatePieBarChart_data: [];
}>();
const active_size = ref([]);
const active_color = ref([]);
</script>

<template>
  <div class="feedback card flex-(col 1)">
    <el-row class="header" :gutter="16">
      <el-col class="item">
        <label class="text-little">尺码</label>
        <el-space>
          <el-checkbox-group v-model="active_size"> <el-checkbox-button v-for="item in size" :key="item" class="tag"
              :label="item" :value="item" /></el-checkbox-group>
        </el-space>
      </el-col>
      <el-col class="item">
        <label class="text-little">颜色</label>
        <el-space>
          <el-checkbox-group v-model="active_color"> <el-checkbox-button v-for="item in color" :key="item" class="tag"
              :label="item" :value="item" /></el-checkbox-group>
        </el-space>
      </el-col>
    </el-row>
    <!-- 评价分析tab -->
    <EvaluateAnalyse class="flex-1" :evaluatePieBarChart0="evaluatePieBarChart_data[0]"
      :evaluatePieBarChart1="evaluatePieBarChart_data[1]" :evaluatePieBarChart2="evaluatePieBarChart_data[2]" />
  </div>
</template>

<style scoped lang='scss'>
.feedback {
  .header {
    border-bottom: 1px solid #f8f8fb;

    .item {
      @apply fc gap20 mb16px;

      .tag {
        margin-right: 20px;
        font-size: 12px;
        color: $main-text-color;

        :deep(.el-checkbox-button__inner) {
          width: 100px;
          border-left-color: #dcdfe6 // border: 1px solid #dcdfe6 !important
        }
      }

      .activetab {
        border: 1px solid red;
      }
    }
  }
}
</style>
