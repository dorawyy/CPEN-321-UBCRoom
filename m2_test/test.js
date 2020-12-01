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

const mocked_recommendation_good = jest.fn(cb => cb([{
    price: 3000,
    location: "PV",
    types: "1",
    phone: "1",
    email: "1",
    descript: "1"
    }]));
const mocked_recommendation_empty = jest.fn(cb => cb([]));
  
  describe("Module2", () => {
    var {mylogic} = require("../mylogic");
    var {app} = require("../app_logic");
    test("good recommendation", done => {
      mocked_recommendation_good((arr)=>{
        var re = [];
        var ids = arr;
        mylogic(re,ids,1,()=>{
          expect(re[0].price).toBe(3000);
          expect(re[0].location).toBe("PV");
          expect(re[0].types).toBe("1");
          expect(re[0].phone).toBe("1");
          expect(re[0].email).toBe("1");
          expect(re[0].descript).toBe("1");
          done();
        }, 1);
      });
    });
    test("no history", done => {
      mocked_recommendation_empty((arr)=>{
        var re = [];
        var ids = arr;
        mylogic(re,ids,1,()=>{
          expect(re).toStrictEqual([]);
          done();
        }, 0);
      });
    });
    test("test api", done => { 
      mocked_recommendation_empty((arr)=>{
        request(app)
          .get('/logic')
          .then(response => {
              expect(response.text.includes("\"price\":3000,\"location\":\"PV\",\"types\":\"1\",\"phone\":\"1\",\"email\":\"1\",\"descript\":\"1\"")).toBe(true);
              expect(response.statusCode).toBe(200);
              done();
          });
      });
      
    })
  });