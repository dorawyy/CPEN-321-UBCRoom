// var db, db_logic;
// const { ObjectId } = require("mongodb");
// var MongoClient = require("mongodb").MongoClient;

// MongoClient.connect("mongodb://localhost:27017",
//     { useUnifiedTopology: true },
//     (err, client) =>{
//         db = client.db("list");
//         db_logic = client.db("logic");
//     }
// );
var mylogic = async function(re, ids, index, cd, bad) {
    var db, db_logic;
    const { ObjectId } = require("mongodb");
    var MongoClient = require("mongodb").MongoClient;

    MongoClient.connect("mongodb://localhost:27017",
       { useUnifiedTopology: true },
       (err, client) =>{
           db = client.db("list");
           db_logic = client.db("logic");
           db_logic.collection('logic').find({'old_id':{$nin:ids}}).toArray(function(err, data){
            if(bad == 0) data = [];
            if(data.length > 0){
                var pick = data[Math.floor(Math.random() * data.length)];
                ids.push(pick.old_id);
                pick._id = ObjectId(pick.old_id);
                delete pick.old_id;
                re.push(pick);
                if(index === 4) cd();
                else{
                    mylogic(re,ids,index+1,cd, bad);
                }
            }
            else{
                if(index === 4) cd();
                else{
                    mylogic(re,ids,index+1,cd, bad);
                }
            }
          });
       });
}
module.exports = {mylogic};