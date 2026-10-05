import { Router } from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import * as ownerController from "../controllers/ownerController.js";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("OWNER"),
  ownerController.dashboard
);

router.put(
  "/password",
  authenticate,
  authorize("OWNER"),
  ownerController.updatePassword
);

export default router;