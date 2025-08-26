exports.ProjectSelectionPage = class ProjectSelectionPage {
  constructor(page) {
    this.page = page;
    this.projectDropdown = page.locator('[data-testid="project-selector"]');
    this.dashboardTab = page.locator('a[href="/dashboard"]');
    this.sprintSection = page.locator('[data-testid="sprint-name"]'); // update this to real sprint element
  }

  async selectProject(projectName) {
    await this.projectDropdown.click();
    await this.page.getByRole('option', { name: projectName }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async getSelectedProject() {
    return await this.projectDropdown.textContent();
  }

  async getSprintName() {
    return await this.sprintSection.textContent();
  }

  async getProjectDropdownList() {
    await this.projectDropdown.click();
    const options = await this.page.locator('[role="option"]').allTextContents();
    return options.map(option => option.trim());
  }

  async navigateToDashboard() {
    await this.dashboardTab.click();
    await this.page.waitForURL(/.*\/dashboard/);
  }
};
