import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { getFileHash } from "../utils/hash.util";
import { parseExcel } from "../services/excel.service";

const REQUIRED_COLUMNS = [
  "Item Code",
  "Item Name",
  "Quantity",
  "Buying Price",
  "Purchase Date (YYYY-MM-DD)",
] as const;

const REQUIRED_SALE_COLUMNS = [
  "Item Code",
  "Quantity",
  "Selling Price",
  "Sale Date (YYYY-MM-DD)",
] as const;

export async function uploadPurchase(req: Request, res: Response) {
  try {
    // 1️⃣ File validation
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // 2️⃣ Duplicate file validation
    const fileHash = getFileHash(req.file.buffer);

    const existing = await prisma.import.findUnique({
      where: { fileHash },
    });

    if (existing) {
      return res.status(409).json({
        message: "Duplicate file upload detected",
      });
    }

    // 3️⃣ Parse Excel
    const rows = parseExcel(req.file.buffer);

    if (!rows.length) {
      return res.status(400).json({
        message: "Excel file is empty",
      });
    }

    // 4️⃣ Column validation (STRICT)
    const uploadedColumns = Object.keys(rows[0]);

    const missingColumns = REQUIRED_COLUMNS.filter(
      (col) => !uploadedColumns.includes(col),
    );

    const extraColumns = uploadedColumns.filter(
      (col) => !REQUIRED_COLUMNS.includes(col as any),
    );

    if (missingColumns.length > 0 || extraColumns.length > 0) {
      return res.status(400).json({
        message: "Invalid Excel format",
        missingColumns,
        extraColumns,
        expectedColumns: REQUIRED_COLUMNS,
      });
    }

    // 5️⃣ Create import record
    const importRecord = await prisma.import.create({
      data: {
        fileName: req.file.originalname,
        fileHash,
        type: "PURCHASE",
      },
    });

    // 6️⃣ Row-level validation + insert
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNumber = i + 2; // Excel row number (header = 1)

      const itemCode = row["Item Code"]?.toString().trim();
      const itemName = row["Item Name"]?.toString().trim();
      const quantity = Number(row["Quantity"]);
      const buyingPrice = Number(row["Buying Price"]);
      const purchaseDateRaw = row["Purchase Date (YYYY-MM-DD)"];
      const purchaseDate = new Date(purchaseDateRaw);

      if (!itemCode) {
        throw new Error(`Row ${rowNumber}: Item Code is missing`);
      }

      if (!itemName) {
        throw new Error(`Row ${rowNumber}: Item Name is missing`);
      }

      if (Number.isNaN(quantity) || quantity <= 0) {
        throw new Error(`Row ${rowNumber}: Invalid Quantity`);
      }

      if (Number.isNaN(buyingPrice) || buyingPrice <= 0) {
        throw new Error(`Row ${rowNumber}: Invalid Buying Price`);
      }

      if (!purchaseDateRaw || isNaN(purchaseDate.getTime())) {
        throw new Error(
          `Row ${rowNumber}: Invalid Purchase Date (expected YYYY-MM-DD)`,
        );
      }

      // 7️⃣ Upsert product
      const product = await prisma.product.upsert({
        where: { itemCode },
        update: { itemName },
        create: { itemCode, itemName },
      });

      // 8️⃣ Create purchase
      const purchase = await prisma.purchase.create({
        data: {
          importId: importRecord.id,
          productId: product.id,
          quantity,
          buyingPrice,
          date: purchaseDate,
        },
      });

      // 9️⃣ Create inventory lot
      await prisma.inventoryLot.create({
        data: {
          productId: product.id,
          purchaseId: purchase.id,
          quantity,
          remaining: quantity,
          buyingPrice,
        },
      });
    }

    // 10️⃣ Success response
    return res.json({
      message: "Purchase uploaded successfully",
    });
  } catch (error: any) {
    // 🔴 Validation & processing errors
    return res.status(400).json({
      message: "Purchase upload failed",
      error: error.message,
    });
  }
}

export async function uploadSale(req: Request, res: Response) {
  try {
    // 1️⃣ File validation
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // 2️⃣ Duplicate file validation
    const fileHash = getFileHash(req.file.buffer);

    const existing = await prisma.import.findUnique({
      where: { fileHash },
    });

    if (existing) {
      return res.status(409).json({
        message: "Duplicate file upload detected",
      });
    }

    // 3️⃣ Parse Excel
    const rows = parseExcel(req.file.buffer);

    if (!rows.length) {
      return res.status(400).json({
        message: "Excel file is empty",
      });
    }

    // 4️⃣ Column validation (STRICT)
    const uploadedColumns = Object.keys(rows[0]);

    const missingColumns = REQUIRED_SALE_COLUMNS.filter(
      (col) => !uploadedColumns.includes(col),
    );

    const extraColumns = uploadedColumns.filter(
      (col) => !REQUIRED_SALE_COLUMNS.includes(col as any),
    );

    if (missingColumns.length > 0 || extraColumns.length > 0) {
      return res.status(400).json({
        message: "Invalid Excel format",
        missingColumns,
        extraColumns,
        expectedColumns: REQUIRED_SALE_COLUMNS,
      });
    }

    // 5️⃣ Create import record
    const importRecord = await prisma.import.create({
      data: {
        fileName: req.file.originalname,
        fileHash,
        type: "SALE",
      },
    });

    // 6️⃣ Row-level validation + FIFO stock deduction
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNumber = i + 2; // Excel row number (header = 1)

      const itemCode = row["Item Code"]?.toString().trim();
      const quantitySold = Number(row["Quantity"]);
      const sellingPrice = Number(row["Selling Price"]);
      const saleDateRaw = row["Sale Date (YYYY-MM-DD)"];
      const saleDate = new Date(saleDateRaw);

      if (!itemCode) {
        throw new Error(`Row ${rowNumber}: Item Code is missing`);
      }

      if (Number.isNaN(quantitySold) || quantitySold <= 0) {
        throw new Error(`Row ${rowNumber}: Invalid Quantity`);
      }

      if (Number.isNaN(sellingPrice) || sellingPrice <= 0) {
        throw new Error(`Row ${rowNumber}: Invalid Selling Price`);
      }

      if (!saleDateRaw || isNaN(saleDate.getTime())) {
        throw new Error(
          `Row ${rowNumber}: Invalid Sale Date (expected YYYY-MM-DD)`,
        );
      }

      // 7️⃣ Product validation
      const product = await prisma.product.findUnique({
        where: { itemCode },
      });

      if (!product) {
        throw new Error(`Row ${rowNumber}: Product not found (${itemCode})`);
      }

      let remainingToSell = quantitySold;

      // 8️⃣ FIFO inventory deduction
      const lots = await prisma.inventoryLot.findMany({
        where: {
          productId: product.id,
          remaining: { gt: 0 },
        },
        orderBy: { createdAt: "asc" },
      });

      for (const lot of lots) {
        if (remainingToSell <= 0) break;

        const deduct = Math.min(lot.remaining, remainingToSell);

        await prisma.inventoryLot.update({
          where: { id: lot.id },
          data: {
            remaining: lot.remaining - deduct,
          },
        });

        remainingToSell -= deduct;
      }

      if (remainingToSell > 0) {
        throw new Error(`Row ${rowNumber}: Insufficient stock for ${itemCode}`);
      }

      // 9️⃣ Create sale record
      await prisma.sale.create({
        data: {
          importId: importRecord.id,
          productId: product.id,
          quantitySold,
          sellingPrice,
          date: saleDate,
        },
      });
    }

    // 🔟 Success response
    return res.json({
      message: "Sale uploaded successfully",
    });
  } catch (error: any) {
    // 🔴 Validation & processing errors
    return res.status(400).json({
      message: "Sale upload failed",
      error: error.message,
    });
  }
}
