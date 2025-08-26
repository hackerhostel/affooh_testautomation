import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ManageSprintPage } from "../../pages/manage_sprint/manageSprint.js";

//npx playwright test tests/link_task/linkTask.spec.js

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

  test('TC279 -  Access Task Linking Interface', async ({ page }) => {
   await page.getByTestId('project').selectOption('15');
   await page.getByRole('button', { name: 'test' }).click();
   await page.getByRole('tab', { name: 'Relationship' }).click();
   await expect(page.getByText('Relationship(s)')).toBeVisible();
  });

  test('TC280 - Relationship Type Selection', async ({ page }) => {
  await page.getByTestId('project').selectOption('15');
  await page.getByRole('button', { name: 'test' }).click();
  await page.getByRole('tab', { name: 'Relationship' }).click();
  await page.locator('div').filter({ hasText: /^Add New$/ }).locator('path').click();
  const dropdown = page.locator('#type');
  await expect(dropdown.locator('option')).toHaveCount(8); 
  let options = await dropdown.locator('option').allTextContents();
  options = options.map(opt => opt.trim());
  //console.log('DROPDOWN OPTIONS:', options);
  const expectedOptions = ['Is Blocked By', 'Related to', 'Blocks'];
  for (const expected of expectedOptions) {
    expect(options).toContain(expected);
  }
});
 
test('TC281 - Create Valid Task Link', async ({ page }) => {
  await page.getByTestId('project').selectOption('15');
  await page.getByRole('button', { name: 'test' }).click();
  await page.getByRole('tab', { name: 'Relationship' }).click();
  await page.locator('div').filter({ hasText: /^Add New$/ }).locator('svg').click();
  await page.getByTestId('type').selectOption('7');
  await expect(page.getByRole('row', { name: 'test Related to' })).toBeVisible();
});

test('TC283 - View Linked Tasks', async ({ page }) => {
  await page.getByTestId('project').selectOption('15');
  await page.getByRole('button', { name: 'test' }).click();
  await page.getByRole('tab', { name: 'Relationship' }).click();
  const linkedTasks = page.locator('tbody tr');
  await expect(linkedTasks.first()).toBeVisible();
  const count = await linkedTasks.count();
  console.log(`Found ${count} linked tasks`);
  for (let i = 0; i < count; i++) {
    await expect(linkedTasks.nth(i)).toBeVisible();
  }
});

test('TC284 - Remove Task Link', async ({ page }) => {
  await page.getByTestId('project').selectOption('15');
  await page.getByRole('button', { name: 'test' }).click();
  await page.getByRole('tab', { name: 'Relationship' }).click();
  await page.getByRole('row', { name: 'test SR Sanduni Related to' }).locator('svg').click();
  await expect(page.getByText('Task link successfully removed')).toBeVisible();
});


});
