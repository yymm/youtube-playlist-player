import axios, { AxiosRequestConfig } from "axios";
import { YoutubePlaylist, YoutubePlaylistItem } from "./index";

export class YoutubeRequest {
  private key: string = "AIzaSyAMo9pXJfO4aClAGbN0rOuO7QBvB435hdA";

  async getPlaylistByUsername(
    username: string,
    loadingState: { all: number; now: number }
  ): Promise<Array<YoutubePlaylist>> {
    let res = await axios(this.channels_config(username));
    //console.log(res.data);
    const channelId = res.data.items[0].id;
    return this.getPlaylistByChannelId(channelId, loadingState);
  }

  async getPlaylistByChannelId(
    channelId: string,
    loadingState: { all: number; now: number }
  ): Promise<Array<YoutubePlaylist>> {
    let res = await axios(this.playlists_config(channelId));
    //console.log(res.data);
    let playlists: Array<YoutubePlaylist> = res.data.items.map((v: any) => {
      return new YoutubePlaylist(
        v.id,
        v.snippet.title,
        v.snippet.thumbnails.default.url
      );
    });
    loadingState.all = playlists.length;
    for (let playlist of playlists) {
      let res = await axios(this.playlistItems_config(playlist.id));
      let filtered_items = res.data.items.filter((v: any) => {
        return v.snippet.title !== "Deleted video";
      });
      playlist.items = filtered_items.map((v: any) => {
        //console.log(v);
        return new YoutubePlaylistItem(
          v.snippet.resourceId.videoId,
          v.snippet.title,
          v.snippet.description,
          v.snippet.thumbnails.default.url
        );
      });
      //console.log(res.data);
      loadingState.now++;
    }
    return playlists;
  }

  private channels_config(username: string): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      url: "https://www.googleapis.com/youtube/v3/channels",
      params: {
        part: "id",
        key: this.key,
        forUsername: username
      }
    };
    return config;
  }
  private playlists_config(channelId: string): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      url: "https://www.googleapis.com/youtube/v3/playlists",
      params: {
        part: "snippet",
        key: this.key,
        channelId: channelId,
        maxResults: 50
      }
    };
    return config;
  }
  private playlistItems_config(playlistId: string): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      url: "https://www.googleapis.com/youtube/v3/playlistItems",
      params: {
        part: "snippet",
        key: this.key,
        playlistId: playlistId,
        maxResults: 50
      }
    };
    return config;
  }
}
