<template>
  <div>
    <div class="date-input-container">
      <h2>Please enter dates separated by commas:</h2>
      <input id="DateInput" type="text" />

      <ul>
        <li v-for="(item, i) in dateResponse" v-bind:key="i">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbersUrl: "http://numbersapi.com/{{date}}/date",
      requestDates: undefined,
      dateResponse: []
    };
  },
  mounted() {
    $("#DateInput").on("keypress", this.getAllDates);
  },
  methods: {
    getAllDates(e) {
      // Launch event only on 'enter' key pressed
      if (e.keyCode != 13) return;

      let dates = $("#DateInput").val();
      dates = dates.split(",");

      Promise.all(
        dates.map(date => {
          return this.getDateInfo(date);
        })
      ).then(values => {
        this.dateResponse = values;
      });
    },
    getDateInfo: function(date) {
      const res = fetch(`http://numbersapi.com/${date}/date`, {
        method: "GET"
      });
      return res.then(data => data.text());
    }
  }
};
</script>

<style lang="less" scoped>
@import "~srcAlias/less/config.less";
</style>