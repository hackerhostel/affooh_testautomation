// deleteproject.js (Page Object)

export class DeleteProjectPage {
  /**
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
    this.projectMenuDots = (projectName) =>
      page.locator(`text=${projectName}`).locator('..').locator('button[aria-label="Project options"]');
    this.contextMenu = page.locator('ul[role="menu"]');
    this.deleteOption = page.locator('text=Delete');
  }

  async openProjectMenu(projectName) {
    await this.projectMenuDots(projectName).click();
    await this.contextMenu.waitFor({ state: 'visible' });
  }

  async isDeleteOptionVisible() {
    return await this.deleteOption.isVisible();
  }

  async isDeleteOptionEnabled() {
    return await this.deleteOption.isEnabled();
  }

  async deleteProject() {
    await this.deleteOption.click();
    // Confirm deletion if confirmation dialog appears
    const confirmBtn = this.page.getByRole('button', { name: /confirm/i });
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
    }
  }
}
