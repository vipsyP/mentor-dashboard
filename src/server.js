var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//***************************mongoose connection *************//
mongoose.connect("mongodb://myteam:myteam1@ds119171.mlab.com:19171/mentorsdashboard");

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//****************************mongoSchema************************//
 var mentorsDashboardSchema = new mongoose.Schema({
     task: String,
     member: String,
     dueDate: String,
     submitted: Boolean,
     done: Boolean
 });
 var tasks = mongoose.model("tasks",mentorsDashboardSchema);

app.post("/mentor/task/create" , function(req,res){
    // console.log("task added");
    // console.log(req.body);
    var newTask = new tasks({
        task: req.body.taskName,
        member: req.body.teamMember,
        dueDate: req.body.date,
        submitted: false,
        done: false
    });
    tasks.create(newTask , function(err, tasks){
        if(err) console.log(err);
        else{
            // console.log("inserted "+ newTask);
        }
    });
});

app.get("/mentor/tasks" , function(req,res){
    tasks.find({},function(err, tasksList){
        if(err) console.log(err);
        else{
            // res.render("index.ejs" ,{todoList : todoList}); 
            res.send(tasksList);
            // console.log(tasksList);
        }
    });
});
app.get("/mentee/tasks" , function(req,res){
    console.log(req.query)
    let user = req.query.user
    tasks.aggregate([{$match :{member: { $eq:(req.query.user)} }}]).exec(function(err,result){
        if(err){
            console.log("error");
        }
        else{
            //  console.log(result);
            res.send(result);
            // console.log(result);
        }
    });
});

app.get("/mentee/tasks/sub" , function(req,res){
             console.log(req.query);
             tasks.update({_id: req.query.id}, {$set: {submitted:true}}, function(err, result) {
                if (err) {
                  res.send(err);
                }
                res.send(result);
              });
});

app.get("/mentee/tasks/complete" , function(req,res){
    console.log(req.query);
    tasks.update({_id: req.query.id}, {$set: {done:true}}, function(err, result) {
       if (err) {
         res.send(err);
       }
       res.send(result);
     });
});
app.get("/mentee/tasks/reassign" , function(req,res){
    console.log(req.query);
    tasks.update({_id: req.query.id}, {$set: {submitted:false}}, function(err, result) {
       if (err) {
         res.send(err);
       }
       res.send(result);
     });
});

// app.get("/task/update/:id", function(req,res){
//     console.log(req.params.id);
//     res.render("./components/edit-form",{todo : req.params.id});
    
// });

app.post("/task/updatetask",function(req,res){
    console.log(req.query);
    tasks.update({_id: req.query.id}, {$set: {task:req.query.task}}, function(err, result) {
        if (err) {
            res.send(err);
        }
        res.send(result);
        });
});
app.get("/task/deletetask", function(req,res){
    tasks.remove({_id:req.query.id}, function(err, delData){
    });
});

app.listen(4000,function(){
    console.log("server listening on port 4000");
});