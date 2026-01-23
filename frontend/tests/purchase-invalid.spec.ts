import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("reject purchase file without item_code", async ({ page }) => {
  await page.goto("/upload");

  const invalidFile = path.resolve(__dirname, "fixtures/purchase-broken.xlsx");

  await page.setInputFiles('[data-testid="upload-purchase"]', invalidFile);

  // Wait a moment for upload attempt to finish
  await page.waitForTimeout(1000);

  // Assert file does NOT appear in table
  await expect(page.getByText("purchase-broken.xlsx")).toHaveCount(0);
});
