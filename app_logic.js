
var {app} = require("./app");

app.get('/logic', function(req,res){
    var {mylogic} = require("./mylogic");
    var re = [];
    var ids = [];
    mylogic(re,ids,1,()=>{
        res.send(re);
    }, 1);

});

module.exports = {app};
