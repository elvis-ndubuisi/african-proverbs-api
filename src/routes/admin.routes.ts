import express from "express";
import cors from "cors";
import config from "config";
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
import getAdmin from "../middlewares/getAdmin.middleware";
const router = express.Router();

// router.use(deserializeAdmin);
router.post(
  "/api/admin/register",
  deserializeAdmin,
  validateResources(registerAdminSchema),
  registerAdminHandler
);
router.get(
  "/api/admin/verify/:id/:verificationCode",
  deserializeAdmin,
  validateResources(verifyAdminSchema),
  verifyAdminHandler
);
router.post(
  "/api/admin/forgotpassword",
  deserializeAdmin,
  validateResources(forgotPasswordAdminSchema),
  forgotPasswordAdminHandler
);
router.post(
  "/api/admin/resetpassword/:id/:passwordResetCode",
  deserializeAdmin,
  validateResources(resetPasswordAdminSchema),
  resetPasswordAdminHandler
);
cors({ origin: config.get("origin") }),
  router.get(
    "/api/admin/me",
    deserializeAdmin,
    getAdmin,
    getCurrentAdminHandler
  );

export default router;
