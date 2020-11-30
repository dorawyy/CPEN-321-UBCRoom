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



describe("postinttest", () => {
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
  });