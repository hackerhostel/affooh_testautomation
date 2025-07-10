import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration/Registration';

test.describe('Registration & Login', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.gotoRegistration();
  });

  test('Navigate to registration screen', async () => {
    await expect(registrationPage.orgInput).toBeVisible();
    await expect(registrationPage.firstNameInput).toBeVisible();
    await expect(registrationPage.lastNameInput).toBeVisible();
    await expect(registrationPage.usernameInput).toBeVisible();
    await expect(registrationPage.passwordInput).toBeVisible();
    await expect(registrationPage.confirmPasswordInput).toBeVisible();
  });

  test('Register successfully with valid details', async () => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'Dilshani',
      email: `rkpsandalidilshani+${Date.now()}@mail.com`,
      password: 'Sandali@12',
    };
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(registrationPage.page.getByText(/OTP Verification/i)).toBeVisible();
  });

  test('Registration fails if email is missing', async () => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'Dilshani',
      password: 'Sandali@12',
    };
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(registrationPage.page.getByText(/Email is required|missing/i)).toBeVisible();
  });

  test('Password and Confirm Password mismatch', async () => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'Dilshani',
      email: `rkpsandalidilshani+${Date.now()}@mail.com`,
      password: 'Sandali@12',
      confirmPassword: 'Sandali@13',
    };
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await expect(registrationPage.page.getByText(/Passwords must match/i)).toBeVisible();
  });

  test('Error if organization already exists', async () => {
    const org = 'org-duplicate';
    const now = Date.now();
    const email1 = `rkpsandalidilshani+dup1@${now}.com`;
    const email2 = `rkpsandalidilshani+dup2@${now}.com`;

    await registrationPage.fillRegistrationForm({
      organization: org,
      firstName: 'sandali',
      lastName: 'Dilshani',
      email: email1,
      password: 'Sandali@12',
    });
    await registrationPage.submit();

    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm({
      organization: org,
      firstName: 'sandali',
      lastName: 'Dilshani',
      email: email2,
      password: 'Sandali@12',
    });
    await registrationPage.submit();
    await expect(registrationPage.page.getByText(/Organization is already registered/i)).toBeVisible();
  });

  test('Error if email already in use', async () => {
    const now = Date.now();
    const email = `rkpsandalidilshani+dup@${now}.com`;

    await registrationPage.fillRegistrationForm({
      organization: 'org1',
      firstName: 'sandali',
      lastName: 'Dilshani',
      email,
      password: 'Sandali@12',
    });
    await registrationPage.submit();

    await registrationPage.gotoRegistration();
    await registrationPage.fillRegistrationForm({
      organization: 'org2',
      firstName: 'sandali',
      lastName: 'Dilshani',
      email,
      password: 'Sandali@12',
    });
    await registrationPage.submit();
    await expect(registrationPage.page.getByText(/Email is already registered/i)).toBeVisible();
  });

  test('Invalid OTP entry shows error', async () => {
    const testData = {
      organization: 'org' + Date.now(),
      firstName: 'sandali',
      lastName: 'Dilshani',
      email: `rkpsandalidilshani+otp@${Date.now()}.com`,
      password: 'Sandali@12',
    };
    await registrationPage.fillRegistrationForm(testData);
    await registrationPage.submit();
    await registrationPage.fillOtp('123456');
    await expect(registrationPage.page.getByText(/Invalid OTP/i)).toBeVisible();
  });

  test('Invalid email formats are rejected', async () => {
    await registrationPage.fillRegistrationForm({
      organization: 'org-invalid',
      firstName: 'sandali',
      lastName: 'Dilshani',
      email: 'invalidemail',
      password: 'Sandali@12',
    });
    await registrationPage.submit();
    await expect(registrationPage.page.getByText(/Email must be valid/i)).toBeVisible();
  });

  test('Weak passwords are rejected', async () => {
    await registrationPage.fillRegistrationForm({
      organization: 'org-weak',
      firstName: 'sandali',
      lastName: 'Dilshani',
      email: `rkpsandalidilshani+weak@${Date.now()}.com`,
      password: '123456',
    });
    await registrationPage.submit();
    await expect(registrationPage.page.getByText(/Password must be at least 8 characters/i)).toBeVisible();
  });
});
