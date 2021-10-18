const getters = {
  device: state => state.app.device,
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  routes: state => state.permission.routes
}
export default getters
