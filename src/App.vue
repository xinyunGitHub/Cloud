<template>
  <Header>
    <router-view />
  </Header>
</template>

<script>
import Header from "./components/Header.vue"
export default {
  name: "App",
  components: {
    Header
  }
}
</script>

<style>
html, body {
  height: 100%;
  min-height: 100vh;
}
* {
  margin: 0;
  padding: 0;
  border: 0px;
  outline: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
html, body {
  background-color: #ffffff;
}
input, textarea {
  padding: 0;
  margin: 0;
  -webkit-user-select: auto;
  -webkit-appearance: none;
}
img{
  display: block;
}
a, u{
  text-decoration: none;
}
b, em, i{
  font-weight: normal;
  font-style: normal;
}
ul li{
  list-style-type: none;
}
div, span, img {
  cursor: pointer;
}
</style>
