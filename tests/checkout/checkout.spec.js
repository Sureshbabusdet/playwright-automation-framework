import { test, expect } from '../../fixtures/custom-fixtures.js';
import testData from '../../fixtures/test-data.json';
import { LoginPage } from '../../pages/login.page.js';
import { CartPage } from '../../pages/cart.page.js';
import { CheckoutPage } from '../../pages/checkout.page.js';


test.describe('Checkout Page Flows', () => {
  let loginPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Step 1: Login
    await loginPage.login(testData.username, testData.password);
    expect(await loginPage.inventoryList.isVisible()).toBeTruthy();
    console.log('[Debug] Login successful, inventory page loaded');

    // Step 2: Add product to cart
    await cartPage.addProductToCart(testData.product);
    // Confirm product is in cart
    await cartPage.openCart();
    const cartHasProduct = await page.locator('.cart_item:has-text("' + testData.product + '")').isVisible();
    expect(cartHasProduct).toBeTruthy();
    console.log('[Debug] Product added to cart and visible in cart');

    // Step 3: Click checkout
    expect(await cartPage.isCheckoutButtonVisible()).toBeTruthy();
    await cartPage.clickCheckoutButton();
    // Confirm checkout info page is visible
    expect(await checkoutPage.isCheckoutInformationVisible()).toBeTruthy();
    console.log('[Debug] Navigated to checkout information page');
  });

  test('@smoke @regression TC301 - Verify checkout information page', async ({ page }) => {
    expect(await checkoutPage.isCheckoutInformationVisible()).toBeTruthy();
    await checkoutPage.fillCheckoutInformation(testData.firstName, testData.lastName, testData.postalCode);
    expect(await checkoutPage.isCheckoutOverviewVisible()).toBeTruthy();
    console.log('[Assert] Checkout information and overview page verified');
  });

  test('@regression TC302 - Verify error on missing checkout info', async ({ page }) => {
    await checkoutPage.clickContinueButton();
    expect(await checkoutPage.isErrorMessageVisible()).toBeTruthy();
    expect(await checkoutPage.getErrorMessage()).toContain('Error');
    console.log('[Assert] Error message displayed for missing checkout info');
  });

  test('@sanity TC303 - Verify successful order completion', async ({ page }) => {
    await checkoutPage.fillCheckoutInformation(testData.firstName, testData.lastName, testData.postalCode);
    await checkoutPage.clickFinishButton();
    expect(await checkoutPage.isOrderCompleteVisible()).toBeTruthy();
    await page.screenshot({ path: 'reports/order-complete.png' });
    console.log('[Assert] Order completed and confirmation displayed');
  });

  test.afterEach(async () => {
    console.log('[Teardown] Test completed for Checkout Page Flow');
  });
});
