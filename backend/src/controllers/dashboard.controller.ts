import { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboard.service";
import { getItemWiseProfit } from "../services/item-profit.service";
import { prisma } from "../prisma/client";

export async function dashboardSummary(req: Request, res: Response) {
  const data = await getDashboardSummary();
  res.json(data);
}

export async function itemProfit(req: Request, res: Response) {
  const data = await getItemWiseProfit();
  res.json(data);
}

export async function stockPerItem(req: Request, res: Response) {
  const products = await prisma.product.findMany({
    include: {
      lots: true,
    },
  });

  const data = products.map((p) => ({
    itemCode: p.itemCode,
    stock: p.lots.reduce((sum, lot) => sum + lot.remaining, 0),
  }));

  res.json(data);
}