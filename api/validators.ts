import { param } from "express-validator";

export default {
  youTubeVideoId: param("id").isString().trim().isLength({ min: 11, max: 11 }),
  tweetId: param("tweetId").isString().trim().isLength({ min: 0, max: 20 }),
  ethAddress: param("address").isString().trim().isLength({ min: 42, max: 42 })
};
