// pages/RegistrationPage.js
export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.orgInput = page.getByTestId('organization');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.confirmPasswordInput = page.getByTestId('confirmPassword');
    this.otpInput = page.getByTestId('otp');
    this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
    this.verifyButton = page.getByRole('button', { name: /Verify|Submit/i });
  }

  async gotoRegistration() {
    await this.page.goto('https://dev-app.affooh.com/login');
    await this.page.getByText('Register Now').click();
  }

  async fillRegistrationForm({ organization, firstName, lastName, email, password, confirmPassword }) {
    await this.orgInput.fill(organization);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    if (email) await this.usernameInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword ?? password);
  }

  async submit() {
    await this.signUpButton.click();
  }

  async fillOtp(otp) {
    await this.otpInput.fill(otp);
    await this.verifyButton.click();
  }
}
