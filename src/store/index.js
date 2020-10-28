import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: false, // 登录状态
    asideActive: '/', // 高亮页面
    asideRouter: [],  // 左侧导航数据
  },
  getters: {
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getAsideActive(state) {
      return state.asideActive;
    },
    getAsideRouter(state) {
      return state.asideRouter;
    }
  },
  mutations: {
    setLoginStatus(state, loginStatus) {
      state.loginStatus = loginStatus;
    },
    setAsideActive(state, asideActive) {
      state.asideActive = asideActive;
    },
    setAsideRouter(state, asideRouter) {
      state.asideRouter = asideRouter;
    }
  },
  actions: {
  },
  modules: {
  }
})
