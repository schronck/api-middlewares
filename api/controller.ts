import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { YouTubeMiddleWare } from "./middlewares/youtube";

export const controller = {
  youtube: async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const result = await new YouTubeMiddleWare().getResult(
        JSON.stringify(req.params)
      );

      res.status(200).json(JSON.parse(result));
    } catch (e) {
      res.status(400).json(e);
    }
  }
};
