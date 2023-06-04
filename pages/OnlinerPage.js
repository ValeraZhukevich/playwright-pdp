const { test, expect } = require('@playwright/test')

exports.OnlinerPage = class OnlinerPage {
    constructor(page) {
        this.page = page;
    }

    async openOnliner() {
        await test.step(`Open onliner.by`, async () => {
            await this.page.goto('/');
        });
    }

    async typeInSearchField(product) {
        await test.step(`Type "${product}" in search field`, async () => {
            await this.page.fill('.fast-search__input', product);
        });
    }

    async chooseFirstCategory() {
        await test.step(`Choose first category in search result`, async () => {
            await this.page.frameLocator('#fast-search-modal iframe').locator('a.category__title').click();
        });
    }

    async selectCheckBox(checkboxName) {
        await test.step(`Select "${checkboxName}" checkbox`, async () => {
            await this.page
                .locator(`(//span[@class="schema-filter__checkbox-text" and text()="${checkboxName}"])[1]`)
                .click();
        });
    }

    async chooseFirstProduct() {
        await test.step(`Choose first product in search result`, async () => {
            await this.page.locator(".schema-product__title").first().click();
        });
    }

    async productShouldHasTitle(title) {
        await test.step(`Product should has "${title}" title`, async () => {
            await expect(this.page.locator('.catalog-masthead__title.js-nav-header')).toContainText(title);
        });
    }

    async allResultsShouldHaveText(productName) {
        await test.step(`Verify that all results have appropriate values '${productName}'`, async () => {
            const results = await this.page.frameLocator('.modal-iframe')
                .locator('a.product__title-link');
            for (let i = 0; i < await results.count(); i++) {
                const element = await results.nth(i).toContainText(`${productName}`);
            }
        });
    }

}
