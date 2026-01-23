import { test, expect } from "@playwright/test";

test("dashboard loads successfully", async ({ page }) => {
  // 1️⃣ Open the app (baseURL is already set)
  await page.goto("/");

  // 2️⃣ Check app title text
  await expect(page.getByText("Supermarket Profit System")).toBeVisible();

  // 3️⃣ Check dashboard heading
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  // 4️⃣ Check summary cards exist
  await expect(page.getByText("Total Revenue")).toBeVisible();
  await expect(page.getByText("Total Cost")).toBeVisible();
  await expect(page.getByText("Total Profit")).toBeVisible();
  await expect(page.getByText("Items Sold")).toBeVisible();
});

test("dashboard loads without data", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("upload page loads successfully", async ({ page }) => {
  await page.goto("/upload");

  // ✅ Real heading (h1)
  await expect(
    page.getByRole("heading", { name: "Upload Files" }),
  ).toBeVisible();

  // ✅ Card titles (NOT headings in HTML)
  await expect(page.getByText("Upload Purchase File")).toBeVisible();
  await expect(page.getByText("Upload Sales File")).toBeVisible();

  // ✅ Descriptions
  await expect(
    page.getByText("Upload Excel file containing purchase data."),
  ).toBeVisible();

  await expect(
    page.getByText("Upload Excel file containing sales data."),
  ).toBeVisible();

  // ✅ Uploaded files section (h2)
  await expect(
    page.getByRole("heading", { name: "Uploaded Files" }),
  ).toBeVisible();

  // ✅ Table headers (rendered by ImportTable)
  await expect(page.getByText("File Name")).toBeVisible();
  await expect(page.getByText("Type")).toBeVisible();
  await expect(page.getByText("Uploaded At")).toBeVisible();
});

test("preview page shows purchase and sales tables correctly", async ({
  page,
}) => {
  await page.goto("/preview");

  // Page heading
  await expect(
    page.getByRole("heading", { name: "Data Preview" }),
  ).toBeVisible();

  /**
   * PURCHASE TABLE HEADERS
   */
  await expect(page.getByTestId("purchase-item-code")).toBeVisible();
  await expect(page.getByTestId("purchase-item-name")).toBeVisible();
  await expect(page.getByTestId("purchase-quantity")).toBeVisible();
  await expect(page.getByTestId("purchase-buying-price")).toBeVisible();
  await expect(page.getByTestId("purchase-date")).toBeVisible();

  /**
   * SALES TABLE HEADERS
   */
  await expect(page.getByTestId("sales-item-code")).toBeVisible();
  await expect(page.getByTestId("sales-quantity-sold")).toBeVisible();
  await expect(page.getByTestId("sales-selling-price")).toBeVisible();
  await expect(page.getByTestId("sales-date")).toBeVisible();
});
