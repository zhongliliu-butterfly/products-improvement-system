<script setup lang="ts" name="TreeFilter">
import http from "@/api";
import { nextTick, onBeforeMount, ref, watch } from "vue";
import { ElTree } from "element-plus";
import { Search } from "@element-plus/icons-vue";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
  requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
  data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
  title?: string; // treeFilter 标题 ==> 非必传
  id?: string; // 选择的id ==> 非必传，默认为 “id”
  label?: string; // 显示的label ==> 非必传，默认为 “label”
  multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
  defaultValue?: any; // 默认选中的值 ==> 非必传
  showButton?: boolean; // 是否显示新增按钮 ==> 非必传，默认为 false
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
  id: "id",
  label: "label",
  multiple: false,
  showButton: false
});
const opposition_label_options = ref<any>([]);
const current_tree_data = ref<any>({});

// emit
const emit = defineEmits<{
  change: [value: any];
}>();

const defaultProps = {
  children: "children",
  label: props.label,
};

const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);
const dialogFormVisible = ref(false);
const dialogFormVisible_title = ref("");
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const submitlabel = async () => {
  const level2_params = {
    current_level: "2",
    label_name: "柔顺",
    user_id: "1555073968740999936",
    level_id: "10001"
  }
  const level3_params = {
    current_level: "3",
    label_name: "轻柔2",
    user_id: "1555073968740999936",
    level_id: "1724989010",
    label_emotion_type: "pos",
    opposition_label_id: "1724996187",
    opposition_label_name: "粗糙3",
    key_words: "xxxxx"
  }
  const { data } = await http.get(
    `/system/add_custom_label`, {},
    { loading: false }
  );
  dialogFormVisible.value = false;
};

const add_label = async (v) => {
  opposition_label_options.value = []
  if (v.level == 2) await get_opposition_label(v);
  current_tree_data.value = v;
  dialogFormVisible_title.value = `新增${v.label}下的标签`;
  dialogFormVisible.value = true;
};

const selected = ref();
const setSelected = () => {
  if (props.multiple)
    selected.value = Array.isArray(props.defaultValue)
      ? props.defaultValue
      : [props.defaultValue];
  else
    selected.value =
      typeof props.defaultValue === "string" ? props.defaultValue : "";
};

onBeforeMount(async () => {
  setSelected();
  // if (props.requestApi) {
  //   const { data } = await props.requestApi!();
  //   treeData.value = data;
  //   treeAllData.value = [{ id: "", [props.label]: "全部" }, ...data];
  // }
});

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
  () => props.defaultValue,
  () => nextTick(() => setSelected()),
  { deep: true, immediate: true }
);

watch(
  () => props.data,
  () => {
    if (props.data?.length) {
      treeData.value = props.data;
      // treeAllData.value = [{ id: "", [props.label]: "全部" }, ...props.data];
      treeAllData.value = props.data;
    }
  },
  { deep: true, immediate: true }
);

const get_opposition_label = async (v) => {
  const { data } = await http.get(
    `/system/opposition_label`,
    {
      user_id: "1555073968740999936",
      parent_id: v.value,
    },
    { loading: false }
  );
  opposition_label_options.value = data;
};

const filterText = ref("");
watch(filterText, (val) => {
  treeRef.value!.filter(val);
});

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
  if (!value) return true;
  // let parentNode = node.parent;
  // let labels = [node.label];
  // let level = 1;
  // while (level < node.level) {
  //   labels = [...labels, parentNode.label];
  //   parentNode = parentNode.parent;
  //   level++;
  // }
  // return labels.some((label) => label.includes(value));
};

// 切换树节点的展开或折叠状态
const toggleTreeNodes = (isExpand: boolean) => {
  const nodes = treeRef.value?.store.nodesMap;
  if (!nodes) return;
  for (const node in nodes) {
    if (Reflect.has(nodes, node)) {
      nodes[node].expanded = isExpand;
    }
  }
};

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
  if (props.multiple) return;
  emit("change", data[props.id]);
};

// 多选
const handleCheckChange = () => {
  emit("change", treeRef.value?.getCheckedKeys());
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef });
</script>

<template>
  <div class="card filter">
    <h4 v-if="title" class="title sle">
      {{ title }}
    </h4>
    <div class="search">
      <el-input v-model="filterText" placeholder="请输入标签名称" clearable :suffix-icon="Search" />
      <!-- <el-dropdown trigger="click">
        <el-icon size="20">
          <More />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toggleTreeNodes(true)">
              展开全部
            </el-dropdown-item>
            <el-dropdown-item @click="toggleTreeNodes(false)">
              折叠全部
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
</el-dropdown> -->
    </div>
    <el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
      <el-tree ref="treeRef" :node-key="id" :data="multiple ? treeData : treeAllData" :show-checkbox="multiple"
        :check-strictly="false" :current-node-key="!multiple ? selected : ''" :highlight-current="!multiple"
        :expand-on-click-node="false" :check-on-click-node="multiple" :props="defaultProps"
        :filter-node-method="filterNode" :default-checked-keys="multiple ? selected : []" @node-click="handleNodeClick"
        @check="handleCheckChange">
        <template #default="scope">
          <span class="el-tree-node__label custom-tree-node">
            <slot :row="scope">
              <span>{{ scope.node.label }}</span>
              <span v-if="showButton"><a @click="add_label(scope.data)"
                  v-if="Number(scope.data.level) == 1 || Number(scope.data.level) == 2"> +
                </a></span>
            </slot>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
    <el-dialog :title="dialogFormVisible_title" v-model="dialogFormVisible" style="max-width: 600px">
      <el-form :model="form" label-position="right" label-width="auto">
        <el-form-item label="标签名称" label-position="right" prop="age">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签情感" label-position="right" v-if="current_tree_data.level == 2">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="正向" value="pos"></el-option>
            <el-option label="负向" value="neg"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词" label-position="right" v-if="current_tree_data.level == 2">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="对立标签" label-position="right" v-if="current_tree_data.level == 2">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option v-for="(option, idx) in opposition_label_options" :key="idx" :label="option.label"
              :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitlabel">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
@import "./index";
</style>
