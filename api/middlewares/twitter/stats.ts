import { MiddleWare } from "../common";
import { ethers } from "ethers";
import { aggregate } from "@makerdao/multicall";
import authAbi from "../../abis/auth_abi.json";
import counterAbi from "../../abis/counter_abi.json";
import { config } from "dotenv";
config();

const infuraKey = process.env.INFURA_API_KEY;

const provider = new ethers.providers.InfuraProvider("goerli", infuraKey);
const multicallConfig = {
  rpcUrl: `https://goerli.infura.io/v3/${infuraKey}`,
  multicallAddress: "0x5ba1e12693dc8f9c48aad8770482f4739beed696"
};
const twitterAuthAddress = "0x844383dFB922026B8637266a9369dAC64a56A678";
const base = "https://api.twitter.com";
const twitterAuth = new ethers.Contract(twitterAuthAddress, authAbi, provider);

export class TwitterStatMiddleWare extends MiddleWare {
  constructor() {
    super(process.env.TWITTER_BEARER_TOKEN, base);
  }

  async getLikersById(tweetId: string): Promise<string[]> {
    this.baseUrl = `${base}/2/tweets/${tweetId}/liking_users`;

    return JSON.parse(
      await this.makeRequest(
        JSON.stringify({
          headers: { Authorization: `Bearer ${this.apiKey}` }
        })
      )
    ).data.map((obj: any) => obj.id);
  }

  async getRetweetersById(tweetId: string): Promise<string[]> {
    this.baseUrl = `${base}/1.1/statuses/retweeters/ids.json?id=${tweetId}`;

    return JSON.parse(
      await this.makeRequest(
        JSON.stringify({
          headers: { Authorization: `Bearer ${this.apiKey}` }
        })
      )
    ).ids;
  }

  async getUserActivity(userIds: string[], tweetIds: string[]) {
    const tweetData = await Promise.all(
      Array.from(new Set(tweetIds)).map((tweetId) =>
        Promise.all([
          this.getRetweetersById(tweetId),
          this.getLikersById(tweetId)
        ]).then(([retweets, likes]) => ({ retweets, likes }))
      )
    );

    const userIdPairs = Object.fromEntries(userIds.map((id) => [id, 0]));

    tweetData.forEach(({ retweets, likes }) => {
      retweets.concat(likes).forEach((id) => {
        if (id in userIdPairs) {
          userIdPairs[id]++;
        }
      });
    });

    return userIdPairs;
  }

  async getNewLikesByContract(counterAddress: string) {
    const twitterPointCounter = new ethers.Contract(
      counterAddress,
      counterAbi,
      provider
    );
    const tweetId = await twitterPointCounter.tweetId();
    const likersFromContract = await twitterPointCounter.getLikers();
    const likersFromTwitter = await this.getLikersById(tweetId);
    const numOfAuthUsers = parseInt(await twitterAuth.numOfUsers());
    //multicall
    const requests = [];
    for (let i = 0; i < numOfAuthUsers; i++) {
      requests.push({
        target: twitterAuthAddress,
        call: ["idFromIndex(uint256)(string)", i],
        returns: [[i]]
      });
    }
    const {
      results: { transformed }
    } = await aggregate(requests, multicallConfig);
    const authUsers: string[] = Object.values(transformed);

    const newLikers = [];
    for (let i = 0; i < authUsers.length; i++) {
      if (
        !likersFromContract.includes(authUsers[i]) &&
        likersFromTwitter.includes(authUsers[i])
      ) {
        newLikers.push(authUsers[i]);
        if (newLikers.length >= 50) {
          break;
        }
      }
    }
    return newLikers;
  }

  async getResult(query: string): Promise<string> {
    return JSON.stringify({likers: await this.getNewLikesByContract(JSON.parse(query).address)});
  }
}
