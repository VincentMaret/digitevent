<template>
  <div id="Page1">
    <div>
      <div class="date-input-container">
        <p>Please enter dates separated by commas:</p>
        <input id="DateInput" type="text" />
      </div>

      <div class="user-info-message-container">
        <div v-if="dateResponse.length || dateErrors.length">
          <h2>A MOMENT OF HISTORY</h2>
          <p>You entered {{ dateResponse.length + dateErrors.length }} dates...</p>
          <p
            v-if="dateErrors.length"
          >but {{ dateErrors.length }} {{ dateErrors.length == 1 ? 'was' : 'were' }} unsuccessfull.</p>
        </div>
      </div>
    </div>

    <ul>
      <!-- card root element is li -->
      <card
        v-for="(item, i) in dateResponse"
        v-bind:key="i"
        v-bind:title="item.req"
        v-bind:content="item.res"
      ></card>
    </ul>
  </div>
</template>

<script>
import card from "srcAlias/vue/components/card.vue";

export default {
  components: {
    card
  },
  data() {
    return {
      dateResponse: [],
      dateErrors: []
    };
  },
  mounted() {
    $("#DateInput").on("keypress", e => {
      // proceed only on 'enter' key pressed
      if (e.keyCode != 13) return;

      this.getAllDates();
    });
  },
  methods: {
    async getAllDates() {
      let dates = $("#DateInput").val();
      dates = dates.split(",");
      dates = dates.map(x => x.trim());

      // fetch all requests
      const values = await Promise.all(
        dates.map(date => {
          return this.getDateInfo(date);
        })
      );
      // build responses arrays
      // value model: {req: STRING, res: STRING}
      // create an array of successful values
      this.dateResponse = values.filter(result => result.res != "err");
      // create an array of errors
      this.dateErrors = values.filter(result => result.res === "err");
    },
    async getDateInfo(date) {
      const res = await fetch(`http://numbersapi.com/${date}/date`);
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

#Page1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-input-container {
  text-align: center;
  background: @lightBlue;
  padding-top: 50px;
  width: 40vw;
  p {
    margin-bottom: 10px;
  }
}

#DateInput {
  background: transparent;
  border-bottom: 1px solid black;
  width: 50%;
  text-align: center;
  color: @flatBlue;
  font-weight: 900;
}

.user-info-message-container {
  background: linear-gradient(170deg, @lightBlue 56%, transparent 56.5%);
  width: 100%;
  height: 115px;
  position: relative;
  & > div {
    background: @black;
    color: @lightTxt;
    position: absolute;
    text-align: center;
    padding: 30px 0;
    width: 50%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    h2 {
      font-size: 1rem;
      font-weight: 500;
    }
    p {
      font-weight: 900;
    }
  }
}

ul {
  width: 40vw;
  & > li {
    width: 50%;
    margin: auto;
  }
}
</style>