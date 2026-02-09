import { test, expect } from '../../fixtures/custom-fixtures.js';
import testData from "../../fixtures/test-data.json";
import { LoginPage } from "../../pages/login.page.js";
import { CartPage } from "../../pages/cart.page.js";

test.describe('Cart Page Flows', () => {
  let loginPage, cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    await loginPage.login(testData.username, testData.password);
    await loginPage.assertLoginSuccess();
    console.log('[Setup] User logged in and CartPage initialized');
  });

  test('@smoke @regression TC201 - Verify the cart page after user added product to the cart', async ({ page }) => {
    // Add product and verify cart
    await cartPage.addProductToCart(testData.product);
    await cartPage.verifyProductInCart(testData.product);
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts.some(item => item.includes(testData.product))).toBeTruthy();
    expect(await cartPage.isRemoveButtonVisible()).toBeTruthy();
    expect(await cartPage.isContinueShoppingButtonVisible()).toBeTruthy();
    expect(await cartPage.isCheckoutButtonVisible()).toBeTruthy();
    console.log('[Assert] Cart page details verified');
  });

  test('@regression TC202 - Verify the page after user clicks on Checkout button from cart page', async ({ page }) => {
    // Add product and go to checkout
    await cartPage.addProductToCart(testData.product);
    await cartPage.verifyProductInCart(testData.product);
    expect(await cartPage.isCheckoutButtonVisible()).toBeTruthy();
    await cartPage.clickCheckoutButton();
    expect(await cartPage.isCheckoutInformationVisible()).toBeTruthy();
    console.log('[Assert] Checkout: Your Information page is displayed');
  });

  test('@sanity TC203 - Verify the page after user clicks on Remove button from cart page', async ({ page }) => {
    // Add and remove product, verify cart is empty
    await cartPage.addProductToCart(testData.product);
    await cartPage.verifyProductInCart(testData.product);
    await cartPage.removeProductFromCart(testData.product);
    expect(await cartPage.isCartEmpty()).toBeTruthy();
    await page.screenshot({ path: 'reports/empty-cart.png' });
    console.log('[Assert] Product removed and cart is empty');
  });

  test.afterEach(async () => {
    console.log('[Teardown] Test completed for Cart Page Flow');
  });
});
