// @ts-check
const { test, expect } = require('@playwright/test');

const characters = ['Rick Sanchez', 'Morty Smith', 'Beth Smith', 'Jerry Smith', 'Summer Smith'];

for (const character of characters) {
  test(`Api tests with ${character} character`, async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/character`, {
      params: {
        'name': `${character}`
      }
    });
    expect(response.status()).toEqual(200);
    let characters = (await response.json()).results;
  
    for(const person of characters){
      expect(person.name).toEqual(`${character}`);
    }
  });
}