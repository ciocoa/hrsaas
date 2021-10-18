<template lang="pug">
.errPage-container
  el-button.pan-back-btn(icon="el-icon-arrow-left" @click="back") 返回
  el-row
    el-col(:span="12")
      h1.text-jumbo.text-ginormous Oops!
      h3 当前无权访问，联系管理员，或者你可以
      ul.list-unstyled
        li.link-type
          router-link(to="/dashboard") 回到首页
        li.link-type
          a(href="https://www.taobao.com/") 随便看看
        li.link-type
          a(href="#" @click.prevent="dialogVisible = true") 点我看图
        li.link-type
          a(href="https://zh.airbnb.com/" target="_blank") 说走就走
    el-col(:span="12")
      img(:src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.")
  el-dialog(v-model="dialogVisible" title="随便看")
    img(:src="ewizardClap" class="pan-img")
</template>

<script setup>
import errGif from '@/assets/401_images/401.gif'
import { toRefs, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const state = reactive({
  errGif: errGif + '?' + +new Date(),
  ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
  dialogVisible: false
})
/**
 * 返回
 */
const back = () => {
  if (route.query.noGoBack) {
    router.push({ path: '/dashboard' })
  } else {
    router.go(-1)
  }
}
const { ewizardClap, dialogVisible } = toRefs(state)
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  h1,
  h3 {
    margin-top: 20px;
  }
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
