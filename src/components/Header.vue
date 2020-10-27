<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style>