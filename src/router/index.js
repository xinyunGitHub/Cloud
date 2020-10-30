import Vue from 'vue'
import store from './../store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { getItem } from "./../assets/js/appUtils.js"
import { initialize } from "./../assets/js/appBuild.js"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    aside: true,
    title: '数据管理',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    aside: false,
    title: '登录',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    aside: true,
    title: '管理员管理',
    component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue')
  },
  {
    path: '/user',
    name: 'User',
    aside: true,
    title: '注册用户管理',
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue')
  },
  {
    path: '/goods',
    name: 'Goods',
    aside: true,
    title: '商品列表管理',
    component: () => import(/* webpackChunkName: "Goods" */ '../views/Goods.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    aside: true,
    title: '商品详情管理',
    component: () => import(/* webpackChunkName: "Detail" */ '../views/Detail.vue')
  },
  {
    path: '/memory',
    name: 'Memory',
    aside: true,
    title: '商品SKU管理',
    component: () => import(/* webpackChunkName: "Memory" */ '../views/Memory.vue')
  },
  {
    path: '/order',
    name: 'Order',
    aside: true,
    title: '用户订单管理',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Order.vue')
  },
  {
    path: '/address',
    name: 'Address',
    aside: true,
    title: '用户地址管理',
    component: () => import(/* webpackChunkName: "Address" */ '../views/Address.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const account = getItem("account");
  const token = getItem("token");
  const expired = getItem("expired");
  // 验证是否合法
  initialize(account, token, expired).then(() => {
    const login = store.getters.getLoginStatus;
    // 更新当前路由信息
    const aside = routes.filter(item => item.aside);
    const active = routes.filter(item => item.path == to.path);
    store.commit("setAsideRouter", aside);
    store.commit("setActiveTitle", active[0].title);
    store.commit("setActivePath", active[0].path);

    if (login) { /* @@ 已登陆 */
      if (to.name == "Login") {
        next({
          name: 'Home'
        });
      } else {
        next();
      }
    } else { /* @@ 未登陆 */
      if (to.name == "Login") {
        next();
      } else {
        next({
          name: "Login"
        });
      }
    }
  }).catch(() => {
    if (to.name == "Login") {
      next();
    } else {
      next({
        name: "Login"
      });
    }
  })
})

export default router
