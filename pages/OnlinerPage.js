const { expect } = require('@playwright/test')

exports.OnlinerPage = class OnlinerPage {
    constructor(page){
        this.page = page;
    }

    async typeInSearchField(product){
        await this.page.fill('.fast-search__input', product);
    }

    async chooseFirstCategory(){
        await this.page.frameLocator('#fast-search-modal iframe').locator('a.category__title').click();
    }

    async selectCheckBox(checkboxName){
        await this.page
        .locator(`(//span[@class="schema-filter__checkbox-text" and text()="${checkboxName}"])[1]`).click();
    }

    async chooseFirstProduct(){
        await this.page.locator(".schema-product__title").first().click();
    }

    async productShouldHasTitle(title){
        await expect(this.page.locator('.catalog-masthead__title.js-nav-header')).toContainText(title);
    }

    


}