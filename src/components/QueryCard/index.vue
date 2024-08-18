<script setup lang='ts' name="QueryCard">
import { defineExpose, ref } from "vue";
const props = defineProps<{ cardList: QueryCard[] }>();
const emits = defineEmits(["handle"]);
const handle = async () => {
  console.log("handle", props.cardList);
  emits("handle", props.cardList);
};
</script>

<template>
  <el-row class="query-container h90 flex gap16">
    <el-col
      v-for="(card, index) in cardList"
      :key="index"
      :span="card.span || 3"
      class="card"
      :style="card.style"
    >
      <div class="header fc">
        <svg-icon :icon="card.icon" />
        <span class="header-title text-12">{{ card.title }}</span>
      </div>
      <div class="body" v-if="card.type == 'rank'">
        <el-input
          v-model="card.value[0]"
          :placeholder="card.attrs?.placeholder[0]"
        />
        <span>-</span>
        <el-input
          v-model="card.value[1]"
          :placeholder="card.attrs?.placeholder[1]"
        />
      </div>
      <div class="body" v-else>
        <el-cascader
          v-if="card.type == 'cascader'"
          :props="card.props"
          :options="card.options"
          v-model="card.value"
        />
        <component
          v-else
          :is="`el-${card.type ?? 'select'}`"
          v-bind="card.attrs"
          v-model="card.value"
        >
          <el-option
            v-for="(option, idx) in card.options"
            :key="idx"
            :label="option.label"
            :value="option.value"
          />
        </component>
      </div>
    </el-col>
    <div class="search" @click="handle">查询</div>
  </el-row>
</template>

<style scoped lang='scss'>
.query-container {
  .card {
    @apply h-full p0 o-hidden;

    // width: 136px;
    .header {
      height: 40px;
      padding: 0 10px;
      color: $main-text-color;
      border-bottom: 1px solid $border-light;
    }
    .body {
      @apply fcc px-10;

      height: calc(100% - 40px);
      :deep(.el-select__wrapper) {
        box-shadow: none;
      }
      :deep(.el-input__wrapper) {
        box-shadow: none;
      }
    }
  }
  .search {
    @apply h-full w70px fcc rounded-6 text-white cur-p;

    background: url("@/assets/images/search-bg.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
