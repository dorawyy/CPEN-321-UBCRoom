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

    const mocked_Search_GET_good = jest.fn(cb => cb(3000, "PV", "1"));
    const mocked_Search_GET_bad1 = jest.fn(cb => cb(5000, "", ""));
    const mocked_Search_GET_bad2 = jest.fn(cb => cb(5000, "1", "1"));
    describe("Module1", () => {
      var {mysearch} = require("../mysearch");
      var {app} = require("../app_search");
      test("test search good POST", done => {
        mocked_Search_GET_good((s_price, s_location, s_types)=> {
          request(app)
          .post('/search')
          .send({
            price: s_price,
            location: s_location,
            types: s_types,
            })
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
        });
      });
      test("test search good GET", done => { 
          request(app)
              .get('/search')
              .then(response => {
                  expect(response.text.includes("\"price\":3000,\"location\":\"PV\",\"types\":\"1\",\"phone\":\"1\",\"email\":\"1\",\"descript\":\"1\"")).toBe(true);
                  expect(response.statusCode).toBe(200);
                  done();
              });
      });
      test("good search conditions", done => {
        mocked_Search_GET_good((s_price, s_location, s_types)=> {
          mysearch(s_price, s_location, s_types, 
            (err, data) => {
                expect(data[0].price).toBe(s_price);
                expect(data[0].location).toBe(s_location);
                expect(data[0].types).toBe(s_types);
                done();
            }, 
            ()=>{
              var bo = (s_price == "" || s_location == "" || s_types == "");
              expect(bo).toBe(true);done();
            }
            );
          });
      });
      test("empty search conditions POST", done => {
        mocked_Search_GET_bad1((s_price, s_location, s_types)=> {
          request(app)
          .post('/search')
          .send({
            price: s_price,
            location: s_location,
            types: s_types,
            })
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
        });
      });
      test("empty search conditions GET", done => { 
        request(app)
            .get('/search')
            .then(response => {
                expect(response.statusCode).toBe(401);
                done();
            });
      });
      test("empty search conditions", done => {
        mocked_Search_GET_bad1((s_price, s_location, s_types)=> {
        mysearch(s_price, s_location, s_types, 
          (err, data) => {
              expect(data[0].price).toBe(s_price);
              expect(data[0].location).toBe(s_location);
              expect(data[0].types).toBe(s_types);
              done();
            }, 
          ()=>{
            var bo = (s_price == "" || s_location == "" || s_types == "");
            expect(bo).toBe(true);done();
          }
          );
        });
      });
      
      test("empty search result POST", done => {
        mocked_Search_GET_bad2((s_price, s_location, s_types)=> {
          request(app)
          .post('/search')
          .send({
            price: s_price,
            location: s_location,
            types: s_types,
            })
          .then(response => {
            expect(response.statusCode).toBe(200);
            done();
          });
        });
       
      });
      test("empty search result GET", done => { 
        request(app)
            .get('/search')
            .then(response => {
                expect(response.statusCode).toBe(402);
                done();
            });
      });
      test("empty search result", done => {
        mocked_Search_GET_bad2((s_price, s_location, s_types)=> {
        mysearch(s_price, s_location, s_types, 
          (err, data) => {
              expect(data.length).toBe(0);
              done();
          }, 
          ()=>{
            var bo = (s_price == "" || s_location == "" || s_types == "");
            expect(bo).toBe(true);done();
          }
          );
        });
      });
      
    });