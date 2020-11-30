var express = require("express");
const { exec } = require("child_process");
const { ObjectId } = require("mongodb");
var {mylogic} = require("./mylogic");
var {mysearch} = require("./mysearch");
var app = express();
app.use(express.json());
var db, db_logic;
var s_price, s_location, s_types;

const port1 = process.env.PORT || 3000;

var MongoClient = require("mongodb").MongoClient;
const ID = require("mongodb").ObjectId

MongoClient.connect("mongodb://localhost:27017",
    { useUnifiedTopology: true },
    (err, client) =>{
        db = client.db("list");
        db_logic = client.db("logic");
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
            (err, request) =>{});

    res.status(200).json({ message: "price:"+ req.body.price + "  location:" + req.body.location });
});


app.post('/search', function(req,res){
    s_price = req.body.price;
    s_location = req.body.location;
    s_types = req.body.types;
    res.status(200).json({ 
		message: "price:"+ s_price + "  location:" + s_location + " s_types:" + req.body.types
	}); 
});

app.get('/search', function(req, res){
    mysearch(s_price, s_location, s_types,
            function(err, data){
                
                var dataf = [];
                for(let i = 0; i < 4; i++){
                    if(i >= data.length){
                        break;
                    } 
                    var x = data[data.length - i - 1];
                    dataf.push({
                        _id:x._id,
                        price: x.price,
                        location: x.location,
                        types: x.types,
                        phone: x.phone,
                        email: x.email,
                        descript: x.descript
                    });
                }
                data.forEach(elem => {
                    elem.old_id = String(elem._id);
                    delete elem._id;
                    });        
                db_logic.collection("logic").insertMany(data,
                    (err, request) =>{
                        if(err) return err;
                });
                if (data.length !== 0) res.send(dataf);
                else res.status(402).json({ message: "empty output" });
                
            },function(){
                res.status(401).json({ message: "empty input" });
            });

});
app.get('/logic', function(req,res){
    var id1,id2,id3;
    var re = [];
    var ids = [];
    mylogic(re,ids,1,()=>{
        res.send(re);
    }, 1);

});






module.exports = {app};
