const {app} = require("./app");
app.get('/', function(req,res){
    res.send("data:");
});

app.post('/', function(req, res){
    var MongoClient = require("mongodb").MongoClient;


    MongoClient.connect("mongodb://localhost:27017",
        { useUnifiedTopology: true },
        (err, client) =>{
            db = client.db("list");
            db.collection("list").insertOne(
            {   price: req.body.price,
                location: req.body.location,
                types: req.body.types,
                phone: req.body.phone,
                email: req.body.email,
                descript: req.body.descript
            });
            res.status(200).json({ message: "price:"+ req.body.price + "  location:" + req.body.location });
        }
    );
    
});
module.exports = {app};