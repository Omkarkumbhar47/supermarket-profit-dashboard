import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("23. reject non-excel files", async ({ page }) => {
  await page.goto("/upload");

  const textFile = path.resolve(__dirname, "fixtures/sample.txt");

  await page.setInputFiles('[data-testid="upload-purchase"]', textFile);

  await expect(page.getByText("sample.txt")).toHaveCount(0);
});

test("23. sales not allowed before purchase", async ({ page }) => {
  await page.goto("/upload");

  const salesFile = path.resolve(__dirname, "fixtures/sale_real_data.xlsx");

  await page.setInputFiles('[data-testid="upload-sale"]', salesFile);

  await page.waitForTimeout(1000);

  await expect(page.getByText("sale_real_data.xlsx")).toHaveCount(1);
});

test("23. duplicate purchase file not allowed", async ({ page }) => {
  await page.goto("/upload");

  const purchaseFile = path.resolve(
    __dirname,
    "fixtures/purchase_real_data.xlsx",
  );

  await page.setInputFiles('[data-testid="upload-purchase"]', purchaseFile);

  await page.waitForSelector("text=purchase_real_data.xlsx");

  // upload again
  await page.setInputFiles('[data-testid="upload-purchase"]', purchaseFile);

  await page.waitForTimeout(1000);

  const rows = page.getByText("purchase_real_data.xlsx");
  await expect(rows).toHaveCount(1);
});
