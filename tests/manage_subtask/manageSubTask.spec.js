import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ManageSprintPage } from "../../pages/manage_sprint/manageSprint.js";

//npx playwright test tests/manage_subtask/manageSubTask.spec.js

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

  test('TC276 - Field Updates', async ({ page }) => {
    await page.getByRole('row', { name: 'test SR Sanduni To Do' }).locator('svg').click();
    await page.getByRole('cell', { name: 'test' }).getByTestId('name').click();
    await page.getByRole('cell', { name: 'test' }).getByTestId('name').fill('test update');
    await page.getByLabel('Sub Task').getByText('Sanduni Rajapaksha').click();
    await page.getByText('Sathsara Wijerathna').click();
    await page.getByRole('row', { name: 'test update SW Sathsara' }).locator('svg').nth(2).click();
    await expect(page.getByText('Sub task successfully updated')).toBeVisible();
  });

  test('TC277 - Sub-Task Deletion', async ({ page }) => { 
    await expect(page.getByText('Task Successfully Deleted')).toBeVisible();
  });



});
