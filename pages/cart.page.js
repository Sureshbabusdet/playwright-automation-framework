
import { BasePage } from './base.page.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
    this.productName = page.locator('.inventory_item_name');
    this.removeButton = page.locator('button:has-text("Remove")');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
    this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.postalCodeInput = page.locator('input[placeholder="Zip/Postal Code"]');
  }


  getProductLocator(productName) {
    return this.page.locator(`//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${productName}']]`);
  }

  getAddToCartButton(productName) {
    return this.page.locator(`//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${productName}']]//button[contains(text(),'Add to cart')]`);
  }

  async addProductToCart(productName) {
    const addToCartBtn = this.getAddToCartButton(productName);
    await this.click(addToCartBtn);
  }


  async openCart() {
    await this.click(this.cartIcon);
  }


  async verifyProductInCart(productName) {
    await this.openCart();
    await this.page.locator(`.cart_item:has-text("${productName}")`).waitFor();
  }


  async getCartProducts() {
    return await this.cartItems.allTextContents();
  }


  async removeProductFromCart(productName) {
    await this.openCart();
    const removeBtn = this.page.locator(`//div[contains(@class,'cart_item') and .//div[contains(@class,'inventory_item_name') and text()='${productName}']]//button[contains(text(),'Remove')]`);
    await this.click(removeBtn);
  }

  async isRemoveButtonVisible() {
    return await this.isVisible(this.removeButton);
  }

  async isContinueShoppingButtonVisible() {
    return await this.isVisible(this.continueShoppingButton);
  }

  async isCheckoutButtonVisible() {
    return await this.isVisible(this.checkoutButton);
  }

  async clickCheckoutButton() {
    await this.click(this.checkoutButton);
  }

  async isCartEmpty() {
    return (await this.cartItems.count()) === 0;
  }

  async isCheckoutInformationVisible() {
    return (
      await this.isVisible(this.firstNameInput) &&
      await this.isVisible(this.lastNameInput) &&
      await this.isVisible(this.postalCodeInput)
    );
  }
}
