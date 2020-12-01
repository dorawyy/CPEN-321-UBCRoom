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

  describe("logicinttest", () => {
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