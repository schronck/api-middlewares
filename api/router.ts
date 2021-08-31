import { controller } from "./controller";
import { Router } from "express";
import validators from "./validators";

const createRouter = () => {
  const router: Router = Router();

  router.get("/youtube/:id", [validators.youTubeVideoId], controller.youtube);
  router.get(
    "/twitter/tweets/:tweetId",
    [validators.twitterTweetId],
    controller.twitter
  );

  return router;
};

export default createRouter;
