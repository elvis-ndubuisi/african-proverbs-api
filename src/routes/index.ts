import express, { Response } from "express";
import proverb from "./proverb.routes";
import admin from "./admin.routes";

const router = express.Router();

/* Health check routes */
router.get("/healthcheck", (_, res: Response) => res.sendStatus(200));

router.use(proverb);
router.use(admin);

export default router;
