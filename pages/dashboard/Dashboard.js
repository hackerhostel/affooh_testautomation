// pages/DashboardPage.js
export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.profileButton = page.getByRole('button', { name: 'CM' }); 
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Log Out' });

  }

  async logout() {
    await this.profileButton.click();
    await this.logoutMenuItem.click();
  }
   async goToSprints() {
    await this.clickNavIcon(0);
    await this.page.getByText('Sprints').click();
    await expect(this.page).toHaveURL(/.*sprint/i);
  }

  async goToTestPlan() {
    await this.page.locator('a:nth-child(3)').click();
    await this.page.getByText('Test plan', { exact: true }).click();
    await expect(this.page).toHaveURL(/.*test-plan/i);
  }

  async goToReleases() {
    await this.page.locator('a:nth-child(4)').click();
    await this.page.getByText('Releases').click();
    await expect(this.page).toHaveURL(/.*release/i);
  }

  async goToAllProjects() {
    await this.page.locator('a:nth-child(5)').click();
    await this.page.getByText('All Projects').click();
    await expect(this.page).toHaveURL(/.*projects/i);
  }

  async goToUsers() {
    await this.page.locator('a:nth-child(6)').click();
    await this.page.waitForURL('/profile');
  }

  async openProfileMenu() {
    await this.page.getByRole('button', { name: 'CM' }).click();
  }
}
