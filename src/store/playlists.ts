import axios, { AxiosResponse } from "axios";
import { YoutubePlaylist } from "./youtube";
import { YoutubeRequest } from "./youtube/request";

interface PlaylistsState {
  items: Array<YoutubePlaylist>;
  loadingState: { all: number; now: number };
  userSelectList: Array<Array<boolean>>;
  isExpands: Array<boolean>;
}

export default class Playlists {
  state: PlaylistsState = {
    items: [],
    loadingState: {
      all: 0,
      now: 0
    },
    userSelectList: [],
    isExpands: []
  };

  request: YoutubeRequest = new YoutubeRequest();

  get items(): Array<YoutubePlaylist> {
    return this.state.items;
  }

  get loadingState(): { all: number; now: number } {
    return this.state.loadingState;
  }

  get userSelectList(): Array<Array<boolean>> {
    return this.state.userSelectList;
  }

  get isExpands(): Array<boolean> {
    return this.state.isExpands;
  }

  // mutation(initialize)
  setItems(items: Array<YoutubePlaylist>) {
    this.state.items = items;
  }

  setUserSelectItems(items: Array<YoutubePlaylist>) {
    let len = items.length;
    let a = new Array(len);
    for (let i = 0; i < len; i++) {
      a[i] = new Array(items[i].items.length).fill(false);
    }
    this.state.userSelectList = a;
  }

  setIsExpand(items: Array<YoutubePlaylist>) {
    let len = items.length;
    this.state.isExpands = new Array(len).fill(false);
  }

  // mutation(initialize)
  initializeState() {
    this.state.items = [];
    this.state.userSelectList = [];
    this.state.loadingState.all = 0;
    this.state.loadingState.now = 0;
  }

  // mutation

  // async action
  async fetchByUsername(username: string) {
    this.initializeState();
    const playlists = await this.request.getPlaylistByUsername(
      username,
      this.state.loadingState
    );
    //console.log(playlists);
    this.setItems(playlists);
    this.setUserSelectItems(playlists);
    this.setIsExpand(playlists);
  }

  // async action
  async fetchByChannelId(channelId: string) {
    this.initializeState();
    const playlists = await this.request.getPlaylistByChannelId(
      channelId,
      this.state.loadingState
    );
    this.setItems(playlists);
    this.setUserSelectItems(playlists);
    this.setIsExpand(playlists);
  }
}
