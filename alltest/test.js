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


const mocked_Search_GET_good = jest.fn(cb => cb(3000, "PV", "1"));
const mocked_Search_GET_bad1 = jest.fn(cb => cb(5000, "", ""));
const mocked_Search_GET_bad2 = jest.fn(cb => cb(-9999999, "1", "1"));
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