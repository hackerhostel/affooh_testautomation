import { test, expect } from '@playwright/test';
import { UserManagementPage } from '../../pages/userManagement/UserManagement';
import { LoginPageLoginPage } from '../../pages/login/LoginPage.js';

let context;
let page;
let userManagement;
let login;

test.describe('User Management Tests', () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    login = new LoginPageLoginPage(page);
    await login.navigateToLogin();
    await login.login('csmenike6@gmail.com', 'Chandima@123');
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard'); 
  });

  test.beforeEach(async () => {
    userManagement = new UserManagementPage(page);
    await userManagement.gotoUserManagementPage();
  });

  test('valid user management page', async () => {
    await expect(page).toHaveURL('/profile');
  });

  test('user list is visible',async()=>{
    const user=await userManagement.getUserList();
    
  })

  test('remove user',async()=>{
    await userManagement.removeUser(0);
    await expect(page.getByText('Are you Sure')).toBeVisible();
  })
  
  test.afterAll(async () => {
    await context.close(); 
  });
});
