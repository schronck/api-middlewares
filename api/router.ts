import { controller } from "./controller";
import { Router } from "express";
import validators from "./validators";

const createRouter = () => {
  const router: Router = Router();

  router.get("/youtube/:id", [validators.youTubeId], controller.youtube);

  return router;
};

export default createRouter;
