var express = require("express");
const { exec } = require("child_process");
var app = express();
app.use(express.json());
var db;
var s_price, s_location, s_types;

const port1 = process.env.PORT || 3001;

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017",
    { useUnifiedTopology: true },
    (err, client) =>{
        db = client.db("list");
    }
);

app.get('/', function(req,res){
    res.send("data:");
});

app.post('/', function(req, res){
      
    db.collection("list").insertOne(
        {   price: req.body.price,
            location: req.body.location,
            types: req.body.types,
            phone: req.body.phone,
            email: req.body.email,
            descript: req.body.descript
        },
            (err, request) =>{
                if(err) return console.log(err);
                
    });

    res.status(200).json({ message: "price:"+ req.body.price + "  location:" + req.body.location });
});


app.post('/search', function(req,res){
    s_price = req.body.price;
    s_location = req.body.location;
    s_types = req.body.types;
    res.status(200).json({ 
		message: "price:"+ s_price + "  location:" + s_location + " s_types:" + req.body.types
	}); 
});

var mysearch = function(s_price, s_location, s_types, cb) {
    db.collection("list").find(
        {'price': s_price,
        'location': s_location,
        'types': s_types})
        .toArray(cb);
}

app.get('/search', function(req, res){
    mysearch(s_price, s_location, s_types,
            function(err, data){
                if (err){
                    console.log(err);
                    res.send(err);
                } else {
                    var dataf = [];
                    for(let i = 0; i < 4; i++){
                        if(i >= data.length) break;
                        dataf.push(data[data.length - i - 1]);

                    }
                    console.log(dataf);
                    res.send(dataf);
                }
            });
});

// test search with mockmysearch()

var mockmysearch = jest.fn();

mockmysearch
    .mockReturnValueOnce([{
        price: 3000,
        location: "PV",
        types: "1",
        phone: "1",
        email: "1",
        descript: "1"
        }]
        
    )
    .mockReturnValue([{
        price: 3000,
        location: "PV",
        types: "1",
        phone: "1",
        email: "1",
        descript: "1"
        },
        {
        price: 3000,
        location: "PV",
        types: "1",
        phone: "1",
        email: "1",
        descript: "1"
        }])



app.get('/testsearch', function(req, res){
    res.status(200).json(mockmysearch());
});




module.exports = app;


