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
}
