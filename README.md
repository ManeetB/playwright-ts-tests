# Playwright TypeScript Automation Tests

Benginner friendly Playwright automation tests built with **TypeScript** to demonstrate modern UI test automation, asynchronous handling, reusable test data, handling child windows

## Tech Stack

- **Playwright**
- **TypeScript**
- **Node.js**
- **Git & GitHub**
- **VS Code**


##  What This Project Demonstrates

This project contains examples of common real-world Playwright automation scenarios:

- UI automation using Playwright
- TypeScript-based test development
- Positive and negative login scenarios
- Test data separation
- Playwright locators
- Assertions using Playwright `expect`
- Handling child windows / multiple pages
- Browser context management
- `waitForEvent()`
- `Promise.all()`
- Handling asynchronous operations
- Page load synchronization
- Reusable test structure
- Git/GitHub workflow

```text
playwright-ts-tests/
│
├── test/
│   └── data/
│       └── user-login.ts
│
├── tests/
│   └── login-test.spec.ts
│
├── helpers/
│   └── APIHelpers.ts
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

About:

This project is part of my hands-on learning and automation engineering portfolio, with a focus on building maintainable, scalable, and production-oriented Playwright test frameworks.

The goal is not only to automate test cases, but also to demonstrate framework design, asynchronous programming, debugging, maintainability, and automation best practices.