import express from "express";
import {
  filterProverbHandler,
  getProverbHandler,
  todayProverbHandler,
} from "../controllers/proverbs.controller";

const router = express.Router();

router.get("/api/proverb", getProverbHandler);
router.get("/api/proverb/:filter", filterProverbHandler);
router.get("/api/proverb/today", todayProverbHandler);

export default router;
