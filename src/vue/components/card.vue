<template>
  <li class="card">
    <div>
      <h3>{{title}}</h3>
      <p>{{content}}</p>
    </div>
  </li>
</template>

<script>
"use strict";

export default {
  data() {
    return {};
  },
  props: ["title", "content"],
  methods: {}
};
</script>

<style lang="less" scoped>
@import "~srcAlias/less/config.less";

.card {
  background: white;
  border-radius: 5px;
  margin-top: @spacing4;
  & > div {
    padding: @spacing3 @spacing5;
  }

  h3 {
    margin-bottom: @spacing;
    font-size: 1rem;
  }
}
</style>