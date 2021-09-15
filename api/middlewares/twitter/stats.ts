import { MiddleWare } from "../common";

export class TwitterStatMiddleWare extends MiddleWare {
  constructor() {
    super(
      process.env.TWITTER_BEARER_TOKEN,
      "https://api.twitter.com/2/tweets"
    );
  }

  async getResult(query: string): Promise<string> {
    const tweetId = JSON.parse(query).tweetId;

    this.baseUrl += `/${tweetId}/liking_users`;

    const res = await this.makeRequest(
      JSON.stringify({
        headers: { Authorization: `Bearer ${this.apiKey}` }
      })
    );

    const _tweetObj = JSON.parse(res).data;

    console.log(_tweetObj);
    return JSON.stringify(_tweetObj.map((obj: any) => obj.id));
  }
}
