const {app} = require("./app");
var s_price, s_location, s_types;

app.post('/search', function(req,res){
    
    s_price = req.body.price;
    s_location = req.body.location;
    s_types = req.body.types;
    res.status(200).json({ 
		message: "price:"+ s_price + "  location:" + s_location + " s_types:" + req.body.types
	}); 
});

app.get('/search', function(req, res){
    const MongoClient = require("mongodb").MongoClient;
    MongoClient.connect("mongodb://localhost:27017",
    { useUnifiedTopology: true },
    (err, client) =>{
        db = client.db("list");
        db_logic = client.db("logic");
        var {mysearch} = require("./mysearch");
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
                        descript: x.descript,
                        image: x.image
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
    }
    );

    
});

module.exports = {app};