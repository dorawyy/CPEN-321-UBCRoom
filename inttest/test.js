const { expect } = require("@jest/globals");
const { report } = require("superagent");
const request = require("supertest");





var postdata = {
  price: 3000,
  location: "PV",
  types: "1",
  phone: "1",
  email: "1",
  descript: "1",
  image:"url",
  token:"e_Jwz5wJTtmenW_EGnSwLg:APA91bEUz-5zncQLjUTnVzX5RiTlXkabiFOFndiUE_ux7J1Za0B2IlPmqep7EzGZFoW5OUOSZpDilltUUD0Mwoa34WvuQ-OZ0PPhEGlBDWKfc63bKZDm0a65Cbv4qcH6_h_VFO3XO3R-"
  };
var data = {
    price: 3000,
    location: "PV",
    types: "1",
    };

describe("inttest", () => {
  test("test GET", done => {
    var {app} = require("../app_post");
    request(app)
      .get('/')
      .then(response => {
        expect(response.text).toBe("data:");
        expect(response.statusCode).toBe(200);
        done();
      }); 
  });
  test("test POST", done => {
    var {app} = require("../app_post");
    request(app)
      .post('/')
      .send(postdata)
      .then(response => {
        expect(response.text).toBe("{\"message\":\"price:3000  location:PV\"}");
        expect(response.statusCode).toBe(200);
        done();
      });
   
  });
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

  test("test complex logic GET", done => { 
    var {app} = require("../app_logic");
    request(app)
        .get('/logic')
        .then(response => {
            expect(response.text.includes("\"price\":3000,\"location\":\"PV\",\"types\":\"1\",\"phone\":\"1\",\"email\":\"1\",\"descript\":\"1\"")).toBe(true);
            expect(response.statusCode).toBe(200);
            done();
        });
  })
  
});