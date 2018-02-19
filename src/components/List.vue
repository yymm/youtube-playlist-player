<template>
  <div class="list">
    <div class="control">
      <div @click="clearCheck">
        <v-icon name="x-square"></v-icon>
        Clear Check
      </div>
      <div @click="playCheck">
        <v-icon name="play-circle"></v-icon>
        Play Check
      </div>
    </div>
    <div
      v-for="(playlist, i) in playlists"
      :key="i">
      <h3 class="playlist-title">
        <span @click="toggleExpand(i)">
          <v-icon v-if="!isExpands[i]" name="chevrons-down"></v-icon>
          <v-icon v-else name="chevrons-up"></v-icon>
        </span>
        {{ playlist.title }}
        <!--v-icon can not attatch event because use span wrapper-->
        <span class="play" @click="onClickPlaylist(i)">
          <v-icon name="play-circle"></v-icon> </span>
      </h3>
      <div
        v-if="!isExpands[i]"
        class="video-title"
        v-for="(video, j) in playlist.items"
        @click="addUserSelectList(i, j)"
        :key="j">
        {{ video.title }}
        <v-icon v-if="userSelectList.length !== 0 && userSelectList[i][j]" name="check-circle"></v-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* Deep Dependency Store & Router */
import Vue from "vue";
import { Store } from "@/store";

export default Vue.extend({
  name: "list",
  props: {
    store: Store
  },
  data() {
    return {
      playlists: this.store.playlists.items,
      isExpands: this.store.playlists.isExpands,
      userSelectList: this.store.playlists.userSelectList
    };
  },
  methods: {
    onClickPlaylist(i: number) {
      this.$router.push("player");
      this.store.nowplaying.setItems(this.playlists[i].items);
    },
    toggleExpand(i: number) {
      this.isExpands[i] = !this.isExpands[i];
      this.isExpands = [...this.isExpands];
    },
    addUserSelectList(i: number, j: number) {
      this.userSelectList[i][j] = !this.userSelectList[i][j];
      this.userSelectList = [...this.userSelectList];
    },
    clearCheck() {
      for (let i = 0; i < this.userSelectList.length; i++) {
        for (let j = 0; j < this.userSelectList[i].length; j++) {
          this.userSelectList[i][j] = false;
        }
      }
      this.userSelectList = [...this.userSelectList];
    },
    playCheck() {
      this.$router.push("player");
      let nowplaying = [];
      for (let i = 0; i < this.userSelectList.length; i++) {
        for (let j = 0; j < this.userSelectList[i].length; j++) {
          if (this.userSelectList[i][j]) {
            nowplaying.push(this.playlists[i].items[j]);
          }
        }
      }
      this.store.nowplaying.setItems(nowplaying);
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
  .icon-play-circle:hover {
    color: @red;
  }
}
.video-title {
  width: 100%;
  color: @black;
  border-bottom: @black solid 1px;
  padding: 3px 0;
  cursor: pointer;
  .icon-check-circle {
    width: 20px;
    color: @green;
    vertical-align: middle;
  }
}
.icon {
  width: 28px;
  vertical-align: bottom;
  cursor: pointer;
}
.control {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .icon-x-square,
  .icon-play-circle {
    width: 20px;
    vertical-align: middle;
  }
}
.control > div {
  width: 180px;
  border: 2px solid @green;
  border-radius: 20px;
  margin: 10px;
  padding: 2px;
  cursor: pointer;
  color: @green;
}
.control > div:hover {
  background: @black;
}
</style>
