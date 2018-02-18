import { YoutubePlaylistItem } from "./youtube";

interface NowPlayingState {
  items: Array<YoutubePlaylistItem>;
}

export default class NowPlaying {
  state: NowPlayingState = {
    items: []
  };

  get items(): Array<YoutubePlaylistItem> {
    return this.state.items;
  }

  setItems(items: Array<YoutubePlaylistItem>) {
    this.state.items = items;
  }
}
