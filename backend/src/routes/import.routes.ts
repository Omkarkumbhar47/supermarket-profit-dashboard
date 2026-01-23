// src/routes/import.routes.ts
import { Router } from "express";
import { getImports } from "../controllers/import.controller";

const router = Router();
router.get("/", getImports);
export default router;
