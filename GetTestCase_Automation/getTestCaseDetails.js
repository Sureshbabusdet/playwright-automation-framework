// Import dependencies
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

// Function to get test case details by ID(s)
function getTestCaseDetails(filePath, testCaseIds) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return null;
  }

  // Load test data (default base URL, username, password, etc.)
  let testData = {};
  const testDataPath = "./fixtures/test-data.json";
  if (fs.existsSync(testDataPath)) {
    testData = JSON.parse(fs.readFileSync(testDataPath, "utf-8"));
  } else {
    console.warn("⚠️ test-data.json not found. Default replacements skipped.");
  }

  const workbook = XLSX.readFile(filePath);
  const allSheets = workbook.SheetNames;
  const results = [];

  for (const testCaseId of testCaseIds) {
    let testCase = null;
    let prerequisites = "";

    // Search across all sheets
    for (const sheetName of allSheets) {
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
      const found = sheet.find(
        (row) =>
          row["Test case ID"] &&
          row["Test case ID"].toString().trim().toLowerCase() === testCaseId.trim().toLowerCase()
      );

      if (found) {
        console.log(`✅ Found test case '${testCaseId}' in sheet: ${sheetName}`);
        testCase = found;

        // Dynamically detect prerequisites column (handles spaces/case)
        const prereqKey = Object.keys(found).find(
          (key) => key.trim().toLowerCase().startsWith("prerequisite")
        );

        if (prereqKey) prerequisites = (found[prereqKey] || "").replace(/\r/g, "").trim();
        break;
      }
    }

    if (!testCase) {
      console.warn(`⚠️ No test case found with ID: ${testCaseId}`);
      continue;
    }

    // Normalize for detection
    const normalized = prerequisites.toLowerCase().replace(/\s+/g, " ");

    // Detect credentials
    const hasUsername = normalized.includes("username:");
    const hasPassword = normalized.includes("password:");

    // ✅ Add credentials only if BOTH missing
    if (!hasUsername && !hasPassword && testData.username && testData.password) {
      prerequisites += `\nUsername: ${testData.username}\nPassword: ${testData.password}`;
      console.log(`ℹ️ Added default credentials for ${testCaseId}`);
    } else {
      console.log(`✅ Preserved existing credentials for ${testCaseId}`);
    }

    // ✅ If prerequisites empty → full default
    if (!prerequisites.trim()) {
      prerequisites = `Username: ${testData.username || "user"}\nPassword: ${
        testData.password || "password"
      }`;
      console.log(`ℹ️ Auto-filled prerequisites for ${testCaseId}`);
    }

    // ✅ Always prepend Base URL at the very end (final guarantee)
    if (testData.baseURL) {
      const baseUrlLine = `Site url : ${testData.baseURL}`;
      // Remove any old duplicates first
      prerequisites = prerequisites
        .split("\n")
        .filter((line) => !line.toLowerCase().includes("site url"))
        .join("\n")
        .trim();
      prerequisites = `${baseUrlLine}\n\n${prerequisites}`.trim();
      console.log(`🌐 Base URL ensured for ${testCaseId}`);
    }

    // Build JSON object
    const details = {
      TestCaseID: testCase["Test case ID"] || "",
      Title: testCase["Title"] || "",
      Prerequisites: prerequisites.trim(),
      Steps: testCase["Steps  to Execute"] || "",
      ExpectedResult: testCase["Expected Result"] || "",
    };

    results.push(details);
  }

  // Ensure output folder exists
  const outputDir = path.join(__dirname, "TestCaseDetails");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  // Save JSON
  const jsonFilePath = path.join(outputDir, "test_cases_details.json");
  fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 4), "utf-8");

  console.log(`✅ All test case details saved to ${jsonFilePath}`);
  return results;
}

// Example usage:
const filePath = "./SauceLabs_TestCases.xlsx";
const testCaseIds = ["TC101", "TC102", "TC103", "TC104", "TC105"];

const allDetails = getTestCaseDetails(filePath, testCaseIds);
console.log(JSON.stringify(allDetails, null, 4));
