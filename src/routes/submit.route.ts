import express from "express";
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
  validateResources(submitProverbSchema),
  submitProverbHandler
);
router.get(
  "/api/submit",
  [deserializeAdmin, getAdmin],
  getSubmittedProverbsHandler
);
router.post(
  "/api/submit/approve/:submitId",
  [deserializeAdmin, getAdmin],
  validateResources(submitProverbIdSchema),
  approveSubmittedProverbHandler
);
router.delete(
  "/api/submit/disappprove/:submitId",
  [deserializeAdmin, getAdmin],
  validateResources(submitProverbIdSchema),
  disapprovedSubmittedProverbHandler
);

export default router;
