import express from "express";
import {
  forgotPasswordAdminHandler,
  registerAdminHandler,
  resetPasswordAdminHandler,
  verifyAdminHandler,
} from "../controllers/admin.controller";
import validateResources from "../middlewares/validateResource.middleware";
import {
  forgotPasswordAdminSchema,
  registerAdminSchema,
  resetPasswordAdminSchema,
  verifyAdminSchema,
} from "../schemas/admin.schema";

const router = express.Router();

router.post(
  "/admin",
  validateResources(registerAdminSchema),
  registerAdminHandler
);
router.get(
  "/auth/admin/verify/:id/:verificationCode",
  validateResources(verifyAdminSchema),
  verifyAdminHandler
);
router.post(
  "/auth/admin/forgot",
  validateResources(forgotPasswordAdminSchema),
  forgotPasswordAdminHandler
);
router.post(
  "/auth/admin/reset/:id/:resetPasswordCode",
  validateResources(resetPasswordAdminSchema),
  resetPasswordAdminHandler
);

export default router;
