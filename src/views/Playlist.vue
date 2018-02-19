<template>
  <div class="playlist">
    <div v-if="playlists.items.length === 0 && loadingState.all !== 0">
      <h1 class="loading-percentage">
        {{ loading_percentage }}
        <v-icon name="percent"></v-icon>
      </h1>
      <h2 class="loading">{{ loading }}</h2>
    </div>
    <List
      v-if="playlists.items.length !== 0"
      :store="store"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Store } from "@/store";
import List from "@/components/List.vue";

export default Vue.extend({
  name: "playlist",
  props: {
    store: Store
  },
  data() {
    return {
      playlists: this.store.playlists,
      loadingState: this.store.playlists.loadingState
    };
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
  },
  components: {
    List
  }
});
</script>

<style lang="less" scoped>
@import "../assets/color.less";
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
