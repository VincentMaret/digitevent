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
        // delete errors
        this.dateResponse = values.filter(result => result != "err");
      });
    },
    async getDateInfo(date) {
      const res = await fetch(`http://numbersapi.com/${date}/date`, {
        method: "GET"
      });
      if (res.status == 200) {
        return res.text();
      } else {
        return "err";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~srcAlias/less/config.less";
</style>