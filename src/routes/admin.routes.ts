import express from "express";
import {
  forgotPasswordAdminHandler,
  getCurrentAdminHandler,
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
import deserializeAdmin from "../middlewares/deserializeAdmin.middleware";

const router = express.Router();

router.use(deserializeAdmin);
router.post(
  "/api/admins",
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
router.get("/api/admin/me", getCurrentAdminHandler);

export default router;
