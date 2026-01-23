import { Router } from "express";
import { upload } from "../utils/upload.util";
import { uploadPurchase ,uploadSale} from "../controllers/upload.controller";

const router = Router();

router.post("/purchase", upload.single("file"), uploadPurchase);
router.post("/sale", upload.single("file"), uploadSale);

export default router;
