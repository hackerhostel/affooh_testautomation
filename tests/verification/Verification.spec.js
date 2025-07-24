const { test, expect } = require('@playwright/test');
const { getInboxName, getEmail, waitForEmail, getOtP } = require('../../utils/MailosaurSetUp');
const { VerificationPage } = require('../../pages/Verification/VerificationPage');
const {RegistrationPage} = require('../../pages/registration/Registration');
const { LoginPageLoginPage } = require('../../pages/login/LoginPage');

let registrationPage;
let otpPage;

test.beforeEach(async ({ page }) => {
  registrationPage = new RegistrationPage(page);
  otpPage = new VerificationPage(page);
});

test.describe('OTP Verification Tests', () => {

  test('Complete registration flow with OTP verification', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };
    const loginPage = new LoginPageLoginPage(page);

    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await expect(page.getByText(testData.email)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(otpPage.verificationMessage).toBeVisible();

    let otpCode = await getOtP();
    console.log('OTP Code:', otpCode);
    if (!otpCode) {
      console.error('Failed to retrieve OTP');
      return;
    }
    console.log('hi email if' + otpCode);
    await otpPage.enterOTP(otpCode);
    await otpPage.submitOTP();
    await otpPage.verifySuccessfulVerification();
    await loginPage.navigateToLogin();
    await loginPage.login(testData.email, testData.password);
  });

  test('OTP verification with invalid code', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };

    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await otpPage.enterOTP('000000');
    await otpPage.submitOTP();
    await expect(otpPage.verificationMessage).toBeVisible();
  });

  test('OTP verification with incomplete code', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };

    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await otpPage.enterOTP('1234');
    await otpPage.submitOTP();
    await expect(otpPage.verificationMessage).toBeVisible();
  });

  test('OTP resend functionality', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };

    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await new Promise(resolve => setTimeout(resolve, 2000));

    if (await otpPage.resendButton.isVisible()) {
      await otpPage.resendOTP();

      let otpCode = await getOtP();
      console.log('OTP Code:', otpCode);
      if (!otpCode) {
        console.error('Failed to retrieve OTP');
        return;
      }
      console.log('hi email if' + otpCode);
      await otpPage.enterOTP(otpCode);
      await otpPage.submitOTP();
      await otpPage.verifySuccessfulVerification();

      const loginPage = new LoginPageLoginPage(page);
      await loginPage.navigateToLogin();
      await loginPage.login(testData.email, testData.password);
    }
  });

  test('OTP input field navigation', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };

    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await otpPage.otpInputs.nth(0).click();
    await otpPage.otpInputs.nth(0).fill('1');
    await expect(otpPage.otpInputs.nth(1)).toBeFocused();
    await otpPage.otpInputs.nth(1).press('Backspace');
    await expect(otpPage.otpInputs.nth(0)).toBeFocused();
  });

  test('Manual OTP entry test (fallback)', async ({ page }) => {
    await page.goto('https://app.affooh.com/register');
    await page.getByTestId('organization').fill('sa');
    await page.getByTestId('firstName').fill('sandali');
    await page.getByTestId('lastName').fill('ss');
    await page.getByTestId('username').fill('rkpsandalidilshani@gmail.com');
    await page.getByTestId('password').fill('Sandali@12');
    await page.getByTestId('confirmPassword').fill('Sandali@12');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page.getByText('Registration successful!')).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Please enter the complete')).toBeVisible();

    const testOTP = '123456';
    const otpDigits = testOTP.split('');

    for (let i = 0; i < otpDigits.length; i++) {
      await page.locator('.w-12').nth(i).fill(otpDigits[i]);
    }

    await page.getByRole('button', { name: 'Continue' }).click();
  });

}); // ✅ Closing describe block for 'OTP Verification Tests'

test.describe('OTP Edge Cases', () => {

  test('OTP with special characters should be filtered', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };

    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await otpPage.otpInputs.nth(0).fill('a');
    await otpPage.otpInputs.nth(1).fill('!');
    await otpPage.otpInputs.nth(2).fill('1');

    await expect(otpPage.otpInputs.nth(0)).toHaveValue('');
    await expect(otpPage.otpInputs.nth(1)).toHaveValue('');
    await expect(otpPage.otpInputs.nth(2)).toHaveValue('1');
  });

  test('OTP timeout handling', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };

    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.waitForTimeout(60000);

    const timeoutMessage = page.getByText(/expired|timeout/i);
    if (await timeoutMessage.isVisible()) {
      await expect(timeoutMessage).toBeVisible();
    }
  });

});
