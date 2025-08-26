exports.LoginPageLoginPage=class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async navigateToLogin() {
<<<<<<< HEAD
        await this.page.goto('https://app.affooh.com/login');
=======
        await this.page.goto('/login');
>>>>>>> 683c46bb0ce3368852e59d209ed67ed53b471515
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        
    }
}
