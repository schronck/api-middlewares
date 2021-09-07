import { MiddleWare } from "./common";

export class TwitterMiddleWare extends MiddleWare {
  constructor() {
    super(
      process.env.TWITTER_BEARER_TOKEN,
      "https://api.twitter.com/2/tweets"
    );
  }

  async getResult(query: string): Promise<string> {
    const tweetId = JSON.parse(query).tweetId;

    const res = await this.makeRequest(
      JSON.stringify({
        ids: tweetId,
        expansions: "attachments.media_keys",
        "tweet.fields":
          "created_at,author_id,lang,source,public_metrics,context_annotations,entities",
        headers: { Authorization: `Bearer ${this.apiKey}` }
      })
    );

    const _tweetObj = JSON.parse(res).data[0];

    const tweetObj = {
      tweetId,
      userId: _tweetObj.author_id,
      text: _tweetObj.text,
      auth: [] as Array<string>,
      likes: 541879,
      comments: 1457,
      retweets: 156,
      hashtags: ["guacamole", "salsa", "taco", "mexico"]
    };

    tweetObj.auth = [
      tweetObj.userId,
      tweetObj.text.match(/0x[a-zA-Z0-9]{40}/)![0].toLowerCase()
    ];

    console.log(tweetObj);

    const stringRes = JSON.stringify(tweetObj);

    return stringRes;
  }
}
