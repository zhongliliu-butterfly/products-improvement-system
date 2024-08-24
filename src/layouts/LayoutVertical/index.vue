<!-- 纵向布局 -->
<script setup lang="ts" name="layoutVertical">
import { ElMessage, ElMessageBox } from 'element-plus'
import ToolBarMiddle from '../components/Header/ToolBarMiddle.vue'
import { useAuthStore } from '@/stores/modules/auth'
import { useGlobalStore } from '@/stores/modules/global'
import { useUserStore } from '@/stores/modules/user'
import Main from '@/layouts/components/Main/index.vue'
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import { logoutApi } from '@/api/modules/login'
import { LOGIN_URL } from '@/config'

const title = import.meta.env.VITE_GLOB_APP_TITLE
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const accordion = computed(() => globalStore.accordion)
const isCollapse = computed(() => globalStore.isCollapse)
const menuList = computed(() => authStore.showMenuListGet)
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string)
const logout = () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 1.执行退出登录接口
    await logoutApi()

    // 2.清除 Token
    userStore.setToken('')

    // 3.重定向到登陆页
    router.replace(LOGIN_URL)
    ElMessage.success('退出登录成功！')
  })
}
</script>

<template>
  <el-container class="layout">
    <el-aside class="relative">
      <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
        <div class="logo fcc gap4">
          <img class="logo-img" src="@/assets/icons/logo.svg" alt="logo">
          <div v-show="!isCollapse" class="title flex-col items-center gap4">
            <span class="logo-text">{{ title }}</span>
            <span class="text-(8 #ccc)">Product Improvement System</span>
          </div>
        </div>
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeMenu"
            :collapse="isCollapse"
            :unique-opened="accordion"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="absolute bottom-0 h55 w-full bg-white text-(center minor)">
        <span fcc cur-p @click="logout">
          <svg-icon icon="logout" />
          退出
        </span>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarMiddle />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
@import "./index";
</style>
