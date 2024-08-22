<script setup lang="tsx" name="treeProTable">
import { Delete, EditPen, Plus, View } from '@element-plus/icons-vue'
import type { User } from '@/api/interface'
import type { genderType } from '@/utils/dict'
import { useHandleData } from '@/hooks/useHandleData'
import type { ColumnProps, ProTableInstance } from '@/components/ProTable/interface'
import { deleteUser, getUserDepartment, getUserTreeList } from '@/api/modules/user'

onMounted(() => {
  getTreeFilter()
})

const proTable = ref<ProTableInstance>()

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ departmentId: '' })

// 获取 treeFilter 数据
// 当 proTable 的 requestAuto 属性为 false，不会自动请求表格数据，等待 treeFilter 数据回来之后，更改 initParam.departmentId 的值，才会触发请求 proTable 数据
const treeFilterData = ref<any>([])
const getTreeFilter = async () => {
  const { data } = await getUserDepartment()
  treeFilterData.value = data
  initParam.departmentId = treeFilterData.value[1].id
}

// 树形筛选切换
const changeTreeFilter = (val: string) => {
  proTable.value!.pageable.pageNum = 1
  initParam.departmentId = val
}

// 模拟远程加载性别搜索框数据
const loading = ref(false)
const filterGenderEnum = ref<typeof genderType>([])

// 表格配置项
const columns = reactive<ColumnProps[]>([
  { prop: 'tagName', label: '标签名称' },
  {
    prop: 'type',
    label: '类型',
    enum: filterGenderEnum,
    render: scope => <>{scope.row.type}</>,
  },
  { prop: 'sideTagName', label: '对立标签' },
  { prop: 'createTime', label: '提交时间', width: 180 },
  { prop: 'operation', label: '操作', width: 300, fixed: 'right' },
])
const tagVal = ref('0')
const data = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  tagName: `标签${index}`,
  sideTagName: '标注问题',
  createTime: '2024/07/15 14:20:34',
  type: '新增',
}))
</script>

<template>
  <div class="tagList flex gap16">
    <div class="tree-wrapper scroll-none min-w250 flex-col gap20 rounded-10 bg-white px15 py20">
      <div class="tabs h30 fcc">
        <el-radio-group v-model="tagVal">
          <el-radio-button label="自定义标签" value="0" />
          <el-radio-button label="系统标签" value="1" />
        </el-radio-group>
      </div>
      <!-- <div class="content flex-1 o-auto"> -->
      <TreeFilter
        label="name"
        :data="treeFilterData"
        :default-value="initParam.departmentId"
        class="tree-card"
        @change="changeTreeFilter"
      />
      <!-- </div> -->
    </div>

    <div class="table-box">
      <ProTable
        ref="proTable"
        row-key="id"
        :indent="20"
        :columns="columns"
        :request-auto="false"
        :init-param="initParam"
        :tool-button="false"
        :data
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <div class="header w-full fbc">
            <div class="left">
              <span class="text-(20 main) font-600">我提交的标签</span>
              <p class="mt20 text-(14 little)">
                在此可以查看，编辑您提交的标签信息，点击详情查看详细信息
              </p>
            </div>
            <el-button type="primary" :icon="Plus">
              添加标签
            </el-button>
          </div>
        </template>
        <template #operation>
          <el-button type="primary" link :icon="View">
            详情
          </el-button>
          <el-button type="primary" link :icon="EditPen">
            修改
          </el-button>
          <el-button type="primary" link :icon="Delete">
            删除
          </el-button>
        </template>
      </ProTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tagList {
  height:calc(100vh - 230px);
  :deep(.header-button-lf){
    float: unset !important;
  }
  .tree-wrapper{
    .tabs {
      >span{
        @apply text-#999 cur-p;
        &.active {
          @apply text-primary;
        }
      }
    }
    .tree-card {
      @apply flex-1 o-auto  m0! h-auto! w-auto! border-none! p0! shadow-none!;
    }
  }
}
</style>
