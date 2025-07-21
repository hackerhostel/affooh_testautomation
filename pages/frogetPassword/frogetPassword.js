// pages/ForgotPasswordPage.js
export class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByTestId('email');
    this.sendCodeButton = page.getByRole('button', { name: 'Send Code' });
    this.otpInputs = page.locator('input[type="text"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.newPasswordInput = page.getByTestId('newPassword');
    this.confirmPasswordInput = page.getByTestId('confirmPassword');
    this.resetPasswordButton = page.getByRole('button', { name: 'Reset Password' });
  }

  async goto() {
    await this.page.goto('/login');
    await this.page.getByRole('link', { name: 'Forgot password' }).click();
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
    await this.sendCodeButton.click();
  }

  async fillOtp(otp) {
    for (let i = 0; i < otp.length; i++) {
      await this.otpInputs.nth(i).fill(otp[i]);
    }
    await this.continueButton.click();
  }

  async resetPassword(password, confirmPassword) {
    await this.newPasswordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.resetPasswordButton.click();
  }
}
