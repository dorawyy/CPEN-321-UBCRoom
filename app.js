var express = require("express");
const { exec } = require("child_process");
const { ObjectId } = require("mongodb");
var app = express();
app.use(express.json());
var db;
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
                    var dataf = [];
                    for(let i = 0; i < 4; i++){
                        if(i >= data.length) break;
                        dataf.push(data[data.length - i - 1]);
                    }
                    data.forEach(elem => {
                        elem.old_id = String(elem._id);
                        delete elem._id;
                    });        
                    db_logic.collection("logic").insertMany(data,
                        (err, request) =>{
                            if(err) return console.log(err);
                    });
                    //console.log(dataf);
                    res.send(dataf);
                }
            });
});

var mylogic = async function(re, ids, index, cd) {
    db_logic.collection('logic').find({'old_id':{$nin:ids}}).toArray(function(err, data){
        if(err){
            res.send(err);
        }
        else if(data.length > 0){
            var pick = data[Math.floor(Math.random() * data.length)];
            ids.push(pick.old_id);
            pick._id = ObjectId(pick.old_id);
            delete pick.old_id;
            re.push(pick);
            if(index === 4) cd();
            else{
                console.log(ids);
                mylogic(re,ids,index+1,cd);
            }
        }
        else{
            if(index === 4) cd();
            else{
                console.log(ids);
                mylogic(re,ids,index+1,cd);
            }
        }
    });
}
app.get('/logic', function(req,res){
    var id1,id2,id3;
    var re = [];
    var ids = [];
    mylogic(re,ids,1,()=>{console.log(re); res.send(re);});

    // db_logic.collection('logic').find().toArray(function(err, data){
    //     if(err){
    //         res.send(err);
    //     }
    //     else if(data.length > 0){
    //         console.log(data);
    //         var pick = data[Math.floor(Math.random() * data.length)];
    //         id1 = pick.old_id;
    //         console.log(id1);
    //         pick._id = ObjectId(pick.old_id);
    //         delete pick.old_id;
    //         re.push(pick);
    //     }
    // });
    // db_logic.collection('logic').find({"old_id":{$not: { $eq: id1}}}).toArray(function(err, data){
    //     console.log("111111111111111111111111");
    //     if({"old_id":{$not: { $eq: id1}}}) console.log("true");
        
    //     console.log("111111111111111111111111");
    //     if(err){
    //         res.send(err);
    //     }
    //     else if(data.length > 0){
    //         console.log(data);
    //         var pick = data[Math.floor(Math.random() * data.length)];
    //         id2 = pick.old_id;
    //         if (pick.old_id === id1) console.log("?????????????????????");
    //         else{
    //             console.log(pick.old_id);
    //             console.log(id1);
                
    //             console.log(typeof(pick.old_id));
    //             console.log(typeof(id1));
    //         }
    //         pick._id = ObjectId(pick.old_id);
    //         delete pick.old_id;
    //         re.push(pick);
    //     }
    // });
    // db_logic.collection('logic').find({"old_id":{$nin:[id1,id2]}}).toArray(function(err, data){
    //     if(err){
    //         res.send(err);
    //     }
    //     else if(data.length > 0){
    //         console.log(data);
    //         var pick = data[Math.floor(Math.random() * data.length)];
    //         id3 = pick.old_id;
    //         pick._id = ObjectId(pick.old_id);
    //         delete pick.old_id;
    //         re.push(pick);
    //     }
    // });
    // db_logic.collection('logic').find({"old_id":{$nin:[id1,id2,id3]}}).toArray(function(err, data){
    //     if(err){
    //         res.send(err);
    //     }
    //     else if(data.length > 0){
    //         console.log(data);
    //         var pick = data[Math.floor(Math.random() * data.length)];
    //         pick._id = ObjectId(pick.old_id);
    //         delete pick.old_id;
    //         re.push(pick);
    //         console.log(re);
    //         res.send(re);
    //     }
    //     else{
    //         console.log(re);
    //         res.send(re);
    //     }
    // });

    
});


// test search with mockmysearch()

// var mockmysearch = jest.fn();

// mockmysearch
//     .mockReturnValueOnce([{
//         price: 3000,
//         location: "PV",
//         types: "1",
//         phone: "1",
//         email: "1",
//         descript: "1"
//         }]
        
//     )
//     .mockReturnValue([{
//         price: 3000,
//         location: "PV",
//         types: "1",
//         phone: "1",
//         email: "1",
//         descript: "1"
//         },
//         {
//         price: 3000,
//         location: "PV",
//         types: "1",
//         phone: "1",
//         email: "1",
//         descript: "1"
//         }])



// app.get('/testsearch', function(req, res){
//     res.status(200).json(mockmysearch());
// });




module.exports = app;


