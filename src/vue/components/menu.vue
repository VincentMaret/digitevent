<template>
  <div id="Menu">
    <router-link to="/">Home</router-link>
    <router-link to="/page2">Past results</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~srcAlias/less/config.less";
#Menu {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>