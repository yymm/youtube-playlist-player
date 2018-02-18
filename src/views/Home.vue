<template>
  <div class="home">
    <h2>Username</h2>
    <input v-model="username"/>
    <button @click.once="onClickUsername">Go</button>
    <h2>Channnel ID</h2>
    <input v-model="channelId"/>
    <button @click.once="onClickChannelId">Go</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Store } from "@/store";
import { AxiosError } from "axios";

export default Vue.extend({
  name: "home",
  props: {
    store: {
      type: Store
    }
  },
  data() {
    return {
      username: "AnimeSongCollabo",
      channelId: ""
    };
  },
  methods: {
    onClickUsername() {
      this.$router.push("playlist");
      this.store.playlists
        .fetchByUsername(this.username)
        .catch((e: AxiosError) => {
          //console.log(e.message);
          alert(e.message);
        });
    },
    onClickChannelId() {
      this.$router.push("playlist");
      this.store.playlists
        .fetchByChannelId(this.channelId)
        .catch((e: AxiosError) => {
          //console.log(e.message);
          alert(e.message);
        });
    }
  }
});
</script>

<style lang="less" scoped>

</style>
