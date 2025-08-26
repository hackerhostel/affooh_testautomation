exports.ListProject = class ListProject {
  constructor(page) {
    this.page = page;
    this.projectItems = page.locator('[data-testid="project-list-item"]'); // Adjust based on actual DOM
    this.noProjectMessage = page.locator('text=No projects found'); // Change to match exact message
    this.addNewButton = page.getByText('Add New');
    this.prefixInput = page.getByTestId('prefix');
    this.nameInput = page.getByTestId('name');
    this.projectTypeSelect = page.getByTestId('projectType');
    this.createButton = page.getByRole('button', { name: 'Create' });
  }

  async getProjectNames() {
    return await this.projectItems.allTextContents();
  }

  async isProjectVisible(name) {
    return this.page.getByText(name, { exact: true }).isVisible();
  }

  async createProject({ prefix, name, type = '1' }) {
    await this.addNewButton.click();
    await this.prefixInput.fill(prefix);
    await this.nameInput.fill(name);
    await this.projectTypeSelect.selectOption(type); // '1' = Scrum, '2' = Kanban
    await this.createButton.click();
  }
};
