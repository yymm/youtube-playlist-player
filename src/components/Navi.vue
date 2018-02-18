<template>
  <nav class="navi">
    <router-link
       v-for="(link, index) in list"
       :to="link.path"
       :key="index"
       >
       {{ link.name.replace(/^[a-z]/g, (v) => { return v.toUpperCase(); }) }}
     </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "navi",
  props: {
    list: Array
  }
});
</script>

<style lang="less" scoped>
@import "../assets/color.less";

.navi {
  display: flex;
}

.navi a {
  flex: 1;
  color: @black;
  background: @white;
  padding: 5px 0;
}

.navi a.router-link-exact-active {
  color: @black;
  background: @dred;
}
</style>
