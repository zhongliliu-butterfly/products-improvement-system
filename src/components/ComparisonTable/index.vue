<script setup lang='tsx' name='ComparisonTable'>
const tableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: '版型',
    value: '13232',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: '面料',
    value: '9862',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: '材质',
        value: '4759',
        children: [
          {
            id: 311,
            date: '2016-05-01',
            name: '材质透明',
            value: '4759',
          },
          {
            id: 311,
            date: '2016-05-01',
            name: '材质偏薄',
            value: '4759',
          },
          {
            id: 311,
            date: '2016-05-01',
            name: '材质偏厚',
            value: '4759',
          },
        ],
      },
      {
        id: 32,
        date: '2016-05-01',
        name: '尺寸',
        value: '47598888',
      },
    ],
  },
  {
    id: 3,
    date: '2016-05-01',
    name: '颜色',
    value: '345345',

  },
]
</script>

<template>
  <div class="card">
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :border="true"
      default-expand-all
      size="large"
      height="500px"
    >
      <el-table-column prop="name" width="250px">
        <template #default="{ row }">
          <span class="mr20">{{ row.name }}</span>
          <svg-icon icon="tendency-up" />
        </template>
      </el-table-column>
      <el-table-column prop="value">
        <template #header>
          <div class="infoHeader">
            <img src="@/assets/images/test-goods.jpeg" class="rounded-4 size-72">
            <div class="info fc gap20">
              <div class="left flex-(col 1) gap5">
                <span class="btn">
                  当前美国
                </span>
                <span class="asin">
                  Asin：B0BQVRPZFK
                </span>
                <span>
                  数据源：所有
                </span>
              </div>
              <span flex-1>Saodimallsu Womens Summer Cap Sleeve
                Tops Casual Crew Neck Loose Fit Knit
                Lightweight Sweater Pullover Top</span>
            </div>
          </div>
        </template>
        <template #default="{ row }">
          <div class="fc">
            <span class="btn mr20 border-primary-b! text-primary-b!">占比60.1%</span>
            <span>{{ row.value }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="value">
        <template #header>
          <div class="comparisonHeader flex-col justify-evenly items-start!">
            <div class="btn bg-primary-b border-primary-b! text-white!">
              对比美国
            </div>
            <div class="font-400!">
              Amazon Resale
            </div>
          </div>
        </template>
        <template #default="{ row }">
          <div class="fc">
            <span class="btn mr20 bg-primary-b border-primary-b! text-white!">占比60.1%</span>
            <span>{{ row.value }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang='scss'>
.btn {
  @apply w-fit border-(1 #E4E5EB solid) rounded-4 px10 py3 text-primary-b;
}
.card {
  .infoHeader,.comparisonHeader{
    @apply fc font-400!  h100 gap20 text-14!;
  }
}
</style>
