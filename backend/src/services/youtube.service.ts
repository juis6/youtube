import { IYouTubeVideo } from "../types/interfaces";

export class YouTubeService {
  private readonly apiKey: string;
  private readonly baseUrl = "https://www.googleapis.com/youtube/v3";

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY!;
    if (!this.apiKey) {
      throw new Error(
        "YOUTUBE_API_KEY is not defined in environment variables"
      );
    }
  }

  public async search(
    query: string,
    maxResults: number = 10
  ): Promise<IYouTubeVideo[]> {
    const url = `${this.baseUrl}/search?part=snippet&q=${encodeURIComponent(
      query
    )}&maxResults=${maxResults}&type=video&key=${this.apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();

    const videoIds = data.items.map((item: any) => item.id.videoId).join(",");
    const videos = await this.getVideoDetails(videoIds);

    return videos;
  }

  public async getVideoDetails(videoIds: string): Promise<IYouTubeVideo[]> {
    const url = `${this.baseUrl}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${this.apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.items.map((item: any) => this.formatVideo(item));
  }

  private formatVideo(item: any): IYouTubeVideo {
    return {
      videoId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      duration: item.contentDetails?.duration,
      viewCount: item.statistics?.viewCount,
      likeCount: item.statistics?.likeCount,
      commentCount: item.statistics?.commentCount,
    };
  }
}
