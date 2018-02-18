import Playlists from "./playlists";
import NowPlaying from "./nowplaying";

export class Store {
  public playlists: Playlists = new Playlists();
  public nowplaying: NowPlaying = new NowPlaying();
}

export default new Store();
