import { test, expect } from "@playwright/test";
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ManageSprintPage } from "../../pages/manage_sprint/manageSprint";

//npx playwright test tests/manage_sprint/manageSprint.spec.js

let login;
let sprintPage;

test.describe("Sprint Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    login = new LoginPageLoginPage(page);
    await login.navigateToLogin();
    await login.login("sandunikr1999@gmail.com", "Sandu@99qa");

    sprintPage = new ManageSprintPage(page);
    await sprintPage.navigateToSprintTab();
  });

  test('Verify Sprint Creation Accessibility', async ({ page }) => {
    await page.getByText('Add New').click();
    await expect(page.getByPlaceholder('Sprint Name')).toBeVisible();
    await expect(page.getByPlaceholder('Start Date')).toBeVisible();
    await expect(page.getByPlaceholder('End Date')).toBeVisible();
  });

  test('Create a Valid Sprint', async ({ page }) => {
  await page.getByText('Add New').click();
  await page.getByPlaceholder('Sprint Name').fill('Sprint Test');
  await page.getByTestId('startDate').fill('2025-07-15');
  await page.getByTestId('endDate').fill('2025-07-20');
  await page.getByRole('button', { name: 'Create New Sprint' }).click();
  await expect(page.getByText('Sprint Successfully Created')).toBeVisible();

});

  test('Validate Required Fields', async ({ page }) => {
  await page.getByText('Add New').click();
  await page.getByPlaceholder('Sprint Name').fill('');
  await page.getByTestId('startDate').fill('');
  await page.getByTestId('endDate').fill('');
  await page.getByRole('button', { name: 'Create New Sprint' }).click();
  await expect(page.getByText('Failed To Create The Sprint')).toBeVisible();

});

  test('Validate Date Logic', async ({ page }) => {
  await page.getByText('Add New').click();
  await page.getByPlaceholder('Sprint Name').fill('Sprint Test D');
  await page.getByTestId('startDate').fill('2025-07-20');
  await page.getByTestId('endDate').fill('2025-07-10');
  await page.getByRole('button', { name: 'Create New Sprint' }).click();
  await expect(page.getByText('Failed To Create The Sprint')).toBeVisible();

});

  test('Delete Sprint (With Confirmation)', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^testWebsite•DevelopmentBACKLOGWebsite•Development$/ }).locator('svg').click();
  await page.getByRole('button', { name: 'DELETE' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await expect(page.getByText('Failed To Delete The Sprint')).toBeVisible();
});

});