// import chai module
const chai = require("chai");
// import chai http
const chaiHttp = require("chai-http");
// import server
const server = require("../app");

// chai should() assertion style
chai.should();
// chai middleware to allow us make request
chai.use(chaiHttp);

// We are testing GET all events Request API 
describe("Test API", () => {
  
  it("Get request", (done) => {
    chai
      .request(server)
      .get("/api/events")
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
