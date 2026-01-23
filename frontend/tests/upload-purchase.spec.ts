import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("upload purchase excel successfully", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Upload").click();

  const filePath = path.resolve(__dirname, "fixtures/purchase_real_data.xlsx");

  await page.setInputFiles('[data-testid="upload-purchase"]', filePath);

  await page.waitForSelector("text=purchase_real_data.xlsx", {
    timeout: 10000,
  });

  const row = page
    .getByRole("row")
    .filter({ hasText: "purchase_real_data.xlsx" });

  await expect(row).toBeVisible();

  await expect(row.locator('[data-testid^="import-type-"]')).toHaveText(
    "PURCHASE",
  );
});
