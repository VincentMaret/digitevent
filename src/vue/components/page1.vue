<template>
  <div>
    <div class="date-input-container">
      <h2>Please enter dates separated by commas:</h2>
      <input id="DateInput" type="text" />
    </div>

    <div>
      <h2>A MOMENT OF HISTORY</h2>
      <p
        v-if="dateResponse.length"
      >You entered {{ dateResponse.length + dateErrors.length }} dates...</p>
      <p
        v-if="dateErrors.length"
      >but {{ dateErrors.length }} {{ dateErrors.length == 1 ? 'was' : 'were' }} unsuccessfull.</p>
    </div>

    <ul>
      <li v-for="(item, i) in dateResponse" v-bind:key="i">
        <h2>{{ item.req }}</h2>
        <p>{{ item.res }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateResponse: [],
      dateErrors: []
    };
  },
  mounted() {
    $("#DateInput").on("keypress", this.getAllDates);
  },
  methods: {
    getAllDates(e) {
      // proceed only on 'enter' key pressed
      if (e.keyCode != 13) return;

      let dates = $("#DateInput").val();
      dates = dates.split(",");

      // fetch all requests
      Promise.all(
        dates.map(date => {
          return this.getDateInfo(date);
        })
      ).then(values => {
        // delete errors
        this.dateResponse = values.filter(result => result.res != "err");
        this.dateErrors = values.filter(result => result.res === "err");
      });
    },
    async getDateInfo(date) {
      const res = await fetch(`http://numbersapi.com/${date}/date`, {
        method: "GET"
      });
      if (res.status == 200) {
        const resTxt = await res.text();
        return { req: date, res: resTxt };
      } else {
        return { req: date, res: "err" };
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~srcAlias/less/config.less";
</style>