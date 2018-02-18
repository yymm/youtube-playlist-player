import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Playlist from "./views/Playlist.vue";
import Player from "./views/Player.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/playlist",
      name: "playlist",
      component: Playlist
    },
    {
      path: "/player",
      name: "player",
      component: Player
    }
  ]
});
