const { Given, When, Then } = require("cucumber");


// Scenario: Request Types options
When(/^The user navigated to the service request screen$/, async function () {
  await this.waitForLoading();
  await this.clickElement('#addNewBtn button');
});
Then(/^The application shows Service Request Types$/, async function () {
  await this.checkElementExist('#content #stopChequeRequest');
  await this.attachScreenShot();
});

When(/^The user Clicks the "(.*)" button from Service Type$/, async function (requestType) {
  let buttonId = '';
  if (requestType === 'Stop Cheque Request') {
    buttonId = 'a#stopChequeRequest';
  } else if (requestType === 'Order Deposit Book') {
    buttonId = 'a#orderDepositBook';
  } else if (requestType === 'Order Cheque Book') {
    buttonId = 'a#orderChequeBook';
  }
  await this.clickElement(buttonId);
});
Then(/^The application must display the "(.*)" screen$/, async function (requestType) {
  await this.waitForLoading();
  let domId = '';
  if (requestType === 'Stop Cheque Request') {
    domId = '#content #stopChequeRequest';
  } else if (requestType === 'Order Deposit Book') {
    domId = '#content #orderDepositBook';
  } else if (requestType === 'Order Cheque Book') {
    domId = '#content #orderChequeBook';
  }
  await this.checkElementExist(domId);
  await this.attachScreenShot();
});
