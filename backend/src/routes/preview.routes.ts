import { Router } from "express";
import {
  getPurchasePreview,
  getSalesPreview,
} from "../controllers/preview.controller";

const router = Router();

router.get("/purchases", getPurchasePreview);
router.get("/sales", getSalesPreview);

export default router;
