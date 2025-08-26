exports.CreateProjectPage = class CreateProjectPage {
  constructor(page) {
    this.page = page;
    this.projectIcon = page.locator('a[href="/projects"]'); 
  }

  async navigateToProjectTab() {
    await this.projectIcon.click();
    await this.page.waitForURL(/.*\/projects/);
  }

};