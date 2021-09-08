import { MiddleWare } from "../common";
import { ethers } from "ethers";

export class TwitterStatMiddleWare extends MiddleWare {
  constructor() {
    super(
      process.env.TWITTER_BEARER_TOKEN,
      "https://api.twitter.com/2/tweets"
    );
  }

  async getResult(query: string): Promise<string> {
    const _addresses = "0x" + JSON.parse(query).address;

    const stats = Array();

    for (let i = 0; i < 50; ++i) {
      stats.push(
        Math.floor(Math.random() * 10000000000000000000 + 18446744073709551615)
      ); // userId
      stats.push(Math.floor(Math.random() * 4 + 0)); // points
    }

    return JSON.stringify(stats);
  }
}
