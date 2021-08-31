import { MiddleWare } from "./common";

export class TwitterMiddleWare extends MiddleWare {
  constructor() {
    super(process.env.TWITTER_API_KEY, "https://api.twitter.com");
  }

  async getResult(query: string): Promise<string> {
    const tweetObj = [
      {
        tweetId: JSON.parse(query).tweetId,
        userId: "10765432100123456789",
        likes: 541879,
        comments: 1457,
        retweets: 156,
        hashtags: ["guacamole", "salsa", "taco", "mexico"]
      },
      {
        tweetId: JSON.parse(query).tweetId,
        userId: "17486872687268799789",
        likes: 9198,
        comments: 456,
        retweets: 23,
        hashtags: ["soda", "lime", "rum", "sugar", "mojito"]
      },
      {
        tweetId: JSON.parse(query).tweetId,
        userId: "68716971191779892146",
        likes: 15,
        comments: 2,
        retweets: 0,
        hashtags: ["onlyOneHashTag"]
      }
    ][JSON.parse(query).tweetId];

    const stringRes = JSON.stringify(tweetObj);

    return stringRes;
  }
}
