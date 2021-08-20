import { param } from "express-validator";

export default {
  youTubeId: param("id").isString().trim().isLength({ min: 11, max: 11 })
};
