import { test, expect } from '../../fixtures/custom-fixtures.js';
import testData from "../../fixtures/test-data.json";
import { LoginPage } from "../../pages/login.page.js";

test.describe('Login Page Flows', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    console.log('[Setup] LoginPage initialized');
  });

  test('@smoke @regression TC101 - Verify successful login with valid credentials', async ({ page }) => {
    await loginPage.login(testData.username, testData.password);
    await loginPage.assertLoginSuccess();
    expect(await loginPage.isLogoutButtonVisible()).toBeTruthy();
    console.log('[Assert] User successfully logged in');
  });

  test('@regression TC102 - Verify error message with invalid credentials', async ({ page }) => {
    await loginPage.login('invalidUser', 'invalidPass');
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Username and password do not match');
    console.log('[Assert] Error message displayed for invalid login');
  });

  test('@sanity TC103 - Verify logout functionality', async ({ page }) => {
    await loginPage.login(testData.username, testData.password);
    await loginPage.assertLoginSuccess();
    await loginPage.logout();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
    console.log('[Assert] User successfully logged out');
  });

  test.afterEach(async () => {
    console.log('[Teardown] Test completed for Login Page Flow');
  });
});

