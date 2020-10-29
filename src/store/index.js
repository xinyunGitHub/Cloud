import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: false, // 登录状态
    activeTitle: '数据管理', // 高亮页面
    activePath: '/', // 高亮页面
    asideRouter: [],  // 左侧导航数据
  },
  getters: {
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getActiveTitle(state) {
      return state.activeTitle;
    },
    getActivePath(state) {
      return state.activePath;
    },
    getAsideRouter(state) {
      return state.asideRouter;
    }
  },
  mutations: {
    setLoginStatus(state, loginStatus) {
      state.loginStatus = loginStatus;
    },
    setActiveTitle(state, activeTitle) {
      state.activeTitle = activeTitle;
    },
    setActivePath(state, activePath) {
      state.activePath = activePath;
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
