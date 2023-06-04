// @ts-check
const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

const characters = ['Rick Sanchez', 'Morty Smith', 'Beth Smith', 'Jerry Smith', 'Summer Smith'];

for (const character of characters) {
  test(`Get character by name "${character}"`, async ({ request, baseURL }) => {
    allure.story("Rick and Morty. Character");
    const response = await request.get(`${baseURL}/character`, {
      params: {
        'name': `${character}`
      }
    });

    await test.step(`Expect status code equals 200`, async () => {
      expect(response.status()).toEqual(200);
    });

    let characters = (await response.json()).results;

    for (const person of characters) {
      await test.step(`Expect every person in response has "${character}" name`, async () => {
        expect(person.name).toEqual(`${character}`);
      });
    }
  });
}