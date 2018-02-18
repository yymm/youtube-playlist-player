<template>
  <div class="user">
    <Navigator :list="navlist"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navigator from "@/components/Navigator.vue";

const navlist = [
  { name: "list", path: "/playlist/user/list" },
  { name: "select", path: "/playlist/user/select" }
];

export default Vue.extend({
  name: "user",
  data() {
    return {
      navlist: navlist
    };
  },
  components: {
    Navigator
  }
});
</script>

<style lang="less" scoped>

</style>
