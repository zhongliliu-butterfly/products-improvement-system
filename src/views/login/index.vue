<script setup lang="ts" name="login">
import LoginForm from './components/LoginForm.vue'
import SwitchDark from '@/components/SwitchDark/index.vue'
</script>

<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <!-- <SwitchDark class="dark" /> -->
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login">
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/icons/logo.svg" alt="">
          <h2 class="logo-text">
            商品改进系统
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index";
</style>
