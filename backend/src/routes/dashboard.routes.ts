import { Router } from "express";
import {
  dashboardSummary,
  itemProfit,
  stockPerItem,
} from "../controllers/dashboard.controller";

const router = Router();

router.get("/summary", dashboardSummary);
router.get("/items", itemProfit);
router.get("/stock", stockPerItem);

export default router;
