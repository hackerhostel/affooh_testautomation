import { test, expect } from "@playwright/test";
import { LoginPageLoginPage } from "../../pages/login/LoginPage.js";
import { ProjectSelectionPage } from "../../pages/projectSelection/projectSelection.js";

// npx playwright test tests/project/projectSelection.spec.js

let login;
let project;

test.describe("Project Selection Tests", () => {
  test.beforeEach(async ({ page }) => {
    login = new LoginPageLoginPage(page);
    await login.navigateToLogin();
    await login.login("sathsarawijerathna21@gmail.com", "Diwya@1234");

    project = new ProjectSelectionPage(page);
  });

  test('Verify Project Switch Updates Relevant Sections', async ({ page }) => {
    await project.selectProject('Project A');
    const sprintA = await project.getSprintName();
    await project.selectProject('Project B');
    const sprintB = await project.getSprintName();
    expect(sprintA).not.toEqual(sprintB);
  });

  test('Verify Global Sections Remain Unchanged', async ({ page }) => {
    await project.navigateToDashboard();
    const oldDashboardText = await page.locator('h1:has-text("Dashboard")').innerText();
    await project.selectProject('Project B');
    const newDashboardText = await page.locator('h1:has-text("Dashboard")').innerText();
    expect(newDashboardText).toEqual(oldDashboardText);
  });

  test('Verify Default Project Selection on Login', async ({ page }) => {
    await project.selectProject('Project B');
    await login.logout();
    await login.login("sathsarawijerathna21@gmail.com", "Diwya@1234");
    const selectedProject = await project.getSelectedProject();
    expect(selectedProject).toContain('Project B');
  });

  test('Verify Loading Indicator on Project Switch', async ({ page }) => {
    await project.selectProject('Large Project');
    await expect(page.locator('[data-testid="loading-spinner"]')).toBeVisible();
    await expect(page.locator('[data-testid="loading-spinner"]')).toBeHidden({ timeout: 10000 });
  });

  test('Verify Dropdown Lists Only Assigned Projects', async ({ page }) => {
    const projectList = await project.getProjectDropdownList();
    expect(projectList).toEqual(expect.arrayContaining(['Project A', 'Project B']));
    expect(projectList).not.toContain('Unassigned Project');
  });

  test('Verify Project Persistence After Page Refresh', async ({ page }) => {
    await project.selectProject('Project A');
    await page.reload();
    const selectedProject = await project.getSelectedProject();
    expect(selectedProject).toContain('Project A');
  });
});
