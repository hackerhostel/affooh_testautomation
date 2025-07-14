import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from '../../pages/login/LoginPage.js';
import { ManageSprintPage } from '../../pages/manage_sprint/manageSprint.js';

test('User can view sprint tasks after login', async ({ page }) => {
  // Step 1: Login
  const loginPage = new LoginPageLoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login('csmenike6@gmail.com', 'Chandima@123');

  // Step 2: Use ManageSprintPage to test sprint UI
  const sprintPage = new ManageSprintPage(page);
  await sprintPage.navigateToSprintTab();

  // Step 3: Assertions
  await expect(page.locator('text=test task 1')).toBeVisible();
  await expect(page.locator('text=test task 2')).toBeVisible();
});
