<template>
  <div class="player">
    <youtube
      style="width: 100%; max-width: 640px;"
      ref="youtube">
    </youtube>
    <br/>
    <span @click="toggleLoop">
      <v-icon
        :class="{ enable: loop, disable: !loop }"
        name="repeat">
      </v-icon>
    </span>
    <span @click="toggleShuffle">
      <v-icon
        :class="{ enable: shuffle, disable: !shuffle }"
        name="shuffle">
      </v-icon>
    </span>
  </div>
</template>

<script>
/* not TypeScript oooops... */
import Vue from "vue";

export default Vue.extend({
  name: "player",
  props: ["store"],
  data() {
    return {
      items: [], // Array<YoutubePlaylistItem>
      playingItem: "",
      loop: false,
      shuffle: false
    };
  },
  mounted() {
    this.items = this.store.nowplaying.items;
    const items = this.items.map(v => {
      return v.videoId;
    });
    this.player.cuePlaylist(items);
    this.player.setVolume(5);
  },
  methods: {
    toggleLoop() {
      this.loop = !this.loop;
      this.player.setLoop(this.loop);
    },
    toggleShuffle() {
      this.shuffle = !this.shuffle;
      this.player.setShuffle(this.shuffle);
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  }
});
</script>

<style lang="less" scoped>
.icon {
  width: 24px;
}
.disable {
  color: #ccc;
}
.enable {
  color: #222;
}
</style>
