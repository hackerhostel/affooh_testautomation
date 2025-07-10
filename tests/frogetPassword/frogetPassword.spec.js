import { test, expect } from '@playwright/test';
 
import { ForgotPasswordPage } from '../../pages/frogetPassword/frogetPassword';

test.describe('Forgot Password Flow', () => {
  let forgotPage;

  test.beforeEach(async ({ page }) => {
    forgotPage = new ForgotPasswordPage(page);
    await forgotPage.goto();
  });

  test('Navigate to forgot password screen', async () => {
    await expect(forgotPage.emailInput).toBeVisible();
  });

  test('Show error on empty email', async () => {
    await forgotPage.enterEmail('');
    await expect(forgotPage.page.getByText(/Email is required/i)).toBeVisible();
  });

  test('Show error on invalid email format', async () => {
    await forgotPage.enterEmail('invalid-email');
    await expect(forgotPage.page.getByText(/Invalid email/i)).toBeVisible();
  });

  test('Send code to valid email', async () => {
    await forgotPage.enterEmail('csmenike6@gmail.com');
    await expect(forgotPage.page.getByText(/Verification code has been/i)).toBeVisible();
  });

  test('Fill incorrect OTP and verify error', async () => {
    await forgotPage.enterEmail('csmenike6@gmail.com');
    await expect(forgotPage.page.getByText(/Verification code has been/i)).toBeVisible();
    await forgotPage.fillOtp('123456');
    await expect(forgotPage.page.getByText(/Invalid verification code/i)).toBeVisible();
  });

  test('Show error when passwords do not match', async () => {
    await forgotPage.enterEmail('csmenike6@gmail.com');
    await forgotPage.fillOtp('123456');
    await forgotPage.resetPassword('Test@1234', 'Different@123');
    await expect(forgotPage.page.getByText(/Passwords must match/i)).toBeVisible();
  });

  test('Show error when password is too weak', async () => {
    await forgotPage.enterEmail('csmenike6@gmail.com');
    await forgotPage.fillOtp('123456');
    await forgotPage.resetPassword('123', '123');
    await expect(forgotPage.page.getByText(/Password must be at least 8 characters/i)).toBeVisible();
  });

  test('Successfully reset password with valid inputs (dummy)', async () => {
    await forgotPage.enterEmail('csmenike6@gmail.com');
    await forgotPage.fillOtp('123456'); 
    await forgotPage.resetPassword('Test@1234', 'Test@1234');
    await expect(forgotPage.page.getByText(/Password reset successful/i)).toBeVisible(); 
  });
});
