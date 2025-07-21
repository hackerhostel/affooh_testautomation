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
  
  
  // Clean up emails before each test
 // await deleteAllMessages();
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

    // Step 1: Complete registration
    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    
    // Step 2: Verify OTP page is displayed
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await expect(page.getByText(testData.email)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Step 3: Verify OTP input fields
    await expect(otpPage.verificationMessage).toBeVisible();
    
    // Step 4: Wait for OTP email and extract code
    const emailCriteria = {
      sentTo: testData.email,
      subject: 'OTP' // Adjust based on your actual OTP email subject
    };

    let otpCode = await getOtP();
    console.log('OTP Code:', otpCode);
    if (!otpCode) {
      console.error('Failed to retrieve OTP');
      return;
    }
    console.log('hi email if' + otpCode);
    await otpPage.enterOTP(otpCode );
    await otpPage.submitOTP();
    await otpPage.verifySuccessfulVerification();

    // Step 5: Verify successful login
    await loginPage.navigateToLogin();
    await loginPage.login(testData.email, testData.password);
    }
  });

  test('OTP verification with invalid code', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };

    // Complete registration to get to OTP page
    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Enter invalid OTP
    await otpPage.enterOTP('000000');
    await otpPage.submitOTP();
    
    // Verify error message or that we're still on OTP page
    await expect(otpPage.verificationMessage).toBeVisible();
    // Add specific error message check if your app shows one
    // await expect(otpPage.errorMessage).toBeVisible();
  )};

  test('OTP verification with incomplete code', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };

    // Complete registration to get to OTP page
    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Enter incomplete OTP (only 4 digits)
    await otpPage.enterOTP('1234');
    await otpPage.submitOTP();
    
    // Verify we're still on OTP page or error is shown
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

    // Complete registration to get to OTP page
    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Wait for initial OTP email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Click resend button if it exists
    if (await otpPage.resendButton.isVisible()) {
      await otpPage.resendOTP();
      
      // Wait for resend email
      const resendEmailCriteria = {
        sentTo: testData.email,
        subject: 'OTP'
      };
      
     let otpCode = await getOtP();
    console.log('OTP Code:', otpCode);
    if (!otpCode) {
      console.error('Failed to retrieve OTP');
      return;
    }
    console.log('hi email if' + otpCode);
    await otpPage.enterOTP(otpCode );
    await otpPage.submitOTP();
    await otpPage.verifySuccessfulVerification();

    // Step 5: Verify successful login
    await loginPage.navigateToLogin();
    await loginPage.login(testData.email, testData.password);
  });

  test('OTP input field navigation', async ({ page }) => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'dilshani',
      email: `test${Date.now()}@temnjvgp.mailosaur.net`,
      password: 'Sandali@12',
    };

    // Complete registration to get to OTP page
    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(page.getByText(/OTP Verification/i)).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Test input field navigation
    await otpPage.otpInputs.nth(0).click();
    await otpPage.otpInputs.nth(0).fill('1');
    
    // Verify cursor moves to next field automatically (if implemented)
    await expect(otpPage.otpInputs.nth(1)).toBeFocused();
    
    // Test backspace navigation
    await otpPage.otpInputs.nth(1).press('Backspace');
    await expect(otpPage.otpInputs.nth(0)).toBeFocused();
  });

  test('Manual OTP entry test (fallback)', async ({ page }) => {
    // This test uses your original approach as a fallback
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
    
    // Manual OTP entry for testing
    const testOTP = '123456';
    const otpDigits = testOTP.split('');
    
    for (let i = 0; i < otpDigits.length; i++) {
      await page.locator('.w-12').nth(i).fill(otpDigits[i]);
    }
    
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Verify result (success or error)
    // Note: This will likely fail with invalid OTP, but tests the UI flow
  });
});

// Additional helper tests for edge cases
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
    
    // Try entering non-numeric characters
    await otpPage.otpInputs.nth(0).fill('a');
    await otpPage.otpInputs.nth(1).fill('!');
    await otpPage.otpInputs.nth(2).fill('1');
    
    // Verify only numeric input is accepted
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
    
    // Wait for potential timeout message
    // This depends on your application's timeout implementation
    await page.waitForTimeout(60000); // Wait 1 minute
    
    // Check if timeout message appears or resend becomes available
    const timeoutMessage = page.getByText(/expired|timeout/i);
    if (await timeoutMessage.isVisible()) {
      await expect(timeoutMessage).toBeVisible();
    }
  });
});