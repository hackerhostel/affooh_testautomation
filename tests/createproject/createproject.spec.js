import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { CreateProjectPage } from '../../pages/createproject/createproject';

let login;
let projectPage;

test.describe("Project Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    login = new LoginPageLoginPage(page);
    await login.navigateToLogin();
    await login.login("sathsarawijerathna21@gmail.com", "Diwya@1234");

    projectPage = new CreateProjectPage(page);
    await projectPage.navigateToProjectTab();
  });

  test('TC1 - Create Kanban project with valid data', async ({ page }) => {
  await page.getByText('Add New').click();
  await page.getByTestId('prefix').fill('KQAERD');
  await page.getByTestId('name').fill('Test3');
  await page.getByTestId('projectType').selectOption('1');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByText('Project Successfully Created')).toBeVisible();

});

test('TC2 - Upload valid avatar image', async ({ page }) => {
    const avatarPath = path.resolve('./tests/assets/avatar.png');
    await project.uploadAvatar(avatarPath);
    await project.fillProjectDetails({ prefix: 'ert1', name: 'AvatarTest2', type: '2' });
    await project.submit();
    await expect(page).toHaveURL('https://app.affooh.com/dashboard');
  });

 test('TC3 - Reject invalid avatar (PDF or >5MB)', async ({ page }) => {
    const invalidFile = path.resolve('./tests/assets/invalid.pdf');
    await project.uploadAvatar(invalidFile);
    await expect(page.getByText(/Invalid file format/)).toBeVisible();
  });

  test('TC4 - Ensure "Backlog" sprint appears for Scrum', async ({ page }) => {
    await project.fillProjectDetails({ prefix: 'SCM01', name: 'ScrumTest', type: '1' });
    await project.submit();
    await expect(page.getByText('Backlog')).toBeVisible();
  });

  test('TC5 - Ensure "Board" sprint appears for Kanban', async ({ page }) => {
    await project.fillProjectDetails({ prefix: 'KN02', name: 'KanbanBoard', type: '2' });
    await project.submit();
    await expect(page.getByText('Board')).toBeVisible();
    await expect(page.getByText('Board')).toHaveAttribute('aria-disabled', 'true'); // example
  });

  test('TC6 - Redirect to dashboard after creation', async ({ page }) => {
    await page.getByText('Add New').click();
    await page.getByTestId('prefix').fill('BGTAW');
    await page.getByTestId('name').fill('Test3');
    await page.getByTestId('projectType').selectOption('2');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page).toHaveURL('https://app.affooh.com/projects');
  });

});