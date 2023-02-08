import express from "express";
import cors from "cors";
import config from "config";
import {
  createNewProverbHandler,
  createProverbsHandler,
  deleteProverbHandler,
  editProverbHandler,
  filterProverbHandler,
  getProverbHandler,
  todayProverbHandler,
} from "../controllers/proverbs.controller";
import deserializeAdmin from "../middlewares/deserializeAdmin.middleware";
import getAdmin from "../middlewares/getAdmin.middleware";
import validateResources from "../middlewares/validateResource.middleware";
import {
  createNewProverbSchema,
  proverbFilterQuerySchema,
  proverbIdQuerySchema,
} from "../schemas/proverb.schema";
import rateLimit from "express-rate-limit";

const router = express.Router();
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, try again after 5 minutes.",
});

router.get("/api/proverb", [cors(), apiLimiter], getProverbHandler);
router.post(
  "/api/proverb/filter",
  [cors(), apiLimiter],
  validateResources(proverbFilterQuerySchema),
  filterProverbHandler
);
router.get("/api/proverb/today", apiLimiter, todayProverbHandler);

// Private routes
router.use(cors({ origin: config.get("origin") }));
router.use(deserializeAdmin);
router.use(getAdmin);
router.post(
  "/api/proverb",
  validateResources(createNewProverbSchema),
  createNewProverbHandler
);
router.post("/api/proverb/proverbs", createProverbsHandler);
router.delete(
  "/api/proverb/delete",
  validateResources(proverbIdQuerySchema),
  deleteProverbHandler
);
router.patch(
  "/api/proverb/modify",
  validateResources(proverbIdQuerySchema),
  editProverbHandler
);

export default router;
