const { Given, When, Then } = require("cucumber");

Given(/^An authorised user with permission$/, async function () {
  // Login not required, good to go
});

When(/^The user navigated to the Create "(.*)" service request screen$/, async function (requestType) {
  await this.waitForLoading();
  await this.clickElement('#addNewBtn button');
  await this.waitForLoading();
  if (requestType === 'Stop Cheque') {
    await this.clickElement('a#stopChequeRequest');
  } else if (requestType === 'Order Cheque Book') {
    await this.clickElement('a#orderChequeBook');
  } else if (requestType === 'Order Deposit Book') {
    await this.clickElement('a#orderDepositBook');
  } 
});

Then(/^The application must display the service request list screen$/, async function () {
  await this.waitForLoading();
  await this.checkElementExist("#content #serviceRequests");
  await this.attachScreenShot();
});

When(/^I have selected an account from Select Account Number Dropdown$/, async function () {
  await this.waitForLoading();
  await this.clickElement("#accountContainer #account_wrapper");
  await this.clickElement("#accountContainer .Select-option");
  const account = await this.getTextInputValue("#accountContainer #accNum");
  this.setState('account', { selector: "#accountContainer #accNum", value: account, type: 'TextInput' });
});

When(/^The user Clicks the "(.*)" button$/, async function (button) {
  let buttonId = '';

  if (button === 'New') {
    buttonId = '#addNewBtn';
  } else if (button === 'Cancel') {
    buttonId = '#cancel';
  } else if (button === 'Review & Submit') {
    buttonId = '#reviewAndSubmit';
  } else if (button === 'Previous') {
    buttonId = '#previous';
  } else if (button === 'Next') {
    buttonId = '#next';
  } else if (button === 'Submit') {
    buttonId = '#submit'
  } else if (button === 'Group') {
    buttonId = '#groupMenuBtn'
  } else if (button === 'Filter') {
    buttonId = '#filterToggleBtn';
  } else if (button === 'Refresh') {
    buttonId = '#refreshBtn';
  } else if (button === 'Export') {
    buttonId = '#exportBtn';
  } else if (button === 'Approve') {
    buttonId = '#approve';
  } else if (button === 'Reject') {
    buttonId = '#reject';
  } else if (button === 'Close') {
    buttonId = '#close';
  } else if (button === 'Add') {
    buttonId = '#add';
  } else if (button === 'Remove') {
    buttonId = '#remove';
  } else if (button === 'Yes') {
    buttonId = '#yesBtn';
  } else if (button === 'No') {
    buttonId = '#noBtn';
  }

  await this.waitForLoading();
  await this.clickElement(buttonId);
  await this.waitForLoading();
});

When(/^I click on the dropdown arrow against the "(.*)" field$/, async function (fieldName) {
  const selector = {
    "Legal Entities": "#legalEntity_wrapper",
    "Settlement Accounts": "#settlementAccount-field #settlementAccount_wrapper div",
    "Operating Accounts": "#accountContainer #account_wrapper div",
    "Closing Accounts": "#closeAccount-field #closeAccount_wrapper div",
  }
  await this.clickElement(selector[fieldName]);
  await this.waitForLoading();
});

Then(/^The application will populate the "(.*)" dropdown menu with all entitled "(.*)"$/, async function (fieldName, accountType) {
  const selector = {
    "Legal Entities": "#legalEntity_wrapper",
    "Settlement Accounts": "#settlementAccount-field #settlementAccount_wrapper div",
    "Operating Accounts": "#accountContainer #account_wrapper div",
    "Closing Accounts": "#closeAccount-field #closeAccount_wrapper div",
  }
  await this.waitForLoading();
  await this.checkElementExist(selector[fieldName] + " .Select-menu");
  await this.attachScreenShot();
});

Then(/^The application pops up the drop-down list while typing, suggesting a list of possible results$/, async function () {
  await this.checkElementExist("#accountContainer #account_wrapper .Select-menu");
  await this.attachScreenShot();
});

Then(/^The application must display the error message 'No Matches Found' in the "(.*)" dropdown$/, async function (fieldName) {
  const selector = {
    "Operating Accounts": "#accountContainer .Select-noresults",
    "Close Accounts": "#closeAccount_wrapper .Select-noresults",
    "Settlement Account": "#settlementAccount_wrapper .Select-noresults",
    "Redirection Account": "#redirectionAccount_wrapper .Select-noresults",
    "Legal Entity": "#legalEntity_wrapper div[class^='Select-menu-outer']",
    "Statement Delivery Address": "#deliveryAddress_wrapper .Select-noresults",
  };
  await this.checkHTMLText(selector[fieldName], "No Matches Found");
  await this.attachScreenShot();
});

When(/^The user clicks on the lookup button for "(.*)"$/, async function (fieldName) {
  const selector = {
    "Operating Accounts": "#accountSearch",
    "Closing Accounts": "#closeAccountSearch",
    "Settlement Accounts": "#settlementAccountSearch",
    "Redirection Account": "#redirectionAccountSearch",
    "Legal Entity": "#legalEntitySearch",
    "Copy from Account": "#prePopAcctIdSearch",
    "Interest Redirection Account": "#interestRedirectionAccountSearch",
    "Fees Redirection Account": "#feeRedirectionAccountSearch",
  }
  await this.clickElement(selector[fieldName]);
  await this.attachScreenShot();
});

Then(/^The application will open the Search "(.*)" Lookup Dialog and show all the accounts I am entitled as per business rules$/, async function (fieldName) {
  const selector = {
    "Account": "#accountDialogInlineSearch_dialog",
    "Legal Entity": "#accountOwnerDialogInlineSearch_dialog",
  };
  await this.checkHTMLText(selector[fieldName] + " div[class*='dialog__title']", "Search " + fieldName);
  await this.attachScreenShot();
});

When(/^I am selecting an eligible account from Search Account Lookup Dialog$/, async function () {
  await this.clickElement("div#accountDialogInlineSearch_dialog .slick-viewport .slick-row");
});

When(/^I am not selecting an eligible account from Select Account Number Dropdown$/, async function () {
  await this.checkElementExist("#accountContainer #account_wrapper");
});


Then(/^The application shows previously entered details$/, async function () {
  await this.validatePreviousState();
  await this.attachScreenShot();
});

Then(/^The application shows error message in toast for "(.*)"$/, async function (errorType) {
  const error = errorType;
  await this.checkCSSClassExist('#Notification', 'error-notification', true);
  await this.wait(1000);
  await this.attachScreenShot();
});

When(/^The user perform simple click on a service request in the list screen$/, async function () {
  await this.waitForLoading();
  await this.clickElement(".slick-row.even .slick-cell");
});

Then(/^The application must present the selected "(.*)" service request in non editable mode as per the field matrix$/, async function (reqType) {
  const selector = {
    "Stop Cheque": "#stopChequeRequest",
    "Order Cheque Book": "#orderChequeBook",
    "Order Deposit Book": "#orderDepositBook",
  }
  await this.waitForLoading();
  await this.checkHTMLText(selector[reqType], reqType);
  await this.checkElementExist('#close');
  await this.attachScreenShot();
});

Then(/^The application must present the required Actions buttons$/, async function () {
  await this.checkElementExist('#close');
  await this.checkElementExist('#auditHistory');
});

Then(/^The application must present the Summary information sub-section$/, async function () {
  await this.checkElementExist("#requestSummary");
});

Then(/^The application must present '(.*)' Request with 'Errors and Alerts' subsection on the View Details screen$/, async function (status) {
  const statusText = status;
  await this.waitForLoading();
  await this.checkElementExist("#errorsAndAlerts");
  await this.attachScreenShot();
});

When(/^The user navigated to the "Cash Management Service Requests" screen$/, async function () {
  await this.waitForLoading();
});

Then(/^The application must disable the '(.*)' button$/, async function (button) {
  const buttonId = button;
  await this.waitForLoading();
  await this.attachScreenShot();
});

When(/^The user selects to progress to the "(.*)"$/, async function (paginationTo) {
  const paginationButton = paginationTo === 'Next Record' ? '#nextRecord' : '#prevRecord';
  await this.clickElement(`${paginationButton} button`);
});

Then(/^The application must navigate to the "(.*)" screen$/, async function (screen) {
  if (screen === 'View Service Request List') {
    await this.checkElementExist("#serviceRequests");
    await this.checkElementExist("#summaryGrid-container");
    await this.checkHTMLText('#serviceRequests', "Cash Management Service Requests");
  } else if (screen === 'Service Request View Details') {
    await this.checkElementExist("#auditHistory");
    await this.checkElementExist("#requestSummary");
    await this.checkElementExist("#close");
  } else if (screen === 'Cash Management Service Request') {
    await this.checkHTMLText('#serviceRequest', "Cash Management Service Request");
    await this.checkElementExist("#serviceReqCloseToolbar #cancel");
    await this.checkElementExist("#prodservicecontainer");
  }
  await this.attachScreenShot();
});

Then(/^The application must navigate the user to the Service Request List screen and previous search must be presented$/, async function () {
  await this.waitForLoading();
  await this.checkElementExist('#serviceRequests');
  await this.attachScreenShot();
});
Given(/^For Acceptance Criteria "(.*)"$/, async function (tag) {
  const tagId = tag;
});

Then(/^The application shows "(.*)" Page$/, async function (page) {
  const pageName = page;
  await this.attachScreenShot();
});

When(/^The user selects '(.*)' from Select Account Number Dropdown$/, async function (accountName) {
  await this.waitForLoading();
  await this.clickElement("#accountContainer #account_wrapper");
  await this.sendKeys("#accountContainer #account", accountName, false);
  await this.clickElement("#accountContainer #account_wrapper .Select-option");
  this.setState("account", {
    selector: "#accountContainer #accName",
    value: accountName,
    type: "HTMLText"
  });
});

Then(/^The application will display the Submit Response Dialog with status "(.*)"$/, async function (status) {
  await this.checkElementExist("#submitResponseDialog #okBtn");
  await this.checkHTMLText('#requestStatus', status);
  await this.attachScreenShot();
});

When(/^The user opens "Advance Search Panel"$/, async function () {
  await this.clickElement('#groupMenuBtn button');
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'Enter', true);
  await this.clickElement('#searchToggleBtn button');
});

When(/^The user input "(.*)" with '(.*)' in Advance Search Panel$/, async function (field, value) {
  if (field === 'Request Status') {
    const input = value === 'Unsuccessful' ? 'nsuccessful' : value;
    await this.sendKeys('#status_wrapper input', input + String.fromCharCode(13), false);
    // await this.sendKeys(undefined, 'Enter', true);
  } else if (field === 'Request Type') {
    await this.sendKeys('#type_wrapper input', value + String.fromCharCode(13), false);
    // await this.sendKeys(undefined, 'Enter', true);
  } else if (field === 'Account Name') {
    await this.clickElement('#accAliasName-field button');
    await this.sendKeys(undefined, 'ArrowDown', true);
    await this.sendKeys(undefined, 'ArrowDown', true);
    await this.sendKeys(undefined, 'Enter', true);
    await this.setTextInputValue("accAliasName", value);
  } else if (field === 'Legal Entity') {
    await this.sendKeys('#legalEntityName', value + String.fromCharCode(13), false);
  }
});

When(/^The user Clicks the "Search" button in Advance Search Panel$/, async function () {
  await this.setCurrentDateToCreationDate();
  await this.clickElement('#summaryGrid-search');
  await this.waitForLoading();
});

When(/^The user click the '(.*)' record on a service request in the list screen$/, async function (row) {
  await this.waitForLoading();
  if (row === 'first')
    await this.clickElement(".slick-row[style='top:0px'] .r0");
  else if (row === 'last') {
    await this.clickElement(".slick-row:last-child .r0");
  }
  await this.waitForLoading();
});

Then(/^The Search "(.*)" lookup dialog box must be hidden$/, async function (fieldName) {
  const selector = {
    "Account": "#accountDialogInlineSearch_dialog",
    "Legal Entity": "#accountOwnerDialogInlineSearch_dialog",
    "Settlement Account": "#accountDialogInlineSearch_dialog",
  }
  await this.checkElementNotExist(selector[fieldName]);
  await this.attachScreenShot();
});

When(/^The user closes the Search "(.*)" dialog box$/, async function (fieldName) {
  await this.clickElement("#accountDialogInlineSearch_dialog #cancelBtn");
});

When(/^The user types in "(.*)" into the Search "(.*)" lookup$/, async function (accountName, fieldName) {
  let selector = "#accountDialogInlineSearchFilterInput";
  if (fieldName === "Legal Entity") {
    selector = "#accountOwnerDialogInlineSearchFilterInput";
  };
  await this.clickElement(selector);
  await this.sendKeys(selector, accountName, false);
  await this.checkElementValue(selector, accountName);
});

Then(/^The application must present the "(.*)" selection dropdown which is defaulted to BLANK$/, async function (reqType) {
  const selector = {
    "Operating Accounts": {
      tag: '#account_wrapper div[class*="styled-autocomplete"]',
      text: 'Select Account Number',
    },
    "Account Details": {
      tag: '#closeAccount_wrapper div[class*="styled-autocomplete"]',
      text: 'Select Account Number',
    },
    "Legal Entity": {
      tag: '#legalEntity_wrapper div[class^="Select-placeholder"]',
      text: 'Select Account Owner',
    },
    "Account Type": {
      tag: '#accountTypeKey',
      text: '',
    }
  };
  await this.checkHTMLText(selector[reqType].tag, selector[reqType].text);
  await this.attachScreenShot();
});

When(/^The user types "(.*)" into the "(.*)" selection drop down$/, async function (inputVal, wrapper) {
  if (inputVal === "something valid" && wrapper === "Operating Accounts") {
    await this.clickElement("#accountContainer #account_wrapper");
    await this.sendKeys("#accountContainer #account", "1", false);
  } else {
    const containers = {
      "Legal Entity": "#legalEntity_wrapper",
      "Copy from Account": "#prePopAcctId_wrapper",
      "Accounts": "#closeAccount_wrapper",
      "Settlement Account": "#settlementAccount_wrapper",
      "Redirection Account": "#redirectionAccount_wrapper",
      "Operating Accounts": "#account_wrapper",
      "Statement Delivery Address": "#deliveryAddress_wrapper",
    };
    await this.clickElement(containers[wrapper]);
    await this.sendKeys(containers[wrapper] + " div[class^= 'Select-input'] input", inputVal, false);
    // await this.clickElement(containers[wrapper] + " .Select-option");
  }
});

When(/^The user selects to 'View Audit History' for the service request$/, async function () {
  await this.clickElement("#auditHistory button");
});

Then(/^The application must present the audit popup as per the field matrix$/, async function () {
  await this.waitForLoading();
  await this.checkHTMLText("#auditHistoryDialog div[class*='dialog__header'] div[class*='dialog__title']", 'Service Request Audit History');
  await this.attachScreenShot();
});

When(/^The user selects to close the audit popup$/, async function () {
  await this.clickElement("#auditHistoryDialog button");
});

Then(/^The application must close the audit popup and return the user to the Service Request view detail screen$/, async function () {
  await this.checkElementNotExist('#auditHistoryDialog');
  await this.attachScreenShot();
});
