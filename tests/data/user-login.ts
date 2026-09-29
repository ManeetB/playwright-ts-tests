
/*
 * Test data for login-related test cases.
 */

export const loginData = {
    invalidLogin: {
        username: "invalid_user@example.com",
        password: "InvalidPassword",
    },

    validLogin: {
        username:"Valid_user@example.com",
        password: "ValidPassword",
        item: "item_name",
    },

    newPage: {
        childPageLink: 'Click this link to creat new Page',
        childpageTitle: 'child Page Title',
        childPageHeading: 'childPageHeading'
    }
};
