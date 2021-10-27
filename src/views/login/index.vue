<template lang="pug">
.login-container.columnCC
  el-form.login-form(ref="loginFormRef" size="medium" :model="loginData" :rules="formRules")
    .title-container
      h3.title
        img(src="@/assets/common/login-logo.png")
    el-form-item(prop="mobile" :rules="formRules.checkPhone")
      .rowSC
        span.svg-container
          svg-icon(icon-class="user")
        el-input(v-model="loginData.mobile" placeholder="手机")
        .show-pwd
    el-form-item(prop="password" :rules="formRules.checkPwd")
      .rowSC
        span.svg-container
          svg-icon(icon-class="password")
        el-input(ref="passwordRef" name="password" :type="passwordType" :key="passwordType" v-model="loginData.password" @keyup.enter="handleLogin" placeholder="密码")
        span.show-pwd(@click="showPwd")
          svg-icon(:icon-class="passwordType === 'password' ? 'eye' : 'eye-open'")
    .tip-message {{ tipMessage }}
    el-button.login-btn(type="primary" :loading="loading" size="medium" @click.prevent="handleLogin") 登录
</template>

<script setup>
import { elMsg } from '@/utils/message'
import { ref, reactive, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const store = useStore()
const route = useRoute()
const router = useRouter()
const loginData = reactive({
  mobile: '13800000002',
  password: '123456'
})
const state = reactive({
  otherQuery: {},
  redirect: undefined
})
/** 监听路由变化 */
const getOtherQuery = query =>
  Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') acc[cur] = query[cur]
    return acc
  }, {})
watch(
  route,
  route => {
    const query = route.query
    if (query) {
      state.redirect = query.redirect
      state.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true }
)
const loginFormRef = ref(null)
const passwordRef = ref(null)
const loading = ref(false)
const tipMessage = ref('')
/** 请求登录 */
const handleLogin = async () => {
  try {
    await loginFormRef.value.validate()
    loading.value = true
    await store.dispatch('user/login', loginData)
    elMsg('登录成功')
    router.push({ path: state.redirect || '/', query: state.otherQuery })
  } catch (error) {
    tipMessage.value = error.message
  } finally {
    loading.value = false
  }
}
const passwordType = ref('password')
/** 密码的显示和隐藏 */
const showPwd = () => {
  if (passwordType.value === 'password') passwordType.value = ''
  else passwordType.value = 'password'
  nextTick(() => passwordRef.value.focus())
}
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #68b0fe;
.login-container {
  height: 100vh;
  width: 100%;
  background-image: url(@/assets/common/login.jpg);
  background-position: center;
  .login-form {
    margin-bottom: 20vh;
    width: 436px;
  }
  .title-container {
    .title {
      margin: 0px auto 25px auto;
    }
  }
}
.svg-container {
  padding-left: 6px;
  color: $dark_gray;
  text-align: center;
  width: 30px;
}
// 错误提示信息
.tip-message {
  color: #e4393c;
  height: 30px;
  margin-top: -12px;
  font-size: 12px;
}
// 登录按钮
.login-btn {
  width: 100%;
  height: 48px;
  line-height: 24px;
  margin-bottom: 30px;
  font-size: 24px;
}
.show-pwd {
  width: 50px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  text-align: center;
}
</style>
<style lang="scss">
// css 样式重置 增加个前缀避免全局污染
$light_gray: #68b0fe;
.login-container {
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__error {
    color: #fff;
  }
  .el-input input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 10px 5px 9px 15px;
    height: 48px; // 此处调整item的高度
    color: $light_gray;
    caret-color: $light_gray;
    font-size: 16px;
  }
}
</style>
