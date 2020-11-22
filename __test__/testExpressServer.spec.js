const request = require('supertest')
const app = require('../src/server/index')
const agent = request(app);

//Making sure that server is up and running before starting the test
beforeAll(function (done) {
    app.on("appStarted", function(){
        done();
    });
});

describe('Testing express server', () => {
  it('Check if server response matches the expected response', async (done) => {
    const res = await agent
      .post('/getServerData')
      .send({
        city: 'Meran',
        date: '2020-12-24',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('daysUntil', 'picture','weather','geoData')
    done()
  })
})