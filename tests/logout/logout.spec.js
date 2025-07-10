// tests/logout.spec.js
import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from '../../pages/login/LoginPage';
import { DashboardPage } from '../../pages/dashboard/Dashboard';

test.describe('Logout Flow', () => {
  let loginPage, dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageLoginPage(page);
    await loginPage.navigateToLogin();
    dashboardPage = new DashboardPage(page);

    await loginPage.login('csmenike6@gmail.com', 'Chandima@123');
    await page.waitForURL('**/dashboard');
    await expect(page.getByText('logged in Successfully')).toBeVisible();
  });

  test('User should be able to logout successfully', async ({ page }) => {
    await dashboardPage.logout();
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  });
});
