# Datamap E2E

This project is a end-to-end testing for Datamap Data Platform.

## Playwright

We're using [Playwright](https://playwright.dev/) to create test cases for:

* [Datamap Web Portal](https://github.com/ardc-brazil/datamap-webapp) -- main web app for the data platform
* [Gatekeeper API Gateway](https://github.com/ardc-brazil/gatekeeper) -- the public web API used by the web portal
* [Datamap Home Page](https://github.com/ardc-brazil/datamap-webapp) -- The public access for Datamap (home page)

## Coverage

Keep the list of test cases up to date.

* [Datamap - Test Cases](https://docs.google.com/spreadsheets/d/10ZiDvg-ZBkLT9gK57khzG4TiFjYgjnwJZo0jY58OHVM/edit?usp=sharing)


## Development

The execution of the test cases depends on the platform running locally.
To start the platform, use the Docker Compose scripts from the Gatekeeper and Datamap Web Portal.

To run quicker to check if everything is good during new test cases development.
> This command also runs a `pretest` to type checking with typescript and other stuffs.
```sh
npm run test
```

Lint only
```sh
npm run lint
# or
npx eslint .
```

You can set the repeat parameter to repeat each test case many times. This is importante to get flaky tests.

```sh
npx playwright test --repeat-each=15
```

In this case, we'll run each test case 15 times.

To run with UI
```sh
npx playwright test --ui
```

To run with trace
```sh
npx playwright test --trace on
```

To generate new tests
```sh
npx playwright codegen
```

To check the report results
```sh
npx playwright show-report
```

## Page Object Model

Each new test must use Page Object Model. Check more in https://playwright.dev/docs/pom.

### Env Vars

You have to create a `.env` file in the project root.

Copy the file [.env.template](./.env.template) and replace with valid values. 

## VisualStudio Code

We have a list of recommended vs code extension at `.vscode/extensions.json`.