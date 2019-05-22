# UI Automation

##### Table of Contents

<!-- toc -->

- [Overview](#overview)
- [Learn](#howto)
- [Setup](#setup)
- [Testing](#testing)
- [Ready?](#ready)

<!-- tocstop -->

### Overview

UI Automation Boilerplate Project - will be used to Test UI based projects through BDD Testing.

### Learn

Setup one of the UI Project (for Demo purpose used DSS)

- Checkout https://github.service.anz/selvarm1/ui-react-app-sample.git
- To get this project running

  > yarn install --offline

  > yarn run start

- Now, the app should be working under http://localhost:3000

### Setup

- Checkout https://github.service.anz/selvarm1/ui-automation-browser-packages.git

- Prepare your `ui-automation` project to use `ui-automation-browser-packages`

  - Windows
    > set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
  - Linux or Mac

    > export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

  > yarn install --offline

- Once above steps are done, Follow the instruction on `ui-automation-browser-packages` Project to place Chrome, Firefox packages into node_modules

### Testing

- To Run Automation

  - Single Thread

    - Exectue Automation in Chrome
      > yarn run test:chrome
    - Exectue Automation in Firefox
      > yarn run test:firefox
    - Execute Automation in Chrome & Firefox together
      > yarn run test

  - Parallel (parallel thread can be updated in package.json, default is 5)

    - Parallel may not work in windows
    - Exectue Automation in Chrome
      > yarn run test:parallel:chrome
    - Exectue Automation in Firefox
      > yarn run test:parallel:firefox
    - Execute Automation in Chrome & Firefox together
      > yarn run test:parallel

  - Specific Feature (usually to test specific feature on Development time)

    - Exectue Automation in Chrome
      > yarn run test:feature:chrome `src/features/[feature-filename].feature`
    - Exectue Automation in Firefox
      > yarn run test:feature:firefox `src/features/[feature-filename].feature`

  - Specific Scenario (usually to test specific scenario on Development time)

    - Exectue Automation in Chrome
      > yarn run test:scenario:chrome `"[scenario-name]"`
    - Exectue Automation in Firefox
      > yarn run test:scenario:firefox `"[scenario-name]"`

  - Specific Tag (usually to test specific tag on Development time)

    - Exectue Automation in Chrome
      > yarn run test:tags:chrome `"[tags-name]"`
    - Exectue Automation in Firefox
      > yarn run test:tags:firefox `"[tags-name]"`

- To Generate Report
  - To Clean Report Data
    > yarn run report:clean
  - To generate Coverage Report
    > yarn run report:generate
  - Access the report in quick httpSerer
    > yarn run report:browse
  - To Zip Reports (usually done before pushing into Source Control)
    > yarn run report:zip
  - To UnZip Reports (usually done to check exsting Reports pulled from Source Control)
    > yarn run report:unzip
  - You have to decide the report goes as part of source code, if not add below line exclusion entry in `.gitignore`
    - automation_report.zip

### Ready

This is project can be standalone or part UI project.

- Clean the samples

  - Delete all .feature files from src/features
  - Delete all .js files from src/step_definitions

- You should be ready to write your own `feature` and `step_definition`

- UI Project host configuration are in `src/support/helper.js`

  - headless - true | false (browser runtime)
  - UI_PROJECT_HOST - http://localhost:3000/ (where your UI Project runs)
  - UI_LOGIN_PAGE - login.html (if required to login to access application)
  - UI_HOME_PAGE - index.html (home page after login into application)
  - Note - Demo application doesnt require Login, so UI_LOGIN_PAGE, UI_HOME_PAGE are empty here.

- You are free to extend the functionaly based on requirement.
