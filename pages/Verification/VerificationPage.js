import { expect } from "@playwright/test";
import { exec } from "child_process";
import { URL } from "url";

export class VerificationPage {
  constructor(page) {
    this.page = page;
    this.otpInputs = page.locator('.w-12');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.resendButton = page.getByRole('button', { name: 'Resend' });
    this.verificationMessage = page.getByText('Please enter the complete');
    this.successMessage = page.getByText(/Account verification/i);
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async enterOTP(otpCode) {
    const otpDigits = otpCode.toString().split('');
    
    for (let i = 0; i < otpDigits.length && i < 6; i++) {
      await this.otpInputs.nth(i).fill(otpDigits[i]);
      console.log(`Filled OTP input ${i} with value: ${otpDigits[i]}`);
    }
  }

  async clearOTP() {
    for (let i = 0; i < 6; i++) {
      await this.otpInputs.nth(i).fill('');
    }                         
  }

  async submitOTP() {
    await this.continueButton.click();
  }

  async resendOTP() {
    await this.resendButton.click();
  }

  async verifyOTPInputsVisible(otpInputs) {
    for (let i = 0; i < 6; i++) {
      await expect(otpInputs.nth(i)).toBeVisible();
    }
  }

  async verifySuccessfulVerification() {
    await this.page.waitForURL('/login');
    expect(this.page.url()).toContain('/login');
    this.page.on('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await expect(dialog.message()).toContain('Account verification successful');
      
    });
  }

}
