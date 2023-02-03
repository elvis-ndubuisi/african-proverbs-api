import express from "express";
import { submitProverbHandler } from "../controllers/submit.controller";
import validateResources from "../middlewares/validateResource.middleware";
import { submitProverbSchema } from "../schemas/submit.schema";

const router = express.Router();

router.post(
  "/private/submit",
  validateResources(submitProverbSchema),
  submitProverbHandler
);

export default router;
