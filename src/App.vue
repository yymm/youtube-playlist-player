<template>
  <div id="app">
    <Navi :list="navlist"/>
    <router-view :store="store"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navi from "@/components/Navi.vue";
import { Store } from "@/store";

const navlist = [
  { name: "home", path: "/" },
  { name: "playlist", path: "/playlist" },
  { name: "player", path: "/player" }
];

export default Vue.extend({
  name: "app",
  props: {
    store: {
      type: Store
    }
  },
  data() {
    return {
      navlist: navlist
    };
  },
  components: {
    Navi
  }
});
</script>

<style lang="less">
/* Global CSS Setting */
@import url("https://fonts.googleapis.com/css?family=Quantico");
#app {
  font-family: "Quantico", sans-serif;
  text-align: center;
  /*color: #2c3e50;*/
}
</style>
