const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 404 ', () => {
    // eslint-disable-next-line no-undef
    return supertest(app)
      .get('/')
      .expect(404);
  });
});