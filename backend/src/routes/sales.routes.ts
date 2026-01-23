import { Router } from "express";
import { upload } from "../utils/upload.util";
import { uploadSales } from "../controllers/sales.controller";

const router = Router();

router.post("/sales", upload.single("file"), uploadSales);

export default router;
