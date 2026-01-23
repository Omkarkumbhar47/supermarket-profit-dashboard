import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("dashboard shows correct revenue, cost, profit and stock", async ({
  page,
}) => {
  // 1️⃣ Open app
  await page.goto("/");
  await page.getByText("Upload").click();

  // 2️⃣ Upload PURCHASE file
  const purchaseFile = path.resolve(
    __dirname,
    "fixtures/purchase_real_data.xlsx",
  );

  await page.setInputFiles('[data-testid="upload-purchase"]', purchaseFile);
  await page.waitForSelector("text=purchase_real_data.xlsx");

  // 3️⃣ Upload SALES file
  const salesFile = path.resolve(__dirname, "fixtures/sale_real_data.xlsx");

  await page.setInputFiles('[data-testid="upload-sale"]', salesFile);
  await page.waitForSelector("text=sale_real_data.xlsx");

  // 4️⃣ Go to Dashboard
  await page.getByText("Dashboard").click();

  // 5️⃣ Assert KPI cards
  await expect(page.getByText("₹285,800")).toBeVisible(); // Total Revenue
  await expect(page.getByText("₹231,800")).toBeVisible(); // Total Cost
  await expect(page.getByText("₹54,000")).toBeVisible(); // Total Profit
  await expect(page.getByText("44")).toBeVisible(); // Items Sold
});
