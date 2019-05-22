const helper = require("./helper");
const { setDefaultTimeout, After, AfterAll, Before, Status } = require("cucumber");

setDefaultTimeout(async function () {
  setDefaultTimeout(60 * 1000);
});

Before(async function () {
  if (!helper.page) {
    await this.loginToApplication();
  } else {
    await this.gotoHomePage();
  }
});

After(async function (testCase) {
  if (testCase.result.status === Status.FAILED) {
    await this.attachScreenShot();
  }
});

AfterAll(async function () {
  helper.browser && helper.browser.close();
})
