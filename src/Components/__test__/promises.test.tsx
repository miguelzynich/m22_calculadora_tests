const request = require('supertest');
const app = require('../server');

test('should get currency data from the API', async () => {
  const response = await request(app).get('/api/currency-data');

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('rates');
  expect(response.body.rates).toHaveProperty('USD');
  expect(response.body.rates).toHaveProperty('EUR');
});
