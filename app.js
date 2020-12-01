var express = require("express");
var bodyparser = require("body-parser");
var app = express();

app.use(bodyparser.json({limit: '50mb'}));
var db;

const port1 = process.env.PORT || 3000;

var MongoClient = require("mongodb").MongoClient;
const ID = require("mongodb").ObjectId

MongoClient.connect("mongodb://localhost:27017",
    { useUnifiedTopology: true },
    (err, client) =>{
        db = client.db("list");
    }
);

// app.get('/', function(req,res){
//     res.send("data:");
// });

// app.post('/', function(req, res){
      
//     db.collection("list").insertOne(
//         {   price: req.body.price,
//             location: req.body.location,
//             types: req.body.types,
//             phone: req.body.phone,
//             email: req.body.email,
//             descript: req.body.descript
//         });

//     res.status(200).json({ message: "price:"+ req.body.price + "  location:" + req.body.location });
// });


// app.post('/search', function(req,res){
//     s_price = req.body.price;
//     s_location = req.body.location;
//     s_types = req.body.types;
//     res.status(200).json({ 
// 		message: "price:"+ s_price + "  location:" + s_location + " s_types:" + req.body.types
// 	}); 
// });

// // var mysearch = function(s_price, s_location, s_types, cb , dcb) {
// //     if(s_price != "" && s_location != "" && s_types != ""){
// //         db.collection("list").find(
// //         {'price': {$lte:s_price},
// //         'location': s_location,
// //         'types': s_types})
// //         .toArray(cb);
// //     }else{
// //         dcb();
// //     }
    
// // }

// app.get('/search', function(req, res){
//     var {mysearch} = require("./mysearch");
//     mysearch(s_price, s_location, s_types,
//             function(err, data){
                
//                 var dataf = [];
//                 for(let i = 0; i < 4; i++){
//                     if(i >= data.length){
//                         break;
//                     } 
//                     var x = data[data.length - i - 1];
//                     dataf.push({
//                         _id:x._id,
//                         price: x.price,
//                         location: x.location,
//                         types: x.types,
//                         phone: x.phone,
//                         email: x.email,
//                         descript: x.descript
//                     });
//                 }
//                 data.forEach(elem => {
//                     elem.old_id = String(elem._id);
//                     delete elem._id;
//                     });        
//                 db_logic.collection("logic").insertMany(data,
//                     (err, request) =>{
//                         if(err) return console.log(err);
//                 });
//                 if (data.length != 0) res.send(dataf);
//                 else res.status(402).json({ message: "empty output" });
                
//             },function(){
//                 res.status(401).json({ message: "empty input" });
//             });

// });

// var mylogic = async function(re, ids, index, cd, bad) {
//     db_logic.collection('logic').find({'old_id':{$nin:ids}}).toArray(function(err, data){
//         if(bad == 0) data = [];
//         if(data.length > 0){
//             var pick = data[Math.floor(Math.random() * data.length)];
//             ids.push(pick.old_id);
//             pick._id = ObjectId(pick.old_id);
//             delete pick.old_id;
//             re.push(pick);
//             if(index === 4) cd();
//             else{
//                 mylogic(re,ids,index+1,cd, bad);
//             }
//         }
//         else{
//             if(index === 4) cd();
//             else{
//                 mylogic(re,ids,index+1,cd, bad);
//             }
//         }
//     });
// }
// app.get('/logic', function(req,res){
//     var {mylogic} = require("./mylogic");
//     var re = [];
//     var ids = [];
//     mylogic(re,ids,1,()=>{
//         res.send(re);
//     }, 1);

// });






module.exports = {app};
