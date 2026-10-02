import { APIRequestContext } from "@playwright/test"
import { loginData } from "../data/user-login";


export class APIHelpers {
    private baseAPPLoginURL = loginData.validLogin.baseURL;
    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    //login to application
    async webappLogin(): Promise<string> {

        const response = await this.apiContext.post(this.baseAPPLoginURL, {

            data:
            {
                userEmail: loginData.validLogin.username,
                userPassword: loginData.validLogin.password
            }
        })

        if (!response.ok()) {
            throw new Error(`The token generation is failed with status ${response.status()}`)
        }

        const thisJSON = await response.json()
        const token = thisJSON.token
        return token

    }

    //create an order

    async createOrder(
        token: string,
        createOrderURL: string,
        order: { country: string; productOrderedId: string }
    ): Promise<string[]>  {

        const response = await this.apiContext.post(createOrderURL, {

            data: {
                orders: [order]
            },

            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok()) {
            throw new Error(
                `Order generation failed with status ${response.status()}`
            );
        }

        const json = await response.json();

        return json.orders;
    }

}
