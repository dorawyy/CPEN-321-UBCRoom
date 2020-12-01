const {app} = require("./app");
var admin = require("firebase-admin");
var serviceAccount = require("./ubc-residence-room-exchange-firebase-adminsdk-3rwcl-492e5d43fc.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ubc-residence-room-exchange.firebaseio.com"
});
app.get('/', function(req,res){
    res.send("data:");
});

app.post('/', function(req, res){
    var MongoClient = require("mongodb").MongoClient;


    MongoClient.connect("mongodb://localhost:27017",
        { useUnifiedTopology: true },
        (err, client) =>{
            db = client.db("list");
            // var admin = require("firebase-admin");
            // var serviceAccount = require("./ubc-residence-room-exchange-firebase-adminsdk-3rwcl-492e5d43fc.json");

            // admin.initializeApp({
            //     credential: admin.credential.cert(serviceAccount),
            //     databaseURL: "https://ubc-residence-room-exchange.firebaseio.com"
            // });

            var registrationToken = req.body.token;
            var message = {
                notification:{
                    title: "Submitted",
                    body: "You have submitted successfully"
                }
            };

            var options = {
                priority: "high",
                timeToLive: 60 * 60 *24
            }

            admin.messaging().sendToDevice(registrationToken,message,options);

            db.collection("list").insertOne(
            {   price: req.body.price,
                location: req.body.location,
                types: req.body.types,
                phone: req.body.phone,
                email: req.body.email,
                descript: req.body.descript,
                image: req.body.image
            });
            res.status(200).json({ message: "price:"+ req.body.price + "  location:" + req.body.location });
        }
    );
    
});
module.exports = {app};