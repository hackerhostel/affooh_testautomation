import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ManageSprintPage } from "../../pages/manage_sprint/manageSprint.js";

//npx playwright test tests/update_task/updateTask.spec.js

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

  test('TC265 - Access task detail view', async ({ page }) => {
    await page.getByRole('button', { name: 'test', exact: true }).click();
    await expect(page.getByLabel('Title')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
    await expect(page.getByText('Assignee')).toBeVisible();
    await expect(page.getByText('Task Owner')).toBeVisible();
    await expect(page.getByText('Epic')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('Priority')).toBeVisible();
  });

  test('TC266 - Verify displayed fields', async ({ page }) => {
    await page.getByRole('button', { name: 'test', exact: true }).click();
    await expect(page.getByLabel('Title')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
    await expect(page.getByText('Assignee')).toBeVisible();
    await expect(page.getByText('Task Owner')).toBeVisible();
    await expect(page.getByText('Epic')).toBeVisible();
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('Priority')).toBeVisible();
  });

  test('TC267 - Edit text fields', async ({ page }) => {
    await page.getByRole('button', { name: 'test', exact: true }).click();
    await page.getByText('test des update').click();
    await page.locator('div').filter({ hasText: /^test des$/ }).nth(1).fill('test des update2');
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await expect(page.getByText('Task successfully updated!')).toBeVisible();
  });

  test('TC268 - Update dropdown fields', async ({ page }) => {
    await page.getByRole('button', { name: 'test', exact: true }).click();
    await page.getByTestId('Priority').selectOption('417');
    await expect(page.getByText('Task attribute updated!')).toBeVisible();
  });

  test('TC270 - Change assignee', async ({ page }) => {
    await page.getByRole('button', { name: 'test', exact: true }).click();
    await page.locator('div').filter({ hasText: /^SSathsara Wijerathna$/ }).first().click();
    await page.getByRole('listitem').filter({ hasText: 'SSanduni Rajapaksha' }).click();
    await expect(page.getByText('Task successfully updated!')).toBeVisible();
  });


});
