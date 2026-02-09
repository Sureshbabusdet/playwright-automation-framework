
import { expect } from "@playwright/test";
import testData from "../fixtures/test-data.json";
import { BasePage } from "./base.page.js";


class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.inventoryList = page.locator('.inventory_list');
  }

  // ACTION METHODS

  async nagivateToSauceDemoSite() {
    await this.navigateTo(testData.baseURL);
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async clearCredentials() {
    await this.fill(this.usernameInput, '');
    await this.fill(this.passwordInput, '');
  }

  async logout() {
    const menuButton = this.page.locator('button[aria-label="Open Menu"], #react-burger-menu-btn, [data-test="react-burger-menu-btn"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
    const logoutLink = this.page.locator('a#logout_sidebar_link, a:has-text("Logout")');
    await logoutLink.click();
    await this.page.waitForSelector('#login-button', { state: 'visible' });
  }

  // ASSERTION/VERIFICATION METHODS

  async isLogoutButtonVisible() {
    const menuButton = this.page.locator('button[aria-label="Open Menu"], #react-burger-menu-btn, [data-test="react-burger-menu-btn"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
    const logoutLink = this.page.locator('a#logout_sidebar_link, a:has-text("Logout")');
    return await logoutLink.isVisible();
  }

  async isErrorMessageVisible() {
    const error = this.page.locator('[data-test="error"], h3:has-text("Epic sadface")');
    return await error.isVisible();
  }

  async getErrorMessage() {
    const error = this.page.locator('[data-test="error"], h3:has-text("Epic sadface")');
    if (await error.count() === 0) return '';
    return (await error.innerText()).trim();
  }

  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }

  async getLoginErrorText() {
    const error = this.page.locator('[data-test="error"]');
    if (await error.count() === 0) return '';
    return (await error.innerText()).trim();
  }

  async navigateToSauceDemoSite() {
    return this.nagivateToSauceDemoSite();
  }

  async verifyLoginSuccess() {
    await this.inventoryList.waitFor({ state: 'visible' });
    const title = await this.page.title();
    console.log('Page Title after login:', title);
    await this.page.screenshot({ path: 'reports/login-success.png' });
  }

  async assertLoginSuccess() {
    await expect(this.inventoryList).toBeVisible();
  }

  async assertLoginErrorPresent() {
    const err = await this.getLoginErrorText();
    expect(err).toBeTruthy();
  }

  async assertLoginErrorContains(expectedSubstring) {
    const err = await this.getLoginErrorText();
    expect(err.toLowerCase()).toContain(expectedSubstring.toLowerCase());
  }

  async assertRequiredFieldError(expectedMessage) {
    const err = await this.getLoginErrorText();
    expect(err).toBeTruthy();
    if (expectedMessage) {
      expect(err).toContain(expectedMessage);
    } else {
      expect(err.toLowerCase()).toMatch(/username|password/);
    }
  }

  async assertLockedOutError(expectedMessage) {
    const err = await this.getLoginErrorText();
    expect(err).toBeTruthy();
    if (expectedMessage) {
      expect(err).toContain(expectedMessage);
    } else {
      expect(err.toLowerCase()).toContain('locked');
    }
  }
}


export { LoginPage };

