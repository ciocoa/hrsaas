import { loginReq } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// 状态
const state = {
  token: getToken()
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
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    const result = await loginReq(data)
    context.commit('setToken', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
