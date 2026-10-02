# Playwright TypeScript Automation Tests

Benginner friendly Playwright automation tests built with **TypeScript** to demonstrate modern UI test automation, asynchronous handling, reusable test data, handling child windows.



## Tech Stack

- **Playwright**
- **TypeScript**
- **Node.js**
- **Git & GitHub**
- **VS Code**


##  What This Project Demonstrates

This project contains examples of common real-world Playwright automation scenarios:

-
- UI automation using Playwright + TypeScript
- API testing using Playwright APIRequestContext
- Page Object Model (POM)
- Reusable API helper classes
- External test data management
- Strongly typed TypeScript test data
- Dependency Injection for API helpers
- Browser context and child-window handling
- Positive and negative login scenarios
- API login and order creation
- Reusable test configuration
- TypeScript-based test development
- Assertions using Playwright `expect`
- Handling child windows / multiple pages
- Browser context management
- Handling asynchronous operations
- Page load synchronization


```text
playwright-Tests/
│
├── tests/
│   ├── api/
│   │   └── api_ui_order.spec.ts
│   │
│   ├── data/
│   │   ├── order-data.ts
│   │   └── user-login.ts
│   │
│   ├── helpers/
│   │   └── APIHelpers.ts
│   │
│   └── web/
│       └── login-test.spec.ts
│
├── playwright.config.ts
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```


The project includes examples for:

Invalid login
Valid login
Login test data stored separately from test logic
Validation of UI elements after login
API valid user login
API based order creation and validation.

About:

This project is part of my hands-on learning and automation engineering portfolio, with a focus on building maintainable, scalable, and production-oriented Playwright test frameworks.

The goal is not only to automate test cases, but also to demonstrate framework design, asynchronous programming, debugging, maintainability, and automation best practices.