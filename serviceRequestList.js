const { Given, When, Then } = require("cucumber");
const helper = require("../support/helper");
// Scenario: Service Request List - Grid Actions
When(/^I Click one of the column to sort Grid Data$/, async function () {
  await this.clickElement('#summaryGrid_wrap .ui-state-default.slick-header-sortable');
});
Then(/^The application shows sorting indicator and sort Grid Data$/, async function () {
  await this.checkElementExist('#summaryGrid_wrap .ui-state-default.slick-header-sortable.slick-header-column-sorted');
  await this.attachScreenShot();
});

When(/^I Right Click on Column Header and uncheck a column$/, async function () {
  await this.rightClickElement('#summaryGrid_wrap .ui-state-default.slick-header-column');
  await this.clickElement('#slickColumnpicker_summaryGrid ul li input');
});
Then(/^The application hide the column in Grid$/, async function () {
  await this.attachScreenShot();
});

When(/^I Right Click on Column Header and Click "Fit to Columns to Window"$/, async function () {
  await this.rightClickElement('#summaryGrid_wrap .ui-state-default.slick-header-column');
  await this.clickElement('#slickColumnpicker_summaryGrid ul li span#forceFitColumns');
});
Then(/^The application resize the Colums, I able to see all columns without Horizontal Scroll$/, async function () {
  await this.attachScreenShot();
});

When(/^I Right Click on Column Header and Click "Reset Grid Columns"$/, async function () {
  // hack to make it work
  await this.page.goto(`${helper.UI_PROJECT_HOST}`);
  await this.waitForLoading();
  await this.rightClickElement('#summaryGrid_wrap .ui-state-default.slick-header-column');
  await this.clickElement('#slickColumnpicker_summaryGrid ul li span#restColumns');
});
Then(/^The application resize the Colums, I ablet to see columns and may see Horizontal Scroll$/, async function () {
  await this.attachScreenShot();
});

// Scenario: Grid advanced search / Filter
When(/^The user click View menu to view all Filters$/, async function () {
  await this.clickElement('#savedSearch button');
});
Then(/^The application must default the fields as per the field matrix and default the search option$/, async function () {
  await this.attachScreenShot();
  await this.clickElement('#savedSearch button');
});
When(/^The user Click '(.*)' Filter$/, async function (viewFilter) {
  let moveDownTime = 1;
  if (viewFilter === 'My Requests') moveDownTime = 2;
  if (viewFilter === 'Requests Awaiting Approval') moveDownTime = 3;
  if (viewFilter === 'Requests Requring Action') moveDownTime = 4;
  if (viewFilter === 'Pending') moveDownTime = 5;
  if (viewFilter === 'Successful') moveDownTime = 6;
  if (viewFilter === 'Unsuccessful') moveDownTime = 7;
  await this.clickElement('#savedSearch button');
  for (let i = 1; i <= moveDownTime; i++) {
    await this.sendKeys(undefined, 'ArrowDown', true);
  }
  await this.sendKeys(undefined, 'Enter', true);
  await this.waitForLoading();
});
Then(/^The application fetch the Service Request List based on Filter Params$/, async function () {
  await this.clickElement('#savedSearch button');
  await this.attachScreenShot();
  await this.clickElement('#savedSearch button');
});

When(/^The user Select One of the Request Status from Advance Search and hit search$/, async function () {
  await this.clickElement('#savedSearch button');
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'Enter', true);
  await this.waitForLoading();

  await this.clickElement('#searchToggleBtn button');
  await this.sendKeys('#status_wrapper input', 'Successful' + String.fromCharCode(13), false);
  await this.clickElement('#summaryGrid-search');
});
Then(/^The application fetch the Service Request List based on selected Filter Params$/, async function () {
  await this.waitForLoading();
  await this.attachScreenShot();
});

When(/^The user selects Advanced 'Search'$/, async function () {
  await this.waitForLoading();
});
When(/^The user enters few search criteria$/, async function () {
  await this.clickElement('#savedSearch button');
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'Enter', true);
  await this.waitForLoading();
  await this.clickElement('#searchToggleBtn button');
  await this.sendKeys('#type_wrapper input', 'Order Cheque Book' + String.fromCharCode(13), false);
});
When(/^The user hit Search$/, async function () {
  await this.clickElement('#summaryGrid-search');
});
When(/^The user selects to 'Reset' the advanced search criteria$/, async function () {
  await this.clickElement('#summaryGrid-reset');
  await this.waitForLoading();
});
When(/^Then user Clicking 'Save' with few search criteria and SearchName as "(.*)"$/, async function (searchName) {
  await this.sendKeys('#type_wrapper input', 'Order Cheque Book' + String.fromCharCode(13), false);
  await this.clickElement('#summaryGrid-save');
  const searchNameInput = searchName + '-' + Math.floor(Math.random() * 100000);
  await this.sendKeys('#summaryGrid-save-name', searchNameInput, false)
  await this.clickElement('#summaryGrid-save-saveBtn');
});
When(/^The user Clicking 'Manage Saved Search' from View$/, async function () {
  await this.clickElement('#savedSearch button');
  for (let i = 1; i <= 9; i++) {
    await this.sendKeys(undefined, 'ArrowDown', true);
  }
  await this.sendKeys(undefined, 'Enter', true);
});
Then(/^The application must present the 'Advanced Search Panel' with search options as per the field matrix$/, async function () {
  this.checkElementExist("div [class*='grid-search-panel'] #id_wrapper");
  this.checkElementExist("div [class*='grid-search-panel'] #accNum");
  this.checkElementExist("div [class*='grid-search-panel'] #accAliasName");
  this.checkElementExist("div [class*='grid-search-panel'] #legalEntityName");
  this.checkElementExist("div [class*='grid-search-panel'] #legalEntityName");
  this.checkElementExist("div [class*='grid-search-panel'] #createdDt");
  this.checkElementExist("div [class*='grid-search-panel'] #requestor");
  this.checkElementExist("div [class*='grid-search-panel'] #approvedBy");
  this.checkElementExist("div [class*='grid-search-panel'] #lastStatusUpdDt");
  this.checkElementExist("div [class*='grid-search-panel'] #completedDt");
  this.checkElementExist("div [class*='grid-search-panel'] #status_wrapper");
  this.checkElementExist("div [class*='grid-search-panel'] #type_wrapper");
  await this.attachScreenShot();
});
Then(/^The application keeps the search criteria$/, async function () {
  await this.waitForLoading();
  await this.attachScreenShot();
});
Then(/^The application must clear all search criteria entered eariler and set search criteria to default values$/, async function () {
  await this.waitForLoading();
  await this.attachScreenShot();
});
Then(/^The application Saved search must be available in Folder list under 'Select A Search' option$/, async function () {
  await this.waitForLoading();
  await this.clickElement('#savedSearch button');
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'ArrowRight', true);
  await this.attachScreenShot();
  await this.clickElement('#Close');
});
Then(/^The application must show 'Manage Saved Search' Dialog to Manage user Saved Search and show option to rename or delete existing user defined searches$/, async function () {
  await this.page.focus('#ManagedSavedSearch-dialog .editable-list-item input');
  await this.attachScreenShot();
  await this.clickElement("#ManagedSavedSearch-dialog #cancelBtn");
});

When(/^I navigate to Advanced Search panel in Service Request List screen and select few criteria and click 'Search' button$/, async function () {
  await this.waitForLoading();
  await this.sendKeys('#type_wrapper input', 'Order Cheque Book' + String.fromCharCode(13), false);
  await this.clickElement('#summaryGrid-search');
});
When(/^I am entering Request ID as "(.*)" as Search Paramaters$/, async function (input) {
  await this.clickElement('#savedSearch button');
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'Enter', true);
  await this.waitForLoading();
  await this.clickElement('#searchToggleBtn button');
  await this.sendKeys('#id_wrapper input', input + String.fromCharCode(13), false);
  await this.clickElement('#summaryGrid-search');
});
Then(/^The application must display filtered SRs \(based on search criteria selected\) in List screen grid$/, async function () {
  await this.checkElementExist('.slick-row');
  await this.waitForLoading();
  await this.attachScreenShot();
});
Then(/^The application show no rows in the grid. Instead, standard message must be displayed$/, async function () {
  await this.waitForLoading();
  await this.checkElementNotExist('.slick-row');
  await this.checkHTMLText("#summaryGridMessage div[class^='grid-overlay']", "No records found!");
  await this.attachScreenShot();
});
When(/^I am entering some Search Parameters$/, async function () {
  await this.waitForLoading();
  await this.clickElement('#savedSearch button');
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'Enter', true);
  await this.waitForLoading();
  await this.clickElement('#searchToggleBtn button');
  await this.sendKeys('#type_wrapper input', 'Order Cheque Book' + String.fromCharCode(13), false);
});
When(/^The application may not available to serve the request$/, async function () {
  await this.sendKeys('#id_wrapper input', 'SHOW-API-ERROR' + String.fromCharCode(13), false);
  await this.clickElement('#summaryGrid-search');
});

// Scenario: Service Request List - Grid Filter Action
Then(/^The application shows the "(.*)" button$/, async function (button) {
  const buttonMap = { Filter: '#filterToggleBtn', Export: '#exportBtn', Refresh: '#refreshBtn', Group: '#groupMenuBtn' };
  await this.checkElementExist(buttonMap[button]);
  await this.attachScreenShot();
});

Then(/^The application show quick search input box for each of the grid columns$/, async function attachScreenShot() {
  await this.attachScreenShot();
});

When(/^The User key in few characters in quick search input box of one of the grid columns$/, async function () {
  await this.clickElement('#refreshBtn button');
  await this.waitForLoading();
  await this.sendKeys('.slick-headerrow-column.l0.r0 input', "SCR", false);
});

Then(/^The grid must be filtered to display only those rows which have matching values in the searched column$/, async function () {
  await this.attachScreenShot();
});

When(/^The User key in few characters in quick search input box of any two of the grid columns$/, async function () {
  await this.sendKeys('.slick-headerrow-column.l1.r1 input', "123456202", false);
});

When(/^The User key in few not matching characters in quick search input box of one of the grid columns$/, async function () {
  await this.sendKeys('.slick-headerrow-column.l2.r2 input', "test", false);
});

Then(/^The grid must not display any rows in the grid$/, async function () {
  await this.attachScreenShot();
});

// Scenario: Service Request List - Grid Export Action
// covered

// Scenario: Service Request List - Grid Refresh Action
Then(/^The application shows latest data in the grid$/, async function () {
  await this.attachScreenShot();
});

Then(/^The application shows Export button as selected$/, async function () {
  await this.attachScreenShot();
});

// Scenario: Service Request List - Grid Group Action
When(/^The user select a "(.*)" group option$/, async function (option) {
  const options = { 'Off': 1, 'Account Name': 2, 'Account Number': 3, 'Created By': 4, 'Legal Entity': 5, 'Request Status': 6, 'Request Type': 7, 'Collapse All': 8, 'Expand All': 9, 'Collapse By Default': 10 }
  const optionIndex = options[option];
  await this.clickElement('#groupMenuBtn button');
  for (let i = 1; i <= optionIndex; i++) {
    await this.sendKeys(undefined, 'ArrowDown', true);
  }
  await this.sendKeys(undefined, 'Enter', true);
});

Then(/^The application shows all Grouping options$/, async function () {
  await this.attachScreenShot();
  await this.clickElement('#groupMenuBtn button');
});

Then(/^The application shows service requests grouped based on "(.*)"$/, async function (option) {
  const optionSelected = option;
  await this.clickElement('#groupMenuBtn button');
  await this.attachScreenShot();
  await this.clickElement('#groupMenuBtn button');
});

Then(/^The application shows service request rows as "(.*)" under each grouping option value$/, async function (filterOption) {
  const option = filterOption;
  await this.clickElement('#groupMenuBtn button');
  await this.attachScreenShot();
  await this.clickElement('#groupMenuBtn button');
});

//DIGS-367

Then(/^The application must show the Settings button$/, async function () {
  await this.checkElementExist("#settingMenuBtn");
  await this.attachScreenShot();
});

When(/^The user saves the filter settings$/, async function () {
  await this.clickElement('#settingMenuBtn button');
  await this.sendKeys(undefined, 'ArrowDown', true);
  await this.sendKeys(undefined, 'Enter', true);
  await this.waitForLoading();
});

Then(/^The Grid with the filtered results must be saved$/, async function () {
  await this.waitForLoading();
  await this.checkElementExist("#summaryGrid-container div[class^='slick-cell']");
  await this.attachScreenShot();
});

Then(/^The Grid must display the results as per the last saved settings$/, async function () {
  await this.waitForLoading();
  await this.attachScreenShot();
});