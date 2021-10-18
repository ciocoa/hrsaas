<template lang="pug">
.navbar.rowBC
  .rowSC 
    hamburger.hamburger-container(v-if="settings.showHamburger" :is-active="opened" @toggleClick="toggleSideBar")
    .app-breadcrumb 传智科技股份有限公司
      span.breadBtn 体验版
    breadcrumb.breadcrumb-container
  .heardCenterTitle(v-if="settings.showTitle") {{ settings.showTitle }}
  .right-menu(v-if="settings.ShowDropDown")
    el-dropdown(trigger="click" size="medium")
      .avatar-wrapper
        img.user-avatar(v-imagerror="defaultImage" :src="defaultImage")
        span.name {{ username }}
        i.el-icon-caret-bottom
      template(#dropdown)
        el-dropdown-menu
          router-link(to='/')
            el-dropdown-item 首页
          a(target="_blank" href="https://github.com/RedsNina/hrsaas-practice")
            el-dropdown-item Github
          el-dropdown-item 修改密码
          el-dropdown-item(divided @click="loginOut") 注销
</template>

<script setup>
import settings from '@/settings'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import { toRefs, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const store = useStore()
const route = useRoute()
const router = useRouter()

// 汉堡按钮开关
const opened = computed(() => store.getters.sidebar.opened)
const toggleSideBar = () => store.commit('app/M_toggleSideBar')
// 用户信息
const userInfo = reactive({
  username: computed(() => store.getters.userInfo.username),
  staffPhoto: computed(() => store.getters.userInfo.staffPhoto),
  defaultImage: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
})
const { username, defaultImage } = toRefs(userInfo)

/**
 * 注销登录
 */
const loginOut = () => {
  store.dispatch('user/logout').then(() => {
    ElMessage({ message: '注销成功', type: 'success' })
    router.push(`/login?redirect=${route.fullPath}`)
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.app-breadcrumb {
  display: inline-block;
  font-size: 18px;
  line-height: 50px;
  margin-left: 10px;
  color: #ffffff;
  cursor: text;
  .breadBtn {
    background: #84a9fe;
    font-size: 14px;
    padding: 0 10px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    margin-left: 15px;
  }
}
//logo
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  cursor: pointer;
  .user-avatar {
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    vertical-align: middle;
  }
  .name {
    color: #fff;
    vertical-align: middle;
    margin-left: 5px;
  }
  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 12px;
    font-size: 12px;
    color: #fff;
  }
}
//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}
//drop-down
.right-menu {
  cursor: pointer;
  margin-right: 40px;
}
</style>
