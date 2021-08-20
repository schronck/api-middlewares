import { MiddleWare } from "./common";
import logger from "../utils/logger";

export class YouTubeMiddleWare extends MiddleWare {
  constructor() {
    super(
      process.env.YOUTUBE_API_KEY,
      "https://youtube.googleapis.com/youtube/v3/videos"
    );
  }

  async getResult(query: string): Promise<string> {
    const res = await this.makeRequest(
      JSON.stringify({
        key: this.apiKey,
        part: "snippet,statistics",
        id: JSON.parse(query).id
      })
    );

    const video = JSON.parse(res).items[0];

    // prettier-ignore
    const videoObj = {
      title   : video.snippet.title,
      views   : video.statistics.viewCount,
      likes   : video.statistics.likeCount,
      dislikes: video.statistics.dislikeCount,
      comments: video.statistics.commentCount,
    };

    const stringRes = JSON.stringify(videoObj);

    logger.verbose(`Response:\n${stringRes}`);

    return stringRes;
  }
}
