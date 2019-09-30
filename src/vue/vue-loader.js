import Vue from 'vue';
import VueRouter from 'vue-router'

import App from 'srcAlias/vue/app.vue';
import Page1 from 'srcAlias/vue/components/page1.vue';
import Page2 from 'srcAlias/vue/components/page2.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Page1 },
  { path: '/page2', component: Page2 }
];

const router = new VueRouter({
  routes
})

new Vue({
  el: '#App',
  components: { App },
  template: '<App/>',
  router
});