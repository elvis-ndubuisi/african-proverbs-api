import express from "express";
import cors from "cors";
import config from "config";
import {
  approveSubmittedProverbHandler,
  disapprovedSubmittedProverbHandler,
  getSubmittedProverbsHandler,
  submitProverbHandler,
} from "../controllers/submit.controller";
import validateResources from "../middlewares/validateResource.middleware";
import {
  submitProverbIdSchema,
  submitProverbSchema,
} from "../schemas/submit.schema";
import getAdmin from "../middlewares/getAdmin.middleware";
import deserializeAdmin from "../middlewares/deserializeAdmin.middleware";

const router = express.Router();

router.post(
  "/api/submit",
  // cors({ origin: "https://africanproverbs.vercel.app", methods: ["POST"] }),
  cors({ origin: config.get("frontpage"), methods: "POST" }),
  validateResources(submitProverbSchema),
  submitProverbHandler
);
router.get(
  "/api/submit",
  [cors({ origin: config.get("origin") }), deserializeAdmin, getAdmin],
  getSubmittedProverbsHandler
);
router.post(
  "/api/submit/approve/:submitId",
  [cors({ origin: config.get("origin") }), deserializeAdmin, getAdmin],
  validateResources(submitProverbIdSchema),
  approveSubmittedProverbHandler
);
router.delete(
  "/api/submit/disappprove/:submitId",
  [cors({ origin: config.get("origin") }), deserializeAdmin, getAdmin],
  validateResources(submitProverbIdSchema),
  disapprovedSubmittedProverbHandler
);

export default router;
