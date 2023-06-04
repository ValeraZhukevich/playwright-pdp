// @ts-check
const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

const locations = [
  { "id": "1", "name": "Earth (C-137)" },
  { "id": "2", "name": "Abadango" },
  { "id": "3", "name": "Citadel of Ricks" },
  { "id": "4", "name": "Worldender's lair" },
  { "id": "5", "name": "Anatomy Park" }
];

for (const location of locations) {
  test(`Get location by "${location.id} id"`, async ({ request, baseURL }) => {
    allure.story("Rick and Morty. Location");
    const response = await request.get(`${baseURL}/location/${location.id}`);

    await test.step(`Expect status code equals 200`, async () => {
      expect(response.status()).toEqual(200);
    });

    let locationName = (await response.json()).name;
    await test.step(`Expect location has "${locationName}" name`, async () => {
      expect(locationName).toEqual(`${location.name}`);
    });

  });
}