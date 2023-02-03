import express, { Response, Request, NextFunction } from "express";
import proverb from "./proverb.routes";
import admin from "./admin.routes";
import auth from "./auth.router";
import submit from "./submit.route";
import requestError from "../middlewares/error.middleware";

const router = express.Router();

/* Health check routes */
router.get("/healthcheck", (_, res: Response) => res.sendStatus(200));

router.use(proverb);
router.use(submit);
router.use(admin);
router.use(auth);

router.get("*", (_, res: Response, next: NextFunction) => {
  next(res.status(400).send("Resource not found"));
});

router.use(requestError);
export default router;
