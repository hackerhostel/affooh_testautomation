import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ManageSprintPage } from "../../pages/manage_sprint/manageSprint.js";

//npx playwright test tests/create_task/createTask.spec.js

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

  test('TC244 - Navigate to Task Creation screen from Task List button', async ({ page }) => {
     await page.getByRole('main').getByRole('button', { name: 'New Task' }).click();
     await expect(page.getByText('Create New Task')).toBeVisible();
  });

  test('TC245 - Verify "New Task" option in header context menu', async ({ page }) => {
     await expect(page.locator('div').filter({ hasText: /^New Task$/ }).getByRole('button')).toBeVisible();
  });

  test('TC246 - Navigate to Task Creation screen from header menu', async ({ page }) => {
     await page.locator('div').filter({ hasText: /^New Task$/ }).getByRole('button').click();
     await expect(page.getByText('Create New Task')).toBeVisible();
  });

   test('TC247 - Verify "New Task" button visibility on Task List page', async ({ page }) => {
     await expect(page.getByRole('main').getByRole('button', { name: 'New Task' })).toBeVisible();
  });

   test('TC248 - Verify Task Type dropdown functionality', async ({ page }) => {
     await page.getByRole('main').getByRole('button', { name: 'New Task' }).click();
     await expect(page.getByText('Create New Task')).toBeVisible();
     const dropdown = page.locator('#taskTypeID');
     const options = await dropdown.locator('option').allTextContents();
     const expectedOptions = ['Select an option', 'Epic', 'Story', 'Task', 'Bug'];
       for (const expected of expectedOptions) {
       expect(options).toContain(expected);
      }
   });

   test('TC249 - Dynamic UI update based on Task Type selection', async ({ page }) => {
     await page.locator('div').filter({ hasText: /^New Task$/ }).getByRole('button').click();
     await expect(page.getByText('Create New Task')).toBeVisible();
     await page.locator('#taskTypeID').selectOption('132');
     await expect(page.locator('#taskTypeID')).toHaveValue('132');
     await expect(page.getByText('Status')).toBeVisible();
     await expect(page.getByText('Priority')).toBeVisible();
     await expect(page.getByText('Release')).toBeVisible();
   });

   test('TC250 - Mandatory field validation', async ({ page }) => {
     await page.locator('div').filter({ hasText: /^New Task$/ }).getByRole('button').click();
     await page.getByRole('button', { name: 'Continue' }).click();
     await expect(page.getByText('task type is required')).toBeVisible();
     await expect(page.getByText('sprint is required')).toBeVisible();
     await expect(page.getByText('task title is required')).toBeVisible();
   });

   test('TC251 - Successful task creation with mandatory fields', async ({ page }) => {
      await page.locator('div').filter({ hasText: /^New Task$/ }).getByRole('button').click();
      await expect(page.getByText('Create New Task')).toBeVisible();
      await page.locator('#taskTypeID').selectOption('133');
      await page.locator('#sprintID').selectOption('62');
      await page.locator('#name').fill('test');
      await page.locator('.ql-editor').fill('test des');
      await page.locator('span').filter({ hasText: 'Select an option' }).first().click();
      await page.getByText('Pramod Hewasinghe').click();
      await page.locator('span').filter({ hasText: 'Select an option' }).click();
      await page.getByRole('listitem').getByText('PH').click();
      await page.getByTestId('Priority').selectOption('849');
      await page.getByRole('button', { name: 'Continue' }).click();
      //await expect(page.getByText('Creating task...')).toBeVisible();
      await expect(page.getByText('created successfully!')).toBeVisible();
   });

   test('TC252 - Verify default fields in task creation form', async ({ page }) => {
     await page.locator('div').filter({ hasText: /^New Task$/ }).getByRole('button').click();
     await expect(page.getByText('Create New Task')).toBeVisible();
     await expect(page.getByText('Task Type')).toBeVisible();
     //await expect(page.getByText('Sprint')).toBeVisible();
     await expect(page.getByText('Task Title')).toBeVisible();
     await expect(page.getByText('Description')).toBeVisible();
     //await expect(page.getByText('Epic')).toBeVisible();
     await expect(page.getByText('Assignee')).toBeVisible();
     await expect(page.getByText('Task Owner')).toBeVisible();
  });

  //test253

});
