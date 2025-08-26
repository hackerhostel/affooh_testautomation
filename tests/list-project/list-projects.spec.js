import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/LoginPage.js';
import { ListProject } from '../../pages/listproject/listproject.js';

test.describe('Project List in Sidebar', () => {
  let list;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    sidebar = new ListProject(page);

    await login.login('sathsarawijerathna21@gmail.com', 'Diwya@1234');
    await page.waitForLoadState('networkidle'); // wait for full load
  });

  test('TC1 - Projects are visible in left nav', async ({ page }) => {
    const projects = await sidebar.getProjectNames();
    expect(projects.length).toBeGreaterThan(0);
  });

  test('TC2 - Projects sorted A-Z', async ({ page }) => {
    const projects = await sidebar.getProjectNames();
    const sorted = [...projects].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    expect(projects).toEqual(sorted);
  });

  test('TC3 - Empty state shows correct message', async ({ page }) => {
    // Simulate this on a fresh account or after deleting all projects manually
    const visible = await sidebar.noProjectMsg.isVisible();
    expect(visible).toBe(true);
  });

  test('TC4 - Sorting is case-insensitive', async ({ page }) => {
    const projects = await sidebar.getProjectNames();
    const lowerSorted = [...projects].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    expect(projects).toEqual(lowerSorted);
  });

  test('TC5 - Sorting respects special characters/numbers', async ({ page }) => {
    const projects = await sidebar.getProjectNames();
    const asciiSorted = [...projects].sort(); // default JS sort = Unicode/ASCII
    expect(projects).toEqual(asciiSorted);
  });

  test('TC6 - Project list updates without refresh', async ({ page }) => {
    const newProject = {
      prefix: 'AUTO01',
      name: 'New Project',
      type: '1'
    };
    await sidebar.createProject(newProject);
    await expect(page.getByText('New Project')).toBeVisible();
  });

  test('TC7 - Long project name is truncated', async ({ page }) => {
    const longName = 'ThisIsAnExtremelyLongProjectNameToTestUITruncationHandling';
    const exists = await sidebar.isProjectVisible(longName);
    expect(exists).toBeTruthy();

    // Optionally verify styling like ellipsis via CSS
    const truncatedStyle = await page.locator(`[data-testid="project-list-item"]:has-text("${longName}")`).evaluate(el =>
      window.getComputedStyle(el).textOverflow
    );
    expect(truncatedStyle).toMatch(/ellipsis|clip/);
  });
});
