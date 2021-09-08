import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { TwitterTweetMiddleWare } from "./middlewares/twitter/tweet";
import { TwitterStatMiddleWare } from "./middlewares/twitter/stats";
import logger from "./utils/logger";
import { YouTubeMiddleWare } from "./middlewares/youtube";

export const controller = {
  youtube: async (req: Request, res: Response): Promise<void> => {
    try {
      logger.verbose(
        `request: youtube, params: ${JSON.stringify(req.params)}`
      );

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const result = await new YouTubeMiddleWare().getResult(
        JSON.stringify(req.params)
      );

      logger.verbose(`result: ${result}`);

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.status(200).json(JSON.parse(result));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  twitterStats: async (req: Request, res: Response): Promise<void> => {
    try {
      logger.verbose(
        `request: twitter, params: ${JSON.stringify(req.params)}`
      );

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const result = await new TwitterStatMiddleWare().getResult(
        JSON.stringify(req.params)
      );

      logger.verbose(`result: ${result}`);

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.status(200).json(JSON.parse(result));
    } catch (e) {
      res.status(400).json(e);
    }
  },
  tweets: async (req: Request, res: Response): Promise<void> => {
    try {
      logger.verbose(
        `request: twitter, params: ${JSON.stringify(req.params)}`
      );

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const result = await new TwitterTweetMiddleWare().getResult(
        JSON.stringify(req.params)
      );

      logger.verbose(`result: ${result}`);

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });
      res.status(200).json(JSON.parse(result));
    } catch (e) {
      res.status(400).json(e);
    }
  }
};
