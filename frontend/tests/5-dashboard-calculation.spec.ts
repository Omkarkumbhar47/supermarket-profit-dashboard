import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("24. dashboard shows correct calculations after uploads", async ({
  page,
}) => {
  // assumes DB cleared before test run

  await page.goto("/upload");

  const purchaseFile = path.resolve(
    __dirname,
    "fixtures/purchase_real_data.xlsx",
  );
  await page.setInputFiles('[data-testid="upload-purchase"]', purchaseFile);

  const salesFile = path.resolve(__dirname, "fixtures/sale_real_data.xlsx");
  await page.setInputFiles('[data-testid="upload-sale"]', salesFile);

  await page.getByText("Dashboard").click();

  await expect(page.getByText("Total Revenue")).toBeVisible();
  await expect(page.getByText("₹285,800")).toBeVisible();
  await expect(page.getByText("₹231,800")).toBeVisible();
  await expect(page.getByText("₹54,000")).toBeVisible();
  await expect(page.getByText("44")).toBeVisible();
});
