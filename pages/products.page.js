import { BasePage } from './base.page.js';
import { expect } from '@playwright/test';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.footer = page.locator('contentinfo');
    this.twitter = page.locator('a[href="https://twitter.com/saucelabs"]');
    this.facebook = page.locator('a[href="https://www.facebook.com/saucelabs"]');
    this.linkedin = page.locator('a[href="https://www.linkedin.com/company/sauce-labs/"]');
  }

  async scrollToFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async assertFooterYear() {
    const year = new Date().getFullYear();
    await expect(this.page.getByText(`© ${year} Sauce Labs`, { exact: false })).toBeVisible();
  }

  async assertSocialLinksVisible() {
    await expect(this.twitter).toBeVisible();
    await expect(this.facebook).toBeVisible();
    await expect(this.linkedin).toBeVisible();
  }

  async assertSocialLinksNavigable() {
    for (const link of [this.twitter, this.facebook, this.linkedin]) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  }
}
