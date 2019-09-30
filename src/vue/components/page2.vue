<template>
  <div id="Page2">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <table>
      <tr>
        <th scope="col">DATE</th>
      </tr>
      <tr v-for="(item, i) in pastRequests" v-bind:key="i">
        <th scope="row">{{ item.req }}</th>
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
  a {
    color: black;
  }
}

td,
th {
  border: 1px solid rgb(190, 190, 190);
  padding: 10px;
}
td {
  text-align: center;
}
tr:nth-child(even) {
  background-color: #eee;
}
th {
  &[scope="col"] {
    background-color: #696969;
    color: #fff;
  }
  &[scope="row"] {
    background-color: #d7d9f2;
  }
}
table {
  border-collapse: collapse;
  border: 2px solid rgb(200, 200, 200);
  letter-spacing: 1px;
  font-family: sans-serif;
  font-size: 0.8rem;
}
</style>