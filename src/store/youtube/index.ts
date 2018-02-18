export class YoutubePlaylist {
  id: string;
  title: string;
  thumbnailUrl: string;
  items: Array<YoutubePlaylistItem>;

  constructor(id: string, title: string, thumbnailUrl: string) {
    this.id = id;
    this.title = title;
    this.thumbnailUrl = thumbnailUrl;
    this.items = [];
  }
}

export class YoutubePlaylistItem {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;

  constructor(
    videoId: string,
    title: string,
    description: string,
    thumbnailUrl: string
  ) {
    this.videoId = videoId;
    this.title = title;
    this.description = description;
    this.thumbnailUrl = thumbnailUrl;
  }
}
