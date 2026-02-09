import { BasePage } from './base.page.js';
import { expect } from '@playwright/test';

export class MenuPage extends BasePage {
  constructor(page) {
    super(page);
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutButton = page.getByText('Logout', { exact: false });
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async assertOnLoginPage() {
    await expect(this.page.locator('input[data-test="username"]')).toBeVisible();
    await expect(this.page).toHaveURL(/saucedemo\.com\/?$/);
  }
}
