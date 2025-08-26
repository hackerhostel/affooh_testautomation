// deleteproject.spec.js

import { test, expect } from '@playwright/test';
import { DeleteProjectPage } from '../../pages/deleteproject/deleteproject';

const adminCredentials = {
  username: 'admin@example.com',
  password: 'Admin@123'
};

const userCredentials = {
  username: 'sathsarawijerathna21@gmail.com',
  password: 'Diwya@1234'
};

const testProjectName = 'DeleteTestProject';

test.describe('Delete Project UI Permissions', () => {
  let deletePage;

  test('Admin sees Delete option', async ({ page }) => {
    deletePage = new DeleteProjectPage(page);
    await page.goto('https://app.affooh.com/login');
    await page.getByTestId('username').fill(adminCredentials.username);
    await page.getByTestId('password').fill(adminCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://app.affooh.com/login');

    await deletePage.openProjectMenu(testProjectName);
    expect(await deletePage.isDeleteOptionVisible()).toBeTruthy();
    expect(await deletePage.isDeleteOptionEnabled()).toBeTruthy();
  });

  test('Non-admin does NOT see Delete option', async ({ page }) => {
    deletePage = new DeleteProjectPage(page);
    await page.goto('https://app.affooh.com/login');
    await page.getByTestId('username').fill(userCredentials.username);
    await page.getByTestId('password').fill(userCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://app.affooh.com/dashboard');

    await deletePage.openProjectMenu(testProjectName);
    expect(await deletePage.isDeleteOptionVisible()).toBeFalsy();
  });
});
