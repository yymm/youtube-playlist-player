import axios, { AxiosResponse } from "axios";
import { YoutubePlaylist } from "./youtube";
import { YoutubeRequest } from "./youtube/request";

interface PlaylistsState {
  items: Array<YoutubePlaylist>;
  loadingState: { all: number; now: number };
}

export default class Playlists {
  state: PlaylistsState = {
    items: [],
    loadingState: {
      all: 0,
      now: 0
    }
  };

  request: YoutubeRequest = new YoutubeRequest();

  get items(): Array<YoutubePlaylist> {
    return this.state.items;
  }

  get loadingState(): { all: number; now: number } {
    return this.state.loadingState;
  }

  // mutation
  commitItems(items: Array<YoutubePlaylist>) {
    this.state.items = items;
  }

  initializeState() {
    this.state.items = [];
    this.state.loadingState.all = 0;
    this.state.loadingState.now = 0;
  }

  // async action
  async fetchByUsername(username: string) {
    this.initializeState();
    const playlists = await this.request.getPlaylistByUsername(
      username,
      this.state.loadingState
    );
    //console.log(playlists);
    this.commitItems(playlists);
  }

  // async action
  async fetchByChannelId(channelId: string) {
    this.initializeState();
    const playlists = await this.request.getPlaylistByChannelId(
      channelId,
      this.state.loadingState
    );
    this.commitItems(playlists);
  }
}
