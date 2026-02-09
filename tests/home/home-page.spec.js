import { test, expect } from '../../fixtures/custom-fixtures.js';
import { LoginPage } from '../../pages/login.page.js';
import { CartPage } from '../../pages/cart.page.js';
import { MenuPage } from '../../pages/menu.page.js';
import { ProductsPage } from '../../pages/products.page.js';
import testData from '../../fixtures/test-data.json';

test.describe('Home Page Flows', () => {
  let loginPage, cartPage, menuPage, productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.login(testData.username, testData.password);
  });

  test('@regression @sanity Footer - Verify the footer in the Home page', async ({ page }) => {
    await productsPage.scrollToFooter();
    await productsPage.assertFooterYear();
    await productsPage.assertSocialLinksVisible();
    await productsPage.assertSocialLinksNavigable();
  });

  test('@smoke @regression Logout - Verify whether user is able to logout from Home page', async ({ page }) => {
    await menuPage.openMenu();
    await menuPage.logout();
    await menuPage.assertOnLoginPage();
  });

  test('@smoke @sanity Verify that user can add product to the cart from home page', async ({ page }) => {
    await cartPage.addProductToCart(testData.product);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    const removeBtn = page.locator(`//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${testData.product}']]//button[contains(text(),'Remove')]`);
    await expect(removeBtn).toBeVisible();
  });

  test('@sanity Verify that user lands on Home page after login', async ({ page }) => {
    await expect(page.locator('text=Swag Labs')).toBeVisible();
  });

  test('@regression Verify the user can remove the product from the cart', async ({ page }) => {
    await cartPage.addProductToCart(testData.product);
    await cartPage.removeProductFromCart(testData.product);
    const continueShoppingBtn = page.locator("button:has-text('Continue Shopping')");
    if (await continueShoppingBtn.isVisible()) {
      await continueShoppingBtn.click();
    }
    const addToCartBtn = page.locator(`//div[contains(@class,'inventory_item') and .//div[contains(@class,'inventory_item_name') and text()='${testData.product}']]//button[contains(text(),'Add to cart')]`);
    await expect(addToCartBtn).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});