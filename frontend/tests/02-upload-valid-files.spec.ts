import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("02. upload valid purchase and sales files", async ({ page }) => {
  await page.goto("/upload");

  const purchaseFile = path.resolve(
    __dirname,
    "fixtures/purchase_real_data.xlsx",
  );

  await page.setInputFiles('[data-testid="upload-purchase"]', purchaseFile);

  await expect(page.getByText("purchase_real_data.xlsx")).toBeVisible();

  const salesFile = path.resolve(__dirname, "fixtures/sale_real_data.xlsx");

  await page.setInputFiles('[data-testid="upload-sale"]', salesFile);

  await expect(page.getByText("sale_real_data.xlsx")).toBeVisible();

  // Uploaded files table check
  await expect(page.getByText("purchase_real_data.xlsx")).toBeVisible();
  await expect(page.getByText("sale_real_data.xlsx")).toBeVisible();
});
