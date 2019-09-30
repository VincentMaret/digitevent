<template>
  <div>
    <navigation></navigation>
    <!-- <page1></page1> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "srcAlias/vue/components/menu.vue";
import Page1 from "srcAlias/vue/components/page1.vue";

export default {
  components: {
    Navigation,
    Page1
  }
};
</script>

<style lang="less" scoped>
@import "~srcAlias/less/config.less";
</style>