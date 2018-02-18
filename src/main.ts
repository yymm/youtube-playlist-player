import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "./store";
import VueYoutube from "vue-youtube";
import feature from "vue-icon";

Vue.config.productionTip = false;

Vue.use(VueYoutube);
Vue.use(feature, "v-icon");

new Vue({
  router,
  render: h => h(App, {
    props: { store }
  })
}).$mount("#app");
