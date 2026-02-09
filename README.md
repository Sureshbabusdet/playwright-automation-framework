# playwright-automation-framework
playwright-automation-framework


# SDET_Playwright

<p align="center"><b>Enterprise-grade, scalable end-to-end automation framework for web and API testing, built on MCP (Model Context Protocol)</a> for dynamic, JSON-driven test generation, self-healing execution, and robust reporting. Designed for reliability, maintainability, and scalability.</b></p>

## Project Structure
- `tests/` — Feature-based folders (e.g., `auth/`, `cart/`, `checkout/`, `product/`) with `.spec.js` test files
- `pages/` — Page Object Model (POM) classes for UI interactions
- `reports/` — Screenshots and Playwright HTML reports
- `playwright.config.js` — Central configuration for browsers, parallelism, retries, tracing, and reporting
- `package.json` — Scripts and dependencies

## Getting Started
1. **Install dependencies:**

   <p align="center">
     <img src="https://playwright.dev/img/playwright-logo.svg" width="120" alt="Playwright Logo"/>
   </p>

   <h1 align="center">SDET_Playwright</h1>

   <p align="center">
     <b>Enterprise-Grade End-to-End Automation Framework</b><br>
     <a href="https://playwright.dev/"><img src="https://img.shields.io/badge/Playwright-%5E1.39.0-green?logo=playwright"/></a>
     <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%3E=18.0.0-brightgreen?logo=node.js"/></a>
     <a href="https://docs.qameta.io/allure/"><img src="https://img.shields.io/badge/Allure%20Reports-Integrated-blueviolet?logo=allure"/></a>
     <a href="#%F0%9F%A4%96-playwright-mcp-dynamic-test-generation"><img src="https://img.shields.io/badge/MCP%20Dynamic%20Tests-Enabled-orange"/></a>
   </p>

  <details>
  <summary><b>📢 Key Highlights & Additions</b> (click to expand)</summary>

  - <b>API Testing Support:</b> API tests live in <code>tests/API_Testing/</code> and run as a separate Playwright project (<code>API-Tests</code> in <code>playwright.config.js</code>).
  - <b>Excel-to-JSON Automation:</b> Use <code>GetTestCase_Automation/getTestCaseDetails.js</code> to convert <code>SauceLabs_TestCases.xlsx</code> to JSON for MCP-driven test generation.
  - <b>Test Utilities:</b> <code>testcase_utils/</code> is reserved for custom helpers/utilities (future extensibility).
  - <b>Menu & Footer Page Objects:</b> <code>menu.page.js</code> and <code>products.page.js</code> provide reusable navigation, logout, and footer/social link assertions.
  - <b>Extensibility:</b> Easily add new page objects, test data, and flows. Reserved folders like <code>tests/product/</code> for future product-specific tests.
  - <b>Naming Conventions:</b> Test files: <code>feature-name.spec.js</code>, Page objects: <code>feature.page.js</code>.
  - <b>How to Add a New Test Case:</b> 
    1. Update <code>SauceLabs_TestCases.xlsx</code> with new scenarios.
    2. Run <code>node GetTestCase_Automation/getTestCaseDetails.js</code> to generate JSON.
    3. Run MCP to generate and execute tests automatically.
  - <b>Allure Reports:</b> Generated in <code>allure-report/</code> and can be served locally with <code>npx allure serve allure-results</code>.
  - <b>Contact/Contributing:</b> For contributions or questions, contact the maintainer or open an issue.

  </details>

   ---

   > :rocket: **Modern, maintainable, and scalable Playwright automation with dynamic test generation via Model Context Protocol (MCP).**

   ---

   ## 🗂️ Project Structure

   ```
   SDET_Playwright/
   ├── tests/           # Feature-based test specs (auth, cart, checkout, ...)
   ├── pages/           # Page Object Model (POM) classes
   ├── fixtures/        # Shared test data (JSON)
   ├── reports/         # Screenshots, HTML & Allure reports
   ├── playwright.config.js
   ├── package.json
   └── ...
   ```

  ### Additional Folders & Files
  - <b>GetTestCase_Automation/</b>: Excel-to-JSON automation for test case management
  - <b>testcase_utils/</b>: Reserved for custom test helpers/utilities
  - <b>allure-report/</b>: Allure HTML reports (generated)
  - <b>playwright-report/</b>: Playwright HTML reports (generated)
  - <b>SauceLabs_TestCases.xlsx</b>: Source Excel for test scenarios

   - **tests/**: Organized by feature, contains `.spec.js` files (MCP-generated & manual)
   - **pages/**: POM classes encapsulating UI logic and selectors
   - **fixtures/**: Test data, credentials, expected values
   - **reports/**: Allure, Playwright HTML, and MCP result summaries

   ---

   ## 🚀 Quick Start

   ```sh
   # 1. Install dependencies
   npm ci
   npm i -D allure-playwright

   # 2. Run all tests
   npx playwright test

   # 3. Run a specific test
   npx playwright test tests/auth/login.spec.js

   # 4. View Playwright HTML report
   npx playwright show-report

   # 5. Generate & serve Allure report
   npx allure-playwright generate
   npx allure serve allure-results
   ```

   ---

   ## 🤖 Playwright MCP: Dynamic Test Generation

   - **MCP** enables dual workflow:
     - :computer: **Workflow A:** Real-time browser execution & validation
     - :page_facing_up: **Workflow B:** Auto-generates Playwright test code (POM-based, with strict grouping, hooks, tags, comments, and log messages)
   - **Test cases** defined in [`TestCaseDetails/test_cases_details.json`](./GetTestCase_Automation/TestCaseDetails/test_cases_details.json)
   - **Instructions** in [`PlaywrightMCP_Instructions/playwright_mcp_instructins.md`](./PlaywrightMCP_Instructions/playwright_mcp_instructins.md)
   - **POM & test script standards** in [`pom_structure_instructions.md`](./PlaywrightMCP_Instructions/pom_structure_instructions.md)

   ### How It Works

   1. Add/Update test cases in JSON
   2. Run MCP (see instructions)
   3. MCP executes steps, validates, and generates code
   4. Test is saved in `tests/` and executed until pass
   5. All generated scripts follow mandatory grouping, hooks, tags, comments, and log message standards
   6. Results summarized in `reports/`

   ---

   ## 📁 Key Files & Folders

   | Path                                                        | Purpose                                      |
   |-------------------------------------------------------------|----------------------------------------------|
   | `tests/`                                                    | All test specs (feature-based)               |
   | `pages/`                                                    | Page Object Model classes                    |
   | `fixtures/test-data.json`                                   | Shared test data, credentials, expected vals  |
   | `reports/`                                                  | Screenshots, HTML, Allure, MCP result JSON   |
   | `playwright.config.js`                                      | Playwright config (projects, reporters, CI)  |
   | `PlaywrightMCP_Instructions/playwright_mcp_instructins.md`  | MCP test generation/execution instructions   |
   | `PlaywrightMCP_Instructions/pom_structure_instructions.md`  | POM structure & standards                    |
   | `GetTestCase_Automation/TestCaseDetails/test_cases_details.json` | Source of truth for test scenarios      |

  | `GetTestCase_Automation/getTestCaseDetails.js`              | Converts Excel test cases to JSON for MCP     |
  | `SauceLabs_TestCases.xlsx`                                  | Source Excel for test scenarios              |
  | `testcase_utils/`                                           | Reserved for custom test helpers/utilities   |
  | `allure-report/`                                            | Allure HTML reports (generated)              |
  | `playwright-report/`                                        | Playwright HTML reports (generated)          |

   ---

   ## 🌟 Features

   - **Zero manual scripting:** Add scenarios in JSON, MCP generates & executes
   - **Strict POM enforcement:** All selectors/actions via page classes
   - **Allure & Playwright HTML reporting**
   - **API + UI + Integration test support**
   - **CI-ready & BrowserStack integration**
   - **Reusable test data & fixtures**
   - **Professional code quality & structure**

   ---

   ## 🏆 Best Practices & Conventions

   - **POM:** All UI logic in `pages/`, never inline selectors in tests
   - **Test data:** Centralized in `fixtures/test-data.json`
   - **Specs:** Named by feature, grouped in `tests/`
   - **Reporting:** Allure & Playwright HTML for traceability
   - **CI:** Use environment variables for secrets (see `playwright.config.js`)
   - **API Testing:** Place API-only specs in `tests/API_Testing/` and use the `API-Tests` project for separation.
   - **Menu/Footer:** Use `menu.page.js` and `products.page.js` for navigation, logout, and footer assertions.
   - **Extensibility:** Add new page objects and test flows as needed; reserved folders for future growth.

   ### 🚦 Mandatory Test Script Standards (MCP-Generated)
   - All MCP-generated test scripts **must**:
     - Use `test.describe` to group related test cases by flow or feature
     - Use Playwright hooks (`beforeEach`, `afterEach`, etc.) for setup/teardown
     - Annotate each test with the appropriate tag(s): `@smoke`, `@regression`, `@sanity`
     - Add clear comment statements before each logical block (setup, action, assertion, teardown)
     - Insert `console.log` messages at key steps for traceability
     - Ensure all code is clean, DRY, and maintainable.

   ---

   ## 🛠️ Troubleshooting & Tips

   - If `npx playwright test` reports "No tests found", check file naming/location
   - Avoid `test.only` unless debugging
   - Use `test.describe.serial` for ordered, stateful tests
   - For API mocks, tolerate non-persistence (see code comments)
   - Use `page.evaluate()` and `page.addInitScript()` for advanced browser state setup

   ---

   ## 🌐 CI & BrowserStack

   - **BrowserStack** integration in `playwright.config.js`
   - Set credentials via environment variables:

   ```sh
   # Windows PowerShell
   $env:BROWSERSTACK_USERNAME='your_user'
   $env:BROWSERSTACK_ACCESS_KEY='your_key'
   ```

   ---

   ## 📈 Utilities

   - **getTestCaseDetails.js:** Converts Excel test cases to JSON for MCP
   - **TestCaseDetails/:** Stores generated JSON for automated test runs

   ---

   <p align="center">
     <b>Made by Suresh Babu</b>
   </p>

  ---

  <p align="center" style="color: #888; font-size: 0.95em;">
    <b>For questions, contributions, or support, please contact.:-  Suresh</b>
  </p>
