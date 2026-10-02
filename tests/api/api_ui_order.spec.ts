import { test, expect, request } from "@playwright/test";
import { APIHelpers } from "../helpers/APIHelpers";
import { orderData } from "../data/order-data";

test("Validate Login and create order API", async () => {

    // Create an API request context.
    const apiContext = await request.newContext();

    /*
     * Pass the API context to APIHelpers.
     *
     * This is Dependency Injection because the API context
     * is created outside APIHelpers and passed into it.
     */
    const apiHelper = new APIHelpers(apiContext);

    // Login and retrieve the authentication token.
    const token = await apiHelper.webappLogin();

    console.log(`Token value: ${token}`);

    // Create an order using the first set of test data.
    const orders = await apiHelper.createOrder(
        token,
        orderData.orderURL,
        orderData.orders[0]
    );

    console.log(`Orders: ${orders}`);

    // Verify that an order was created.
    expect(orders).toBeDefined();
    expect(orders.length).toBeGreaterThan(0);

    // Clean up the API context.
    await apiContext.dispose();
});