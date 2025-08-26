exports.ProjectDetailsPage = class ProjectDetailsPage {
  constructor(page) {
    this.page = page;
    this.projectsTab = page.locator('a[href="/projects"]');
    this.projectMenuIcon = page.locator('button[aria-label="Project Options"]'); // Update selector as per UI
    this.editOption = page.getByRole('menuitem', { name: 'Edit Project Details' });
  }

  async navigateToProjectPage() {
    await this.projectsTab.click();
    await this.page.waitForURL(/.*\/projects/);
  }

  async openProjectMenu() {
    await this.projectMenuIcon.first().click(); // assumes first project
  }

  async openEditProjectDialog() {
    await this.openProjectMenu();
    await this.editOption.click();
    await this.page.waitForSelector('text=Edit Project Details'); // dialog appears
  }
};
