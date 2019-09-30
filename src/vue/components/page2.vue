<template>
  <div id="Page2">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <table>
      <tr>
        <th>Past Results</th>
      </tr>
      <tr v-for="(item, i) in pastRequests" v-bind:key="i">
        <th>{{ item.req }}</th>
        <td>{{ item.res }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["pastRequests"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.$router);
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "~srcAlias/less/config.less";

nav {
  position: fixed;
  top: @spacing2;
  right: @spacing2;
  cursor: pointer;
}
</style>