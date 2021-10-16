import { loginReq, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
// 状态
const state = {
  token: getToken(),
  userInfo: {}
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    // 浅拷贝的方式赋值对象
    state.userInfo = { ...userInfo }
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    const result = await loginReq(data)
    context.commit('setToken', result)
    setTimeStamp()
  },
  async getUserInfo(context) {
    const baseResult = await getUserInfo()
    const baseInfo = getUserDetailById(baseResult.userId)
    const result = { ...baseResult, ...baseInfo }
    context.commit('setUserInfo', result)
    return result
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
