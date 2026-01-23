import type { Request, Response } from "express";
import { prisma } from "../prisma/client";

export async function getPurchasePreview(req: Request, res: Response) {
  const purchases = await prisma.purchase.findMany({
    include: {
      product: true,
      import: true,
    },
    orderBy: { date: "desc" },
  });

  res.json(
    purchases.map((p) => ({
      itemCode: p.product.itemCode,
      itemName: p.product.itemName,
      quantity: p.quantity,
      buyingPrice: Number(p.buyingPrice),
      date: p.date,
      fileName: p.import.fileName,
    }))
  );
}

export async function getSalesPreview(req: Request, res: Response) {
  const sales = await prisma.sale.findMany({
    include: {
      product: true,
      import: true,
    },
    orderBy: { date: "desc" },
  });

  res.json(
    sales.map((s) => ({
      itemCode: s.product.itemCode,
      quantitySold: s.quantitySold,
      sellingPrice: Number(s.sellingPrice),
      date: s.date,
      fileName: s.import.fileName,
    }))
  );
}
