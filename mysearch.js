var express = require("express");
var db, db_logic;
var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017",
    { useUnifiedTopology: true },
    (err, client) =>{
        db = client.db("list");
        db_logic = client.db("logic");
    }
);
var mysearch = function(s_price, s_location, s_types, cb , dcb) {
    if(s_price != "" && s_location != "" && s_types != ""){
        db.collection("list").find(
        {'price': {$lte:s_price},
        'location': s_location,
        'types': s_types})
        .toArray(cb);
    }else{
        dcb();
    }
    
}

module.exports = {mysearch};
