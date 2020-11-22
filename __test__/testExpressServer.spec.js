const request = require('supertest')
const app = require('../src/server/index')
const agent = request(app);


beforeAll(function (done) {
    app.on("appStarted", function(){
        done();
    });
});

describe('Post Endpoints', () => {
  it('should create a new post', async (done) => {
    const res = await agent
      .post('/geoAPI')
      .send({
        city: 'Meran',
        date: '2020-12-24',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('daysUntil', 'picture','weather','geoData')
    done()
  })
})