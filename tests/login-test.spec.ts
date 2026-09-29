import { test, expect, Page, request, APIRequestContext } from "@playwright/test"
import {loginData} from "./data/user-login"
let globalOrderid: string;
import { APIHelpers } from "./helpers/APIHelpers";



/**
 * TC001 - Verify that an error message is displayed
 * when the user attempts to log in with invalid credentials.
 */
test("TC001 - Invalid login", async ({ page }) => {

    // Navigate to the application base URL.
    await page.goto("/");


    // Enter invalid credentials from the test data file.
    await page.getByRole("textbox", { name: "username" })
        .fill(loginData.invalidLogin.username);

    await page.getByRole("textbox", { name: "password" })
        .fill(loginData.invalidLogin.password);

    // Submit the login form.
    await page.getByRole("button", { name: "Sign In" }).click();

    // Verify that the expected error message is displayed.
    await expect(
        page.getByText("Incorrect username/password.")
    ).toBeVisible();
});


/**
 * TC002 - Verify successful login and retrieve item information
 * after the user has authenticated successfully.
 */
test("TC002 - Valid login", async ({ page }) => {

    // Navigate to the application base URL.
    await page.goto("/");

    // Verify that the application has loaded successfully.
    const pageTitle = await page.title();
    await expect(page).toHaveTitle(pageTitle);

    // Enter valid credentials from the test data file.
    await page.getByRole("textbox", { name: "username" })
        .fill(loginData.validLogin.username);

    await page.getByRole("textbox", { name: "password" })
        .fill(loginData.validLogin.password);

    // Submit the login form.
    await page.getByRole("button", { name: "Sign In" }).click();

    /*
     * Locate the expected item using the item name
     * maintained in the test data file.
     */
    const itemLink = page.getByRole("link", {
        name: loginData.validLogin.item,
    });

    // Get the text of the selected item.
    const itemText = await itemLink.textContent();

    console.log("Selected item:", itemText);

    /*
     * Get the text of all items displayed on the page.
     * allTextContents() returns an array of strings.
     */
    const allItemTexts = await page
        .locator("h4.card-title a")
        .allTextContents();

    console.log("All available items:", allItemTexts);
});


/**
 * TC003 - This test case deals with handling a new child
 * page in the same browser context
 * 
 */

test("Handle the child window", async ({ browser }) => {

    // Create a new browser context and page.
    // This is useful when we want to control the browser context
    // separately from Playwright's default page fixture.
    const browserContext = await browser.newContext();
    const page1 = await browserContext.newPage();

    await page1.goto(
        "/"
    );

    /*waitForEvent() returns a Promise immediately.
     * It does NOT wait here for the new page to open.
     * Instead, the Promise will be resolved later when the "page" event
     * occurs and a new browser page is created.
     *
     * We create this Promise BEFORE clicking the link so that
     * Playwright is already listening for the new page event.
     */
    const newPagePromise = browserContext.waitForEvent("page");

    // Click the link that opens the child window.
    await page1.getByRole("link", {
        name: loginData.childPageLink,
    }).click();

    /*
     * Wait for the  new page Promise to be resolved.
     */
    const newPage = await newPagePromise;

    // Wait until the new page has finished loading.
    await newPage.waitForLoadState();

    
    // validate the title of the chile page.
    await expect(newPage).toHaveTitle(loginData.childpageTitle)

    // Get the URL of the child window.
    console.log("Child window URL:", newPage.url());
});



/**
 * TC004 - This test case demonstrates handling a new child
 * page using Promise.all()
 *
 * Promise.all() allows us to wait for multiple asynchronous
 * operations at the same time.
 */

test("Handle the child window using Promise.all", async ({ browser }) => {

    // Create a new browser context and page.

    const browserContext = await browser.newContext();
    const page1 = await browserContext.newPage();

    await page1.goto("/");

    /*
     * Promise.all() waits for all the promises passed to it
     * to be fulfilled and then returns their results.
     *
     * Here, we are doing two things at the same time:
     *
     * 1. Waiting for the "page" event.
     * 2. Clicking the link that opens the child page.

     */
    const [page2] = await Promise.all([
        browserContext.waitForEvent("page", { timeout: 5000 }),

        page1.getByRole("link", {
            name: loginData.childPageLink,
        }).click(),
    ]);

    // Wait until the child page has finished loading.
    await page2.waitForLoadState();

    // Wait for the expected heading to be available on the child page.
    await page2.getByRole("heading", {
        name: loginData.childPageHeading,
    }).waitFor();

    // Validate that the child page contains the expected title.
    await expect(page2).toHaveTitle(loginData.childpageTitle);

    // Get the URL of the child page.
    console.log("Child window URL:", page2.url());
});
