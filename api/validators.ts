import { param } from "express-validator";

export default {
  youTubeVideoId: param("id").isString().trim().isLength({ min: 11, max: 11 }),
  twitterTweetId: param("tweetId")
    .isString()
    .trim()
    .isLength({ min: 0, max: 20 })
};
