const { Given, When, Then } = require("cucumber");


// Scenario: Stop Cheque Book - Enter Details
Then(/^The application shows the "Cheque Book" section fields$/, async function () {
  const requestType = 'RANGE';
  await this.checkElementValue("input[type='radio']:checked", requestType);
  await this.checkElementExist("#chqBookSize");
  await this.checkElementExist("#serialNumberFirstFour");
  await this.checkElementExist("#serialNumberLastTwo");
  await this.checkElementExist("#chqEndSerialNum");
  await this.checkElementExist("#note");
  await this.checkElementExist("button[id ='reviewAndSubmit']");
  await this.attachScreenShot();
});


// Scenario: Stop Cheque Book - Field Validation
Then(/^The application show error message on "Cheque Book Size" & "First Serial Number" field$/, async function () {
  await this.checkCSSClassExist('#chequeBookDetailsContainer #serialNumberLastTwo', 'form-control--has-error', true);
  await this.checkCSSClassExist('#chequeBookDetailsContainer #chqBookSize', 'form-control--has-error', true);
  await this.attachScreenShot();
});


// Scenario: Cheque Book - Successful Request
When(/^I am entering value "(.*)" in "First Serial Number"$/, async function (input) {
  await this.setTextInputValue('serialNumberFirstFour', input);
});

When(/^I am selecting "(.*)" in "Cheque Book Size"$/, async function (input) {
  await this.setTextInputValue('chqBookSize', input);
});
Then(/^The application accepts input and move to Stop Cheque Book submission Review Page$/, async function () {
  await this.checkElementExist("#accountContainer");
  await this.checkElementExist("#requestTypeContainer");
  await this.checkElementExist("#chequeBookDetailsContainer");
  await this.checkElementExist("#previous");
  await this.checkElementExist("#submit");
  await this.attachScreenShot();
});

// Scenario: Stop Cheque Book - View
Then(/^The application present "(.*)" in Itemised Report$/, async function (reportType) {
  const report = reportType;
  await this.waitForLoading();
  await this.checkElementExist("#chequeTableContainer");
  await this.attachScreenShot();
});

//DIGS - 634
Then(/^The application must present Cheque Details table with label as "(.*)" and the message "(.*)" below$/, async function (headingLabel, message) {
  await this.checkElementExist("#chequeTableContainer");
  await this.checkHTMLText("#chequeTableContainer div[role='heading'] span", headingLabel);
  await this.checkHTMLText("#chequeTableContainer #chequeTableWarning", message);
  await this.attachScreenShot();
});

Then(/^Cheque Details has Add and Remove buttons$/, async function () {
  await this.checkElementExist("#chequeTableContainer #add");
  await this.checkElementExist("#chequeTableContainer #remove");
  await this.attachScreenShot();
});

Then(/^A new row is added to the Cheque Details table$/, async function () {
  await this.checkElementExist("#chequeDetail-2");
  await this.attachScreenShot();
});

When(/^The user selects all rows from the Cheque Details table$/, async function () {
  await this.clickElement("input[name='selectAllCheques']");
});

Then(/^The Cheque Details Table must be updated with a blank row$/, async function () {
  await this.checkElementExist("#chequeTableContainerContent #chqNum1");
  await this.checkElementValue("#chequeTableContainerContent #chqNum1", "");
  await this.checkElementExist("#chequeTableContainerContent #chqAmt1");
  await this.checkElementValue("#chequeTableContainerContent #chqAmt1", "");
  await this.checkElementExist("#chequeTableContainerContent #chqIssDt1");
  await this.checkElementValue("#chequeTableContainerContent #chqIssDt1", "");
  await this.checkElementExist("#chequeTableContainerContent #payeeName1");
  await this.checkElementValue("#chequeTableContainerContent #payeeName1", "");
  await this.checkElementExist("#chequeTableContainerContent #note1");
  await this.checkElementValue("#chequeTableContainerContent #note1", "");
  await this.attachScreenShot();
});

When(/^I am selecting "(.*)" from "First Serial Number" select dropdown$/, async function (val) {
  await this.setSelectInputValue("serialNumberLastTwo", val);
});

Then(/^The application show error message on "(.*)" field$/, async function (field) {
  if (field === "Cheque Book Size") await this.checkCSSClassExist("#chqBookSize", "form-control--has-error", true);
  else if (field === "First Serial Number") await this.checkCSSClassExist("#serialNumberLastTwo", "has-error", true);
  await this.attachScreenShot();
});

// Scenario: Stop Individual Cheque(s) - Single / Multiple - Enter Details
Then(/^The application must hide the further input fields to Request "Stop Cheque"$/, async function () {
  await this.checkElementNotExist("#requestTypeContainer");
  await this.checkElementNotExist("#chequeTableContainer");
  await this.attachScreenShot();
});

Then(/^The application shows the "Individual Cheque\(s\)" section fields$/, async function () {
  const requestType = 'INDIVIDUAL';
  await this.checkElementValue("input[type='radio']", requestType);
  await this.checkElementExist("#add");
  await this.checkElementExist("#remove");
  await this.checkElementExist("#chequeDetail-1 #chqNum1");
  await this.checkElementExist("#chequeDetail-1 #chqAmt1");
  await this.checkElementExist("#chequeDetail-1 #chqIssDt1");
  await this.checkElementExist("#chequeDetail-1 #payeeName1");
  await this.checkElementExist("#chequeDetail-1 #note1");
  await this.checkElementNotExist("button[id ='previous']");
  await this.checkElementExist("button[id ='reviewAndSubmit']");
  await this.attachScreenShot();
});
Then(/^The application must display option to choose Types of Request & enter Cheque Details$/, async function () {
  await this.checkElementExist("#requestTypeContainer");
  await this.checkElementExist("#chequeTableContainer");
  await this.attachScreenShot();
});

Then(/^The application must display option to stop "Individual Cheque\(s\)" or "Cheque Book" & "Individual Cheque\(s\)" must be pre-selected by default$/, async function () {
  await this.checkElementExist("#requestTypeContainer input[type='radio'][value='INDIVIDUAL']");
  await this.checkElementExist("#requestTypeContainer input[type='radio'][value='RANGE']");
  await this.checkElementValue("#requestTypeContainer input[type='radio']", "INDIVIDUAL");
  await this.attachScreenShot();
});

// Scenario: Stop Individual Cheque(s) - Single / Multiple - Field Validation
When(/^I am selecting "(.*)" as Request Type$/, async function (requestType) {
  const subType = requestType === 'Individual Cheque(s)' ? 'INDIVIDUAL' : 'RANGE';
  await this.setRadioInputValue('subType', subType);
});
Then(/^The application show error message on "Cheque Number", "Value" & "Issue Date" field in Cheque Details Row1$/, async function () {
  await this.checkCSSClassExist(`#chequeDetail-1 #chqNum1`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #chqAmt1`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #chqIssDt1Wrapper div div`, 'form-wrapper-control--has-error', true);
  await this.attachScreenShot();
});
Then(/^The application show error message on "Cheque Number", "Value" & "Issue Date" field in Cheque Details Row1 & Row2$/, async function () {
  await this.checkCSSClassExist(`#chequeDetail-1 #chqNum1`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #chqAmt1`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #chqIssDt1Wrapper div div`, 'form-wrapper-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-2 #chqNum2`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-2 #chqAmt2`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-2 #chqIssDt2Wrapper div div`, 'form-wrapper-control--has-error', true);
  await this.attachScreenShot();
});
When(/^I am entering inputs into "Cheque Number", "Value", "Issue Date", "Payee Name" & "Note" in Cheque Detail$/, async function (table) {
  const data = table.hashes();
  let currentDate;
  const d = new Date();
  let month = d.getMonth();
  let day = d.getDate();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  currentDate = `${day}/${month}/${d.getFullYear()}`
  for (let i = 0; i < data.length; i++) {
    const rowIndex = i + 1;
    const row = data[i];
    const chqIssDt = row.chqIssDt || currentDate;
    await this.setTextInputValue('chqNum' + rowIndex, row.chqNum);
    await this.setTextInputValue('chqAmt' + rowIndex, row.chqAmt);
    await this.setTextInputValue('chqIssDt' + rowIndex, chqIssDt);
    await this.setTextInputValue('payeeName' + rowIndex, row.payeeName);
    await this.setTextInputValue('note' + rowIndex, row.note);
  }
});
Then(/^The application show error message on "Cheque Number", "Value", "Issue Date" & "Payee Name" field in Cheque Details Row1$/, async function () {
  await this.checkCSSClassExist(`#chequeDetail-1 #chqNum1`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #chqAmt1`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #chqIssDt1Wrapper div div`, 'form-wrapper-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #payeeName1`, 'form-control--has-error', true);
  await this.attachScreenShot();
});
Then(/^The application show error message on "Cheque Number", "Value", "Issue Date" & "Payee Name" field in Cheque Details Row1 & Row 2$/, async function () {
  await this.checkCSSClassExist(`#chequeDetail-1 #chqNum1`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #chqAmt1`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #chqIssDt1Wrapper div div`, 'form-wrapper-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-1 #payeeName1`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-2 #chqNum2`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-2 #chqAmt2`, 'form-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-2 #chqIssDt2Wrapper div div`, 'form-wrapper-control--has-error', true);
  await this.checkCSSClassExist(`#chequeDetail-2 #payeeName2`, 'form-control--has-error', true);
  await this.attachScreenShot();
});
When(/^The user Clicks the "(.*)" button "(.*)" in Cheque Details section$/, async function (button, times) {
  let iteration = 0;
  let buttonId = '';
  if (times === 'Once') {
    iteration = 1;
  } else if (times === 'Twice') {
    iteration = 2;
  } else if (times === '7 Times') {
    iteration = 7;
  }

  if (button === 'Add') {
    buttonId = '#add';
  } else if (button == 'Remove') {
    buttonId = '#remove';
  }

  for (let i = 0; i < iteration; i++) {
    await this.clickElement(buttonId);
  }
});
Then(/^The application should disable Add Button$/, async function () {
  await this.checkElementExist("#chequeTableContainer #stopChequeActionToolbar #add button:disabled");
});
Then(/^The application shows (.*) Rows in Cheque Details$/, async function (count) {
  for (let i = 1; i <= count; i++) {
    await this.checkElementExist("#chequeTableContainer #chequeDetail-" + i);
  }
  await this.attachScreenShot();
});
When(/^The user Clicks the "Select All" checkbox$/, async function () {
  await this.clickElement("#chequeTableContainer input[name='selectAllCheques']");
});
Then(/^The application shows error on Cheque Details section$/, async function () {
  await this.checkElementExist("#chequeTableContainer div[class*='form-text--has-error']");
  await this.attachScreenShot();
});

// Scenario: Stop Individual Cheque(s) - Single - Successful Request
Then(/^The application accepts input and move to Stop Individual Cheque submission Review Page$/, async function () {
  await this.checkElementExist("#accountContainer");
  await this.checkElementExist("#requestTypeContainer");
  await this.checkElementExist("#chequeTableContainer");
  await this.checkElementExist("#submit");
  await this.attachScreenShot();
});
Then(/^The application will display the Submit Response Dialog$/, async function () {
  await this.checkElementExist("#submitResponseDialog #okBtn");
  await this.attachScreenShot();
});

// Scenario: Stop Individual Cheque(s) - Multiple - Successful Request
Then(/^The application should show list screen with filtered result$/, async function () {
  await this.waitForLoading();
  await this.checkElementNotExist('.slick-row');
  await this.attachScreenShot();
});

Then(/^The application must move the view screen for the next Service Request record in the Service Request list as per the user's previous entered criteria$/, async function () {
  await this.waitForLoading();
  await this.attachScreenShot();
});

Then(/^The application must move the view screen for the previous Service Request record in the Service Request list as per the user's previous entered criteria$/, async function () {
  await this.waitForLoading();
  await this.attachScreenShot();
});
When(/^The record the user is viewing is the first record selected from the Service Request List$/, async function () {
  await this.clickElement("#prevRecord button");
});
