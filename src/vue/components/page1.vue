<template>
  <div id="Page1">
    <nav>
      <a id="LinkToPage2" @click="goToPage2">Past results</a>
    </nav>

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
"use strict";
import card from "srcAlias/vue/components/card.vue";

export default {
  components: {
    card
  },
  data() {
    return {
      dateResponse: [],
      dateErrors: [],
      pastRequests: []
    };
  },
  mounted() {
    this.setRequestEvent();
  },
  methods: {
    //----------------------------------------
    // Manage events--------------------------
    //----------------------------------------
    setRequestEvent() {
      $("#DateInput").on("keypress", e => {
        // proceed only on 'enter' key pressed
        if (e.keyCode != 13) return;

        this.getAllDates();
      });
    },
    unsetRequestEvent() {
      $("#DateInput").off("keypress");
    },

    //----------------------------------------
    // Manage http requests-------------------
    //----------------------------------------
    async getAllDates() {
      // get dates
      let dates = $("#DateInput").val();

      // reset response arrays if no date
      if (!dates) {
        this.resetArrays();
        return;
      }

      // unset event
      this.unsetRequestEvent();

      // fetch request
      let values = await fetch(
        `https://digitevent-api.herokuapp.com/?dates=${dates}`
      );
      values = await values.json();
      values = values.data;

      // reset event
      this.setRequestEvent();

      // build responses arrays
      // value model: {req: STRING, res: STRING}
      // create an array of successfull values
      this.dateResponse = values.filter(result => result.res != "err");
      // create an array of errors
      this.dateErrors = values.filter(result => result.res === "err");
      // save successfull values
      this.pastRequests = this.pastRequests.concat(this.dateResponse);
    },
    //----------------------------------------
    //----------------------------------------
    resetArrays() {
      this.dateResponse = [];
      this.dateErrors = [];
    },
    goToPage2() {
      this.$router.push({
        name: "page2",
        params: {
          pastRequests: this.pastRequests
        }
      });
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
  background: linear-gradient(188deg, @blue 28vh, @red 28.3vh, black);
  min-height: 100vh;
}

.date-input-container {
  text-align: center;
  background: @lightBlue;
  padding-top: 50px;
  width: @mainContentWidthMedium;
  @media screen and (max-width: @bpSm) {
    width: @mainContentWidthLarge;
  }
  p {
    margin-bottom: 10px;
  }
}

#DateInput {
  background: transparent;
  border-bottom: 1px solid black;
  width: 50%;
  text-align: center;
  color: @flatBlue !important;
  font-weight: 900;
}

.user-info-message-container {
  background: linear-gradient(170deg, @lightBlue 109px, transparent 110px);
  width: 100%;
  height: 115px;
  position: relative;
  & > div {
    background: @black;
    color: @lightTxt;
    position: absolute;
    text-align: center;
    height: 90px;
    width: 50%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: @bpSm) {
      width: 80%;
      & > li {
        width: 80%;
        margin: auto;
      }
    }
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
  width: @mainContentWidthMedium;
  & > li {
    width: 50%;
    margin: auto;
  }
  @media screen and (max-width: @bpSm) {
    width: @mainContentWidthLarge;
    & > li {
      width: 80%;
    }
  }
}

nav {
  position: fixed;
  top: @spacing2;
  right: @spacing2;
  cursor: pointer;
  color: @lightTxt;
}
</style>