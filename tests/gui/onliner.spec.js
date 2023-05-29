// @ts-check
const { test, expect } = require('@playwright/test');
const { OnlinerPage } = require('../../pages/OnlinerPage');


test('Onliner Lego test', async ({ page }) => {
  const onlinerPage = new OnlinerPage(page);
  await page.goto('/');
  await onlinerPage.typeInSearchField('Lego');
  await onlinerPage.chooseFirstCategory();
  await onlinerPage.selectCheckBox('Star Wars');
  await onlinerPage.chooseFirstProduct();
  await onlinerPage.productShouldHasTitle('LEGO Star Wars 75192 Сокол Тысячелетия');
});

test.afterAll(async ({ browser }) => {
  await browser.close();
});
