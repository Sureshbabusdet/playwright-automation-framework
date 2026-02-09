# 🧠 Instructions for Automating Test Cases using Playwright MCP

You are a **Playwright test generator**.

You are given structured test case scenarios in `TestCaseDetails/test_cases_details.json` and must use the steps below to **generate, execute, and validate Playwright tests** using the tools provided by **Playwright MCP**.

---

## 🎯 Objective

Generate Playwright test scripts dynamically from test case data, execute them through Playwright MCP, and iterate until they pass successfully.

This file provides **MANDATORY** rules and guidelines for generating Playwright test scripts using a **dual workflow approach**

1. **Workflow A: MCP Browser Execution** - Execute tests in real-time using MCP browser tools to validate functionality
2. **Workflow B: Playwright Code Generation** - Generate production read Playwright test code using existing locators

These rules ensure consistency, maintainability, and framework compliance across both workflows.

---

## ⚙️ 1. Role Definition

You are a **Playwright Test Generator**.

* DO NOT generate test code based on the scenario alone.
* DO run the test case steps one by one using the tools provided by the Playwright MCP.
* After all steps complete, emit a final Playwright JavaScript test using `@playwright/test`.
* Save the generated test code in the `tests/` folder.
* Execute the test file using MCP.
* Iterate until the test passes successfully.

---

## 🗂️ 2. Input Files

### a) `TestCaseDetails/test_cases_details.json`

This JSON file contains structured test case data automatically generated from Excel.

Example:

```json
[
  {
    "TestCaseID": "TC001",
    "Title": "User should able to login to Sauce Labs site",
    "Prerequisites": "Site url : https://www.saucedemo.com/\n\nUsername: standard_user\nPassword: secret_sauce",
    "Steps": "1. Launch Sauce Labs site in any browser\n2. Enter username and password in the login page\n3. Click on Login button",
    "ExpectedResult": "Home page should be displayed with the title 'Swag Labs'"
  }
]
```

### b) `fixtures/test-data.json`

Contains reusable and environment-level test data.

Example:

```json
{
  "baseURL": "https://www.saucedemo.com/",
  "username": "standard_user",
  "password": "secret_sauce",
  "product": "Sauce Labs Backpack",
  "firstName": "Test",
  "lastName": "User",
  "postalCode": "123456",
  "orderConfirmationMessage": "Thank you for your order!",
  "error_invalid_credentials": "Epic sadface: Username and password do not match any user in this service",
  "error_locked_out": "Epic sadface: Sorry, this user has been locked out.",
  "error_username_required": "Epic sadface: Username is required",
  "error_password_required": "Epic sadface: Password is required"
}
```

---

## 🧩 3. Playwright MCP Execution Flow

### Step 1: Read Test Data

* Parse `TestCaseDetails/test_cases_details.json`.
* Load all test cases into memory.

### Step 2: Process Each Test Case

For each test case:

1. Interpret **Title**, **Prerequisites**, **Steps**, and **ExpectedResult**.
2. Execute the **Prerequisites** (e.g., launch base URL, log in with valid credentials).
3. Run each **Step** in sequence using Playwright MCP tool actions.
4. Validate the **ExpectedResult** at the end.
5. If validation fails → refine selectors or actions and re-run.


### Step 3: Generate Playwright Test File

Before generating Playwright test scripts, refer to the `pom_structure_instructions.md`
and strictly follow Page Object Model (POM) principles **AND** the following code standards:

❗ Mandatory POM & Test Structure Rules:
- All selectors, locators, and UI interactions must come from Page Object classes.
- The test file must NOT contain direct calls to page.locator() or any inline selector.
- Only call methods and getters from Page Objects.
- All generated test scripts **must** use `test.describe` to group related test cases by flow or feature.
- Use Playwright hooks (`beforeEach`, `afterEach`, etc.) for setup and teardown logic.
- Each test case **must** be annotated with the appropriate tag(s): `@smoke`, `@regression`, `@sanity` (as relevant).
- Add clear comment statements before each logical block (setup, action, assertion, teardown).
- Insert `console.log` messages at key steps (setup, action, assertion, teardown) for traceability.
- Ensure all generated code is clean, DRY, and maintainable.

POM Auto-Creation:
- If a Page Object or locator already exists → reuse it.
- If a locator or method does not exist → create/update the Page Object automatically.
- Then use it inside the test.

Once all steps execute successfully:

• Generate Playwright JavaScript test code using @playwright/test.
• Save the test in the tests/ folder using a predefined file name based on flow:
  - Cart related → tests/cart-page.spec.js
  - Checkout related → tests/checkout.spec.js
  - Login related → tests/login.spec.js
  - Other flows → tests/<flow-name>.spec.js
• Do not generate long or random filenames.
• Append new tests into the appropriate existing spec file.
• Create the spec file if it doesn’t exist.


Example filename:

```
Login with valid credentials → tests/login.spec.js
```

Example generated file:

```js
import { test, expect } from '../../fixtures/custom-fixtures.js';
import testData from "../../fixtures/test-data.json";
import { LoginPage } from "../../pages/login.page.js";

// [Code Refactoring] Login Page Flows

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
});
```

### Step 4: Execute Generated Test

* Run generated tests using MCP:

```bash
npx playwright test tests/
```

* Or run specific ones:

```bash
npx playwright test tests/login.spec.js
```

### Step 5: Iterate Until Pass

* If any test fails, MCP should:

  * Analyze error logs or missing selectors.
  * Update the test dynamically.
  * Re-run until it passes successfully.

---

## 🧾 4. Output Files

### ✅ Test File

Generated test script:

```
tests/<test-title>.spec.js
```

### ✅ Execution Results

A JSON file summarizing the test outcomes:

```json
[
  { "TestCaseID": "TC001", "Result": "Pass" },
  { "TestCaseID": "TC304", "Result": "Fail" }
]
```

---

## 💡 5. Summary Workflow

| Step | Action                                                                  | Output                                      |
| ---- | ----------------------------------------------------------------------- | ------------------------------------------- |
| 1    | Run `node getTestCaseDetails.js`                                        | Generates `test_cases_details.json`         |
| 2    | Pass `test_cases_details.json` and `Playwright Mcp Instructions` to MCP | Generates Playwright tests dynamically      |
| 3    | MCP executes test(s)                                                    | Validates steps and expected results        |
| 4    | MCP iterates on failures                                                | Produces stable, passing Playwright scripts |
| 5    | Final output                                                            | Ready-to-run Playwright test suite          |

---

## 🚀 6. Next Steps

* Integrate MCP-driven generation into your CI/CD test pipeline.
* Expand step interpretation logic for actions like **Add to Cart**, **Checkout**, **Logout**.
* Optionally store results in your test management system or API endpoint.

---

**Author:** Aravind Kumar
**Use case:** Sauce Labs functional test automation via Playwright MCP
**Result:** Dynamic JSON-driven Playwright automation pipeline that self-generates, executes, and validates tests automatically ✅
