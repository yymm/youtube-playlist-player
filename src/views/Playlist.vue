<template>
  <div class="playlist">
    <div v-if="playlists.items.length === 0 && loadingState.all !== 0">
      <h1 class="loading-percentage">
        {{ loading_percentage }}
        <v-icon name="percent"></v-icon>
      </h1>
      <h2 class="loading">{{ loading }}</h2>
    </div>
    <div
      v-if="playlists.items.length !== 0"
      v-for="(playlist, i) in playlists.items"
      :key="i">
      <h3 class="playlist-title">
        {{ playlist.title }}
        <!--v-icon can not attatch event because use span wrapper-->
        <span class="play" @click="onClickPlaylist(i)">
          <v-icon name="play-circle"></v-icon>
        </span>
      </h3>
      <div
        class="video-title"
        v-for="(video, j) in playlist.items"
        :key="j">
        {{ video.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Store } from "@/store";

export default Vue.extend({
  name: "playlist",
  props: {
    store: Store
  },
  data() {
    return {
      playlists: this.store.playlists,
      loadingState: this.store.playlists.loadingState,
    };
  },
  methods: {
    onClickPlaylist(i: number) {
      this.$router.push("player");
      this.store.nowplaying.setItems(this.playlists.items[i].items);
    }
  },
  computed: {
    loading_percentage(): string {
      const now = this.loadingState.now;
      const all = this.loadingState.all;
      return `${(now / all * 100).toFixed(1)}`;
    },
    loading(): string {
      return `${this.loadingState.now} / ${this.loadingState.all}`;
    }
  }
});
</script>

<style lang="less" scoped>
@import "../assets/color.less";
.playlist-title {
  width: 100%;
  color: @white;
  background: @black;
  padding: 5px 0;
  margin: 20px 0 0;
}
.video-title {
  width: 100%;
  color: @black;
  border-bottom: @black solid 1px;
  padding: 3px 0;
}
.play {
  cursor: pointer;
}
.icon-play-circle {
  width: 28px;
  color: @white;
  background: @black;
  vertical-align: bottom;
}
.icon-play-circle:hover {
  color: @red;
}
.icon-percent {
  width: 28px;
  background: #fff;
  color: #000;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
