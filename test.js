const { expect } = require("@jest/globals");
const request = require("supertest");
const app = require("./app");

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017",
    { useUnifiedTopology: true },
    (err, client) =>{
        db = client.db("list");
    }
);

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

describe("Test the root path", () => {
  test("test get", done => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.text).toBe("data:");
        expect(response.statusCode).toBe(200);
        done();
      }); 
  });
  test("test POST", done => {
    request(app)
      .post('/')
      .send(postdata)
      .then(response => {
        expect(response.text).toBe("{\"message\":\"price:3000  location:PV\"}");
        expect(response.statusCode).toBe(200);
        done();
      });
   
  });
  
  
  test("test search post", done => {
    request(app)
      .post('/search')
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
   
  });
  test("test search get", done => { 
    request(app)
        .get('/search')
        .then(response => {
            expect(response.text.includes("\"price\":3000,\"location\":\"PV\",\"types\":\"1\",\"phone\":\"1\",\"email\":\"1\",\"descript\":\"1\"")).toBe(true);
            expect(response.statusCode).toBe(200);
            done();
        });
  });

  test("test complex logic get", done => { 
    request(app)
        .get('/logic')
        .then(response => {
            //expect(response.text).toBe("test");
            expect(response.statusCode).toBe(200);
            done();
        });
  });
  


  // test("test search first time with mock", done => {
  //   request(app)
  //     .get('/testsearch')
  //     .then(response => {
  //       expect(response.text).toBe("[{\"price\":3000,\"location\":\"PV\",\"types\":\"1\",\"phone\":\"1\",\"email\":\"1\",\"descript\":\"1\"}]");
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  // });
  // test("test search second time with mock", done => {
  //   request(app)
  //     .get('/testsearch')
  //     .then(response => {
  //       expect(response.text).toBe("[{\"price\":3000,\"location\":\"PV\",\"types\":\"1\",\"phone\":\"1\",\"email\":\"1\",\"descript\":\"1\"},{\"price\":3000,\"location\":\"PV\",\"types\":\"1\",\"phone\":\"1\",\"email\":\"1\",\"descript\":\"1\"}]");
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  // });

});