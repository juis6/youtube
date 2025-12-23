import { Request, Response } from "express";
import { VideoService } from "../services/video.service";
import { IApiResponse } from "../types/interfaces";

export class VideoController {
  private readonly videoService: VideoService;

  constructor() {
    this.videoService = new VideoService();
  }

  public search = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: "User not authenticated",
        } as IApiResponse);
        return;
      }

      const { query, maxResults } = req.query;

      if (!query || typeof query !== "string") {
        res.status(400).json({
          success: false,
          error: "Search query is required",
        } as IApiResponse);
        return;
      }

      const max = maxResults ? parseInt(maxResults as string, 10) : undefined;

      const videos = await this.videoService.searchVideos(userId, query, max);

      res.status(200).json({
        success: true,
        data: { videos },
      } as IApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to search videos",
      } as IApiResponse);
    }
  };

  public getDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: "User not authenticated",
        } as IApiResponse);
        return;
      }

      const { videoId } = req.params;

      if (!videoId) {
        res.status(400).json({
          success: false,
          error: "Video ID is required",
        } as IApiResponse);
        return;
      }

      const video = await this.videoService.getVideoDetails(userId, videoId);

      res.status(200).json({
        success: true,
        data: { video },
      } as IApiResponse);
    } catch (error) {
      res.status(500).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get video details",
      } as IApiResponse);
    }
  };
}
