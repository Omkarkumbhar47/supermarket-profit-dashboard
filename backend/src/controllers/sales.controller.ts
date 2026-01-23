import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { getFileHash } from "../utils/hash.util";
import { parseExcel } from "../services/excel.service";
import { consumeInventoryFIFO } from "../services/fifo.service";

export async function uploadSales(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  const fileHash = getFileHash(req.file.buffer);

  const duplicate = await prisma.import.findUnique({
    where: { fileHash },
  });

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate file upload detected" });
  }

  const rows = parseExcel(req.file.buffer);

  const importRecord = await prisma.import.create({
    data: {
      fileName: req.file.originalname,
      fileHash,
      type: "SALE",
    },
  });

  try {
    for (const row of rows) {
      const product = await prisma.product.findUnique({
        where: { itemCode: row.item_code },
      });

      if (!product) {
        throw new Error(`Product not found: ${row.item_code}`);
      }

      const totalStock = await prisma.inventoryLot.aggregate({
        where: {
          productId: product.id,
          remaining: { gt: 0 },
        },
        _sum: { remaining: true },
      });

      if ((totalStock._sum.remaining || 0) < row.quantity_sold) {
        throw new Error(`Insufficient stock for ${row.item_code}`);
      }

      await consumeInventoryFIFO(product.id, Number(row.quantity_sold));

      await prisma.sale.create({
        data: {
          importId: importRecord.id,
          productId: product.id,
          quantitySold: Number(row.quantity_sold),
          sellingPrice: Number(row.selling_price),
          date: new Date(row.date),
        },
      });
    }

    res.json({ message: "Sales file uploaded successfully" });
  } catch (error: any) {
    // rollback import
    await prisma.import.update({
      where: { id: importRecord.id },
      data: { status: "DELETED" },
    });

    res.status(400).json({ error: error.message });
  }
}
