import { test, expect } from "@playwright/test";
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ProjectDetailsPage } from "../../pages/updateProjectDetails/updateProjectDetails.js";


let login;
let project;

test.describe("Update Project Details Tests", () => {
  test.beforeEach(async ({ page }) => {
    login = new LoginPageLoginPage(page);
    await login.navigateToLogin();
    await login.login("sathsarawijerathna21@gmail.com", "Diwya@1234");

    project = new ProjectDetailsPage(page);
    await project.navigateToProjectPage();
  });

  test('Verify Edit Project Details Option in Dropdown Menu', async ({ page }) => {
    await project.openProjectMenu();
    await expect(page.getByRole('menuitem', { name: 'Edit Project Details' })).toBeVisible();
  });

  test('Verify Edit Project Dialog Opens', async ({ page }) => {
    await project.openEditProjectDialog();
    await expect(page.getByPlaceholder('Prefix')).toBeVisible();
    await expect(page.getByPlaceholder('Name')).toBeVisible();
    await expect(page.getByTestId('project-type')).toBeVisible();
    await expect(page.getByTestId('project-status')).toBeVisible();
  });

  test('Validate Prefix Field (Unique Identifier)', async ({ page }) => {
    await project.openEditProjectDialog();
    await page.getByPlaceholder('Prefix').fill('existing-prefix');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Prefix must be unique')).toBeVisible();
  });

  test('Validate Name Field (Required Field)', async ({ page }) => {
    await project.openEditProjectDialog();
    await page.getByPlaceholder('Name').fill('');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Name is required')).toBeVisible();
  });

  test('Validate Type Field (Dropdown Selection)', async ({ page }) => {
    await project.openEditProjectDialog();
    await page.getByTestId('project-type').click();
    await expect(page.getByText('Software Development')).toBeVisible();
    await expect(page.getByText('Marketing')).toBeVisible();
    await expect(page.getByText('Design')).toBeVisible();
    await page.getByText('Marketing').click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Project updated successfully')).toBeVisible();
  });

  test('Edit and Save Project Details Successfully', async ({ page }) => {
    await project.openEditProjectDialog();
    await page.getByPlaceholder('Prefix').fill('unique-prefix-123');
    await page.getByPlaceholder('Name').fill('Updated Project Name');
    await page.getByTestId('project-type').click();
    await page.getByText('Design').click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Project updated successfully')).toBeVisible();
  });

  test('Cancel Editing Project Details', async ({ page }) => {
    await project.openEditProjectDialog();
    await page.getByPlaceholder('Name').fill('Temporary Change');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByText('Edit Project Details')).toBeVisible();
  });

  test('Verify Status Change (Active/On Hold/Closed)', async ({ page }) => {
    await project.openEditProjectDialog();
    await page.getByTestId('project-status').click();
    await page.getByText('On Hold').click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Project updated successfully')).toBeVisible();
  });
});
