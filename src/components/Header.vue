<template>
  <div class="header">
    <template v-if="$store.getters.getLoginStatus">
      <el-container>
        <!--【顶部】-->
        <el-header>
          <el-row :gutter="20">
            <el-col :span="4">
              <h3>Cloud 后台管理系统</h3>
            </el-col>
            <el-col :span="3" :offset="16">
              <div class="cloud-avatar" @click="signOut">
                <el-avatar :size="34" :src="circleUrl"></el-avatar>
                <span>登出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <!--【左侧】-->
          <el-aside width="200px">
            <el-menu
              default-active="/"
              :router="true"
              class="cloud-aside"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <template v-for="(item, index) in $store.getters.getAsideRouter">
                <el-menu-item :index="item.path" :key="index">
                  <i class="el-icon-document"></i>
                  <span slot="title">{{ item.title }}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </el-aside>
          <el-main>
            <!--【导航】-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>Cloud</el-breadcrumb-item>
              <el-breadcrumb-item>{{ $store.getters.getAsideActive }}</el-breadcrumb-item>
            </el-breadcrumb>
            <!--【内容】-->
            <slot></slot>
          </el-main>
        </el-container>
      </el-container>
    </template>
    <template v-else>
      <!--【内容】-->
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { delItem } from "./../assets/js/appUtils.js"
export default {
  name: "Header",
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  methods: {
    signOut() {
      delItem('account');
      delItem('token');
      delItem('expired');
      this.$store.commit("setLoginStatus", false);
      this.$message({
        message: '退出登录成功～',
        type: 'success'
      });
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  .cloud-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    > span {
      &:last-child {
        margin: 0 0 0 8px;
      }
    }
  }
  .cloud-aside {
    border: none;
  }
  .el-header, .el-footer {
    background-color: #2e3033;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #444a50;
    color: #ffff;
    text-align: left;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>