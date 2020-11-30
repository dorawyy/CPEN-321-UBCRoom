const { expect } = require("@jest/globals");
const { report } = require("superagent");
const request = require("supertest");

var postdata = {
  price: 3000,
  location: "PV",
  types: "1",
  phone: "1",
  email: "1",
  descript: "1"
  };
var data = {
  price: 3000,
  location: "PV",
  types: "1",
  };

describe("searchinttest", () => {
  test("test search POST", done => {
    var {app} = require("../app_search");
    request(app)
      .post('/search')
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
   
  });
  test("test search GET", done => { 
    var {app} = require("../app_search");
    request(app)
        .get('/search')
        .then(response => {
            expect(response.text.includes("\"price\":3000,\"location\":\"PV\",\"types\":\"1\",\"phone\":\"1\",\"email\":\"1\",\"descript\":\"1\"")).toBe(true);
            expect(response.statusCode).toBe(200);
            done();
        });
  });

  test("test empty search POST", done => {
    var {app} = require("../app_search");
    request(app)
      .post('/search')
      .send({price: "",
        location: "",
        types: ""})
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
   
  });
  test("test empty search GET", done => { 
    var {app} = require("../app_search");
    request(app)
        .get('/search')
        .then(response => {
            expect(response.statusCode).toBe(401);
            done();
        });
  });
  test("test empty result POST", done => {
    var {app} = require("../app_search");
    request(app)
      .post('/search')
      .send({price: "5000",
        location: "PV",
        types: "1"})
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
   
  });
  test("test empty result GET", done => { 
    var {app} = require("../app_search");
    request(app)
        .get('/search')
        .then(response => {
            expect(response.statusCode).toBe(402);
            done();
        });
  });
});