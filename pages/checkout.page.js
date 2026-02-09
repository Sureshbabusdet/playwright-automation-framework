
import { expect } from '@playwright/test';
import { BasePage } from "./base.page.js";

export class CheckoutPage extends BasePage {
    // Check if checkout information page is visible (all required fields present)
    async isCheckoutInformationVisible() {
      return (
        await this.firstNameInput.isVisible() &&
        await this.lastNameInput.isVisible() &&
        await this.postalCodeInput.isVisible()
      );
    }
  constructor(page) {
    super(page);
    // Locators
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.inventoryItem = page.locator('.inventory_item_name');
    this.orderConfirmation = page.locator('.complete-header');
  }

  // ACTION METHODS

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
    await this.click(this.continueButton);
  }

  async clickContinueButton() {
    if (await this.continueButton.isVisible()) {
      await this.continueButton.click();
    } else {
      throw new Error('Continue button is not visible on the current page. Are you on the checkout information step?');
    }
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  // ASSERTION/VERIFICATION METHODS

  async isCheckoutOverviewVisible() {
    return (await this.inventoryItem.isVisible()) && (await this.finishButton.isVisible());
  }

  async isOrderCompleteVisible() {
    return await this.orderConfirmation.isVisible();
  }

  async isErrorMessageVisible() {
    const error = this.page.locator('[data-test="error"], h3:has-text("Error")');
    return await error.isVisible();
  }

  async getErrorMessage() {
    const error = this.page.locator('[data-test="error"], h3:has-text("Error")');
    if (await error.count() === 0) return '';
    return (await error.innerText()).trim();
  }

  async verifyCheckoutOverview(product) {
    const productName = await this.inventoryItem.innerText();
    if (product) expect(productName).toBe(product);
  }

  async verifyCheckoutComplete(orderConfirmationMessage) {
    const confirmationMessage = await this.orderConfirmation.innerText();
    if (orderConfirmationMessage) expect(confirmationMessage).toBe(orderConfirmationMessage);
    await this.page.screenshot({ path: 'reports/checkout-complete.png' });
  }
}
