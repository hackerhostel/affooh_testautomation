import { test, expect } from '@playwright/test';
import { LoginPageLoginPage } from '../../pages/login/LoginPage.js';

let login;
test.describe('Login Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        login =new LoginPageLoginPage(page)
        await login.navigateToLogin();
        
    });

    test('valid login', async ({ page }) => {
        await login.login('csmenike6@gmail.com', 'Chandima@123');
        await expect(page).toHaveURL('/dashboard');
    });

    test('invalid login', async ({ page }) => {
        await login.login('csmenike6@gmail.com', 'invalidPassword');
        await expect(page.getByText('Incorrect username or password.')).toBeVisible();
    });

    test('empty fields login', async ({ page }) => {
        await login.login('', '');
        await expect(page.getByText('username is a required field')).toBeVisible();
        await expect(page.getByText('password is a required field')).toBeVisible();

    });

    test('login with only username', async ({ page }) => {
        await login.login('csmenike6@gmail.com', '');
        await expect(page.getByText('password is a required field')).toBeVisible();
    });

    test('login with only password', async ({ page }) => {
        await login.login('', 'Chandima@123');
        await expect(page.getByText('username is a required field')).toBeVisible();
    });
});