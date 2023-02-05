import express from "express";
import validateResources from "../middlewares/validateResource.middleware";
import { createSessionSchema } from "../schemas/auth.schema";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/api/sessions",
  validateResources(createSessionSchema),
  createSessionHandler
);

router.post("/api/sessions/refresh", refreshAccessTokenHandler);

export default router;
