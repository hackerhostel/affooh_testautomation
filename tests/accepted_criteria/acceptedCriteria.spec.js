import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ManageSprintPage } from "../../pages/manage_sprint/manageSprint.js";

//npx playwright test tests/accepted_criteria/acceptedCriteria.spec.js

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

  test('TC285 -  Add new acceptance criteria', async ({ page }) => {
   await page.getByTestId('project').selectOption('15');
   await page.getByRole('button', { name: 'test' }).click();
   await page.getByRole('tab', { name: 'Criteria' }).click();
   await page.locator('div').filter({ hasText: /^Add New$/ }).locator('svg').click();
   await page.getByTestId('description').fill('test');
   await page.getByRole('row', { name: 'test' }).locator('svg').first().click();
   await expect(page.getByText('Acceptance criteria successfully saved')).toBeVisible();
  });

  test('TC286 -  Edit existing criteria', async ({ page }) => {
   await page.getByTestId('project').selectOption('15');
   await page.getByRole('button', { name: 'test' }).click();
   await page.getByRole('tab', { name: 'Criteria' }).click();
  });

  test('TC287 -  Remove criteria', async ({ page }) => {
   await page.getByTestId('project').selectOption('15');
   await page.getByRole('button', { name: 'test' }).click();
   await page.getByRole('tab', { name: 'Criteria' }).click();
   await page.getByRole('row', { name: 'test' }).locator('svg').click();
   await expect(page.getByText('Acceptance criteria successfully updated')).toBeVisible();
  });

  test('TC288 -  Mark criteria as accepted', async ({ page }) => {
   await page.getByTestId('project').selectOption('15');
   await page.getByRole('button', { name: 'test' }).click();
   await page.getByRole('tab', { name: 'Criteria' }).click();
   await page.locator('.w-5.h-5.mb-1').click();
   await expect(page.getByText('Acceptance criteria successfully updated')).toBeVisible();
  });

  test('TC288 -  Revert accepted criteria', async ({ page }) => {
   await page.getByTestId('project').selectOption('15');
   await page.getByRole('button', { name: 'test' }).click();
   await page.getByRole('tab', { name: 'Criteria' }).click();
   await page.locator('.w-5.h-5.mb-1').click();
   await expect(page.getByText('Acceptance criteria successfully updated')).toBeVisible();
  });

  test('TC290 -  Validation - empty criteria', async ({ page }) => {
   await page.getByTestId('project').selectOption('15');
   await page.getByRole('button', { name: 'test' }).click();
   await page.getByRole('tab', { name: 'Criteria' }).click();
   await page.locator('div').filter({ hasText: /^Add New$/ }).locator('svg').click();
   await page.getByRole('row', { name: 'test' }).locator('svg').first().click();
   await expect(page.getByText('Failed to save acceptance criteria')).toBeVisible();
  });
});
