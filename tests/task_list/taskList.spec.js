import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ManageSprintPage } from "../../pages/manage_sprint/manageSprint.js";

//npx playwright test tests/task_list/taskList.spec.js

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

  test('TC254 - Sprint-based filtering', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^BACKLOGWebsite•Development$/ }).first().click();
    await page.waitForTimeout(2000); 
    const taskNames = await page.locator('table >> tr >> td').allTextContents();
        for (const task of taskNames) {
        expect(task).not.toContain('BACKLOG'); 
        }
  });

  test('TC255 - Column customization', async ({ page }) => {
    await page.getByRole('button', { name: 'Column Chooser' }).click();
    await page.getByRole('treeitem', { name: 'Epic Name' }).getByLabel('Check state').click();
    await expect(page.getByLabel('Column Epic Name').getByText('Epic Name')).toBeVisible();
  });

  test('TC257 - Filter by attributes', async ({ page }) => {
    await page.getByTestId('assignee').selectOption('53');
    await page.getByTestId('status').selectOption('843');
    await expect(page.getByRole('gridcell', { name: 'In Progress' })).toBeVisible();
    await expect(page.getByText('PHPramod')).toBeVisible();
  });

  test('TC258 - Keyword search', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Search', exact: true }).click();
    await page.getByRole('textbox', { name: 'Search', exact: true }).fill('test3');
    await expect(page.getByRole('button', { name: 'test3' })).toBeVisible();
  });

  test('TC259 - Show/hide options', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Completed Tasks$/ }).locator('div').first().click();
    await expect(page.getByText('Done')).toBeVisible();
  });

  test('TC260 - Keyword search', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Search', exact: true }).click();
    await page.getByRole('textbox', { name: 'Search', exact: true }).fill('test3');
    await expect(page.getByRole('button', { name: 'test3' })).toBeVisible();
  });

  test('TC261 - Show/hide options', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^Completed Tasks$/ }).locator('div').first().click();
    await expect(page.getByText('Done')).toBeVisible();
  });

//56,62,63,64

});
