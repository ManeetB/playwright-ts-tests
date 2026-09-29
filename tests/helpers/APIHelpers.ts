import { APIRequestContext } from "@playwright/test"

export class APIHelpers {
    private baseAPPLoginURL = 'https://rahulshettyacademy.com/api/ecom/auth/login'
    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    //login to application
    async webappLogin() : Promise<string> {

        const response = await this.apiContext.post(this.baseAPPLoginURL, {

            data:
            {
                userEmail: "today@yopmail.com",
                userPassword: "Test@1234"
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

    async createOrder(createOrderURL: string) :Promise<any> {
        const thisToken = await this.webappLogin()
        const thisResponse = await this.apiContext.post(createOrderURL, {
            data:
            {
                orders: [
                    {
                        country: "Cuba",
                        productOrderedId: "6960eae1c941646b7a8b3ed3"
                    }
                ]
            },

            headers: {
                'Authorization': thisToken,
                'Content-Type': 'application/json'
            }

        })

        if (!thisResponse.ok()) {
            throw new Error(`The order generation is failed with status ${thisResponse.status()}`)
        }
        const thisJSON = await thisResponse.json()
        return thisJSON.orders

    }

}
