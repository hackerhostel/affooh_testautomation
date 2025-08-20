import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ManageSprintPage } from "../../pages/manage_sprint/manageSprint.js";

//npx playwright test tests/delete_task/deleteTask.spec.js

let login;
let sprintPage;

test.describe("Sprint Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    login = new LoginPageLoginPage(page);
    await login.navigateToLogin();
    await login.login("rexosi3308@cronack.com", "dinu@qa98");

    sprintPage = new ManageSprintPage(page);
    await sprintPage.navigateToSprintTab();
  });

  test('TC292 - Delete option visibility', async ({ page }) => {
    await page.locator('tr:nth-child(3) > td:nth-child(7) > .flex > .h-4').click();
    await expect(page.getByText('Delete')).toBeVisible();
  });

  test('TC293 - Confirmation dialog trigger', async ({ page }) => {
    await page.locator('tr:nth-child(3) > td:nth-child(7) > .flex > .h-4').click();
    await page.getByText('Delete').click();
    await expect(page.getByText('Are You Sure?Delete task -')).toBeVisible();
  });

  test('TC294 - Successful deletion', async ({ page }) => {
    await page.locator('.dx-cell-focus-disabled > .flex > .h-4').click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Yes, Delete It' }).click(); 
    await expect(page.getByText('Task Successfully Deleted')).toBeVisible();
  });

  //CHECK AGAIN
  test('TC295 - Cancel deletion', async ({ page }) => {
    await page.locator('tr:nth-child(3) > td:nth-child(7) > .flex > .h-4').click();
    await page.getByText('Delete').click();  
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Delete')).toBeVisible();
  });


});
