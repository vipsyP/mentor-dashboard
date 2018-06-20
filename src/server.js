var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//***************************mongoose connection *************//
mongoose.connect("mongodb://localhost/iplData");

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//****************************mongoSchema************************//
// var mentorsDashboardSchema = new mongoose.Schema({}, { strict: false });
// var tasks = mongoose.model("tasks",mentorsDashboardSchema);
app.post("/addTask" , function(req,res){
    console.log("task added");
    console.log(req.body);
});



app.listen(4000,function(){
    console.log("server listening on port 4000");
});