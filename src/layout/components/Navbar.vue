<template>
  <div class="navbar rowBC">
    <div class="rowSC">
      <Hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <div class="app-breadcrumb">
        ***科技股份有限公司
        <span class="breadBtn">体验版</span>
      </div>
      <!-- <Breadcrumb class="breadcrumb-container" /> -->
    </div>
    <!--nav title-->
    <div class="heardCenterTitle" v-if="settings.showTitle">{{ settings.showTitle }}</div>
    <div class="right-menu" v-if="settings.ShowDropDown">
      <el-dropdown trigger="click" size="medium">
        <div class="avatar-wrapper">
          <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            class="user-avatar"
          />
          <span class="name">管理员</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/RedsNina/hrsaas-practice">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <!--<el-dropdown-item>修改密码</el-dropdown-item>-->
            <el-dropdown-item divided @click="loginOut">注销</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
// import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import { computed, getCurrentInstance } from 'vue'
import settings from '@/settings'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
let { proxy } = getCurrentInstance()

const opened = computed(() => {
  return proxy.$store.state.app.sidebar.opened
})
const toggleSideBar = () => {
  proxy.$store.commit('app/M_toggleSideBar')
}

// 退出登录
const store = useStore()
const loginOut = () => {
  store.dispatch('user/logout').then(() => {
    ElMessage({ message: '退出登录成功', type: 'success' })
    proxy.$router.push(`/login?redirect=${proxy.$route.fullPath}`)
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
