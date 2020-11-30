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