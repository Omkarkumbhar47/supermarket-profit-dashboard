import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
test("22. reject invalid purchase file", async ({ page }) => {
  await page.goto("/upload");

  const invalidPurchase = path.resolve(
    __dirname,
    "fixtures/purchase-broken.xlsx",
  );

  await page.setInputFiles('[data-testid="upload-purchase"]', invalidPurchase);

  await page.waitForTimeout(1000);

  await expect(page.getByText("purchase-broken.xlsx")).toHaveCount(0);
});

test("22. reject invalid sales file", async ({ page }) => {
  await page.goto("/upload");

  const invalidSales = path.resolve(__dirname, "fixtures/purchase-broken.xlsx");

  await page.setInputFiles('[data-testid="upload-sale"]', invalidSales);

  await page.waitForTimeout(1000);

  await expect(page.getByText("purchase-broken.xlsx")).toHaveCount(0);
});
