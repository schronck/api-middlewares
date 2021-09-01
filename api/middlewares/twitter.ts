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
        content:
          "Here is my address: 0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9",
        likes: 541879,
        comments: 1457,
        retweets: 156,
        hashtags: ["guacamole", "salsa", "taco", "mexico"]
      },
      {
        tweetId: JSON.parse(query).tweetId,
        userId: "17486872687268799789",
        content:
          "0x58995FaD03158fB9cd64397347bA97714EF8fC12, oh boy I love beans",
        likes: 9198,
        comments: 456,
        retweets: 23,
        hashtags: ["soda", "lime", "rum", "sugar", "mojito"]
      },
      {
        tweetId: JSON.parse(query).tweetId,
        userId: "68716971191779892146",
        content:
          "This -> 0x4958806608D2E3Aa22BD8818B555A0a24fe6c38E is an address",
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
