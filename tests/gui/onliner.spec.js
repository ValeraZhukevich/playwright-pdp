// @ts-check
const { test, expect } = require('@playwright/test');
const { OnlinerPage } = require('../../pages/OnlinerPage');


test('Onliner Lego test', async ({ page }) => {
  test.setTimeout(60000);
  const onlinerPage = new OnlinerPage(page);
  await onlinerPage.openOnliner();
  await onlinerPage.typeInSearchField('Lego');
  await onlinerPage.chooseFirstCategory();
  await onlinerPage.selectCheckBox('Star Wars');
  await onlinerPage.chooseFirstProduct();
  await onlinerPage.productShouldHasTitle('LEGO Star Wars 75192 Сокол Тысячелетия');
});

const products = ['Пылесос', 'Наушники', 'Велосипед'];
for (const product of products) {
  test(`Check search result by searching "${product}"`, async ({ page }) => {
    const onlinerPage = new OnlinerPage(page);
    await onlinerPage.openOnliner();
    await onlinerPage.typeInSearchField(product);
    onlinerPage.allResultsShouldHaveText(product);
  });
}

test.afterAll(async ({ browser }) => {
  await browser.close();
});
