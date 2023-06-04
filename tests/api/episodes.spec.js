// @ts-check
const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');


test("All episodes sorted by id", async ({ request, baseURL }) => {
  allure.story("Rick and Morty. Episodes");
  const response = await request.get(`${baseURL}/episode`);

  await test.step(`Expect status code equals 200`, async () => {
    expect(response.status()).toEqual(200);
  });

  let episodes = (await response.json()).results;
  let ids = [];
  for (var i = 0; i < episodes.length; i++) {
    ids.push(episodes[i].id);
  }
  let sortEpisodes = ids.sort();
  expect(ids).toEqual(sortEpisodes);
});
