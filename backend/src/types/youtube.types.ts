// YouTube API Response Types

export interface YouTubeSearchResponse {
  kind?: string;
  etag?: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
  items?: YouTubeSearchItem[];
}

export interface YouTubeSearchItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet?: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    channelTitle: string;
  };
}

export interface YouTubeVideosResponse {
  kind?: string;
  etag?: string;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
  items?: YouTubeVideoItem[];
}

export interface YouTubeVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    channelTitle: string;
    tags?: string[];
    categoryId?: string;
    liveBroadcastContent?: string;
    localized?: {
      title: string;
      description: string;
    };
  };
  contentDetails?: {
    duration: string;
    dimension?: string;
    definition?: string;
    caption?: string;
    licensedContent?: boolean;
    projection?: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    favoriteCount?: string;
    commentCount: string;
  };
}

export interface YouTubeThumbnails {
  default?: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

export interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}
