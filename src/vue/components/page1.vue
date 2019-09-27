<template>
  <div>
    <div class="date-input-container">
      <h2>Please enter dates separated by commas:</h2>
      <input id="DateInput" type="text" />

      <ul>
        <li v-for="item in dateResponse">{{ item }}</li>
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
      proccesedDatesResponse: [],
      dateResponse: []
    };
  },
  mounted() {
    $("#DateInput").on("keypress", this.getAllDates);
  },
  methods: {
    getAllDates(e) {
      if (e.keyCode != 13) return;

      let dates = $("#DateInput").val();
      dates = dates.split(",");

      Promise.all(
        dates.map(date => {
          this.getDateInfo(date);
        })
      ).then(() => {
        this.dateResponse = this.proccesedDatesResponse;
        this.proccesedDatesResponse = [];
        console.log(this.dateResponse);
      });
    },
    getDateInfo: function(date) {
      const url = this.numbersUrl.replace("{{date}}", date);
      const res = fetch(url, { method: "GET" });
      res
        .then(data => data.text())
        .then(data => {
          this.proccesedDatesResponse.push(data);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~srcAlias/less/config.less";
</style>