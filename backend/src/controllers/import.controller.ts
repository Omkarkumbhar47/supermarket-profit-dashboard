// src/controllers/import.controller.ts
import type { Request, Response } from "express";
import { prisma } from "../prisma/client";

export async function getImports(req: Request, res: Response) {
  const imports = await prisma.import.findMany({
    orderBy: { uploadedAt: "desc" },
  });

  res.json(imports);
}
