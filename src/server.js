var express = require("express");
var app = express();
var session = require("express-session"),
  bodyParser = require("body-parser");
var mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
// let name='';
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://10.1.7.68:3000");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Custom-Header, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, XMODIFY");
//   res.header("cookies_needed" ,true);
//   next();
//  });
//***************************importing mongoose login schema*************//
const UserDetails = require('../models/User');
//***************************mongoose connection *************//
mongoose.connect("mongodb://myteam:myteam1@ds119171.mlab.com:19171/mentorsdashboard");
app.use(cookieParser());
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Custom-Header, Accept");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, XMODIFY");
  // res.header("cookies_needed" ,true);
  next();
});

//****************************mongoSchema************************//
var mentorsDashboardSchema = new mongoose.Schema({
  task: String,
  member: String,
  mentor: String,
  dueDate: String,
  submitted: Boolean,
  done: Boolean
});

var tasks = mongoose.model("tasks", mentorsDashboardSchema);

var membersSchema = new mongoose.Schema({
  member: String
});
var members = mongoose.model("members", membersSchema);

// app.post("/task/create" , function(req,res){
//     // console.log("task added");
//      console.log(req.query);
//     var newTask = new tasks({
//         task: req.query.task,
//         member: req.query.member,
//         dueDate: req.query.date,
//         submitted: false,
//         done: false
//     });
//     tasks.create(newTask , function(err, tasks){
//         if(err) console.log(err);
//         else{
//           console.log("inserted "+ newTask);
//           res.send(tasks)
//         }
//       });
//     });
//***************************Sign Up  *************//

app.post('/signup', function (req, res) {
  let name;
  let mailid;
  let passwrd;
  let asA;
  console.log(req.body);
  if (req.body.username != null && req.body.email != null && req.body.password != null && req.body.confirmPassword != null) {
    UserDetails.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) {
        
        res.send(err);
      }
      if (user) {
        res.send({
          message: "Email is already taken"
        });
      } else {
        if (req.body.password == req.body.confirmPassword && req.body.password.length >= 6) {
          name = req.body.username;
          mailid = req.body.email;
          asA = req.body.role;
          passwrd = req.body.password;
          // create a user a new user
          var new_user = new UserDetails({
            username: name,
            email: mailid,
            role: asA,
          });
          new_user.password = new_user.generateHash(passwrd);
          console.log(new_user);
          UserDetails.insertMany(new_user, (err, user) => {
            if (err) {
              console.log("inside signup err=",err.errmsg);
              res.send({
                message: err.errmsg
              });
            } else {
              console.log("inside success new_user is", new_user);
              console.log("req.body.username", req.body.username);
              console.log("req.body.role", req.body.role);
              res.send({
                status: true
              });
            }
          })

        } else {
          res.send({
            message: "please make sure password and confirm passwaord feild has same value and is atleast 6 charcters, then try registering!!"
          });
        }
      }
    });
  } else {
    // res.send({status:true,name:req.body.username,role:req.body.role});
    res.send({
      status: true
    });
  }
})







/*  PASSPORT SETUP  */
app.use(express.static("public"));
app.use(session({
  secret: "cats",
  cookie: {
    _expires: (10 * 60 * 1000)
  },
  resave: false,
  saveUninitialized: false
}));
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// app.get('/success', (req, res) => {
//   //let cookie=req.cookies.connect.sid;
//    console.log("req.user",req.user);
//    console.log("req.query",req.query);
//   //console.log(res.cookies);
//   // name=req.query.username;
//   // console.log(name);
//    //res.send({message:"Welcome " + req.query.username + "!!"});
//   // if(req.user.email){

//   //     res.redirect('/mentee');
//   //   }
//    console.log('req.user.role',req.user.role);
//    console.log('req.query.role',req.query.role);
//     res.send({status:true,name:req.query.username,role:req.user.role});


// }
//  );



app.get('/error', (req, res) => res.send({message:"Incorrect username or password"}));

// passport.serializeUser(function (user, cb) {
//   // console.log('inside serializer user.id =',user.id);
//   console.log('inside serializer user =',user);
//   cb(null, user.id);
// });

// passport.deserializeUser(function (id, cb) {
//   // console.log("ID inside deserializeUser", id);
//   UserDetails.findById(id, function (err, user) {
//     cb(err, user);
//   });
// })

passport.serializeUser(function (user, done) {
  debugger;
  console.log("inside serializer user", user);
  done(null, user.id);
});

passport.deserializeUser(function (obj, done) {

  console.log("inside deserializer user", obj);

  done(null, obj);
});

// app.get('/api/users/me',
//   passport.authenticate('basic', { session: true }),
//   function(req, res) {
//     console.log("inside api/users/me");
//     res.json({ id: req.user.id, username: req.user.username });
//   });
// app.get('/cookie',(req,res)=>{
//   console.log(req.cookies);
//   res.end();
// })


// app.get('/logout', function(req,res){
//   req.logOut();
//   req.session.destroy(function (err) {
//          res.redirect('/'); //Inside a callback… bulletproof!
//      });
//  });


app.get('/logout', function (req, res) {
  console.log("inside logout  cookie value", req.headers['cookie']);
  // if(req.headers['cookie']!=null){
  res.cookie('connect.sid', '', {
    expires: new Date(1),
    path: '/'
  });
  console.log("inside logout in if part cookie value", req.headers['cookie']);
  res.clearCookie("connect.sid", {
    path: "/"
  })
  req.logOut();
  res.send({
    status: true
  });
  // }
  // else{
  //   console.log("inside logout in else part cookie value",req.headers['cookie'])
  // res.send({status:false});
  //   // res.redirect('/');
  // }

});

/* PASSPORT LOCAL AUTHENTICATION */

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    session: true
  },
  function (username, password, done) {
    console.log('username', username);
    console.log('password', password);
    // console.log('role', role);
    UserDetails.findOne({
      email: username
    }, function (err, user) {
      if (err) {
        console.log('err', err);
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      // if(!role){
      //    console.log("inside role check",role);
      //   return done(null, false);
      // }
      else {
        // console.log(user);
        user.comparePassword(password).then(function (isMatch) {
          if (isMatch) {
            console.log("if ismatch = true user =", user);
            return done(null, user);
          } else {
            return done(null, false);
          }
        }).catch(function (err) {
          // handle possible errors
          return done(err);
        })
      }
    });
  }
));

app.post('/login',

  passport.authenticate('local', {
    failureRedirect: '/error'
  }),
  function (req, res) {
    console.log("req.body bfr success redirect-", req.body);
    // UserDetails.findOne({
    //   email:req.body.
    // })
    // res.redirect('/success?username=' + req.user.username);
    // console.log("req.user",req.user);

    // if(req.user.email){
    //   res.send("datas",res.user);
    // }

    console.log("inside login  cookie value", req.headers);
    console.log("req.user bfr success redirect-", req.user);
    if (req.user.role == req.body.role) {
      res.send({
        status: true,
        name: req.user.username,
        role: req.user.role
      });
    } else {
      res.send({
        // status: false
        message: "You have registered as " + req.user.role + " so please login as " + req.user.role
      });
    }

  });


// app.post('/login', (req, res, next) => {

//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       res.status(404).send({error: "Incorrect Username or Password"});
//     } 
//     else {
//       req.login(user, function(err) {
//         if (err) return next(err);
//         return res.status(200).send({status: 'ok'});
//       })
//     }
//   })(req, res, next);
// });

app.post("/mentor/task/create", function (req, res) {
  //     console.log("task added");
  console.log("inside mentor create task req.body ", req.body);
  // let user_id=req.session.passport.user;
  console.log("inside mentor create task ", req.headers['cookie']);
  if (req.headers['cookie'] != null) {
    console.log("inside if block in mentor create task ", req.headers['cookie']);

    let user_id = req.session.passport.user;
    UserDetails.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        console.log('inside db find function req.session.passport.user', user);
        console.log(req.query);
        var newTask = new tasks({
          task: req.body.task,
          member: req.body.member,
          mentor: req.body.mentor,
          dueDate: req.body.date,
          submitted: false,
          done: false,
        });
        tasks.create(newTask, function (err, tasks) {
          if (err) console.log(err);
          else {
            console.log("inserted " + newTask);
            // res.send(tasks)
            res.send({
              status: true
            });
          }
        });
      }
    })
  } else {
    res.send({
      status: false
    });
  }
});

app.get("/mentor/tasks", function (req, res) {
  console.log("inside mentor create task req.query ", req.query);
  // let user_id=req.session.passport.user;
  console.log("inside mentor create task ", req.headers['cookie']);
  if (req.headers['cookie'] != null) {
    console.log("inside if block in mentor create task ", req.headers['cookie']);

    let user_id = req.session.passport.user;
    UserDetails.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        tasks.find({}, function (err, tasksList) {
          if (err) console.log(err);
          else {
            // res.render("index.ejs" ,{todoList : todoList});
            // console.log(" inside mentor create task after success tasksList",tasksList); 
            // let trydata = JSON.stringify(tasksList);
            // trydata.push({status:true});
            // console.log(" inside mentor create task after success trydata", trydata);

            // res.send(trydata);
            res.send(tasksList);
            // console.log(tasksList);
          }
        });
      }
    });
  } else {
    res.send({
      status: false
    });
  }
});
app.get("/mentee/tasks", function (req, res) {
  console.log("inside mentee task req.query ", req.query);
  // let user_id=req.session.passport.user;
  console.log("inside mentee task ", req.headers['cookie']);
  if (req.headers['cookie'] != null) {
    console.log("inside if block in mentee task ", req.headers['cookie']);
    let user_id = req.session.passport.user;
    UserDetails.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        console.log(req.query)
        let user = req.query.user
        tasks.aggregate([{
          $match: {
            member: {
              $eq: (req.query.user)
            }
          }
        }]).exec(function (err, result) {
          if (err) {
            console.log("error");
          } else {
            //  console.log(result);
            res.send(result);
            // console.log(result);
          }
        });
      }
    })
  } else {
    res.send({
      status: false
    });
  }
});

app.get("/mentee/tasks/sub", function (req, res) {
  console.log("inside mentor create task req.query ", req.query);
  // let user_id=req.session.passport.user;
  console.log("inside mentor create task ", req.headers['cookie']);
  if (req.headers['cookie'] != null) {
    console.log("inside if block in mentor create task ", req.headers['cookie']);

    let user_id = req.session.passport.user;
    UserDetails.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        console.log(req.query);
        tasks.update({
          _id: req.query.id
        }, {
          $set: {
            submitted: true
          }
        }, function (err, result) {
          if (err) {
            res.send(err);
          }
          res.send(result);
        });
      }

    })
  } else {
    res.send({
      status: false
    });
  }
});

app.get("/mentee/tasks/complete", function (req, res) {
  console.log("inside mentor create task req.query ", req.query);
  // let user_id=req.session.passport.user;
  console.log("inside mentor create task ", req.headers['cookie']);
  if (req.headers['cookie'] != null) {
    console.log("inside if block in mentor create task ", req.headers['cookie']);

    let user_id = req.session.passport.user;
    UserDetails.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        console.log(req.query);
        tasks.update({
          _id: req.query.id
        }, {
          $set: {
            done: true
          }
        }, function (err, result) {
          if (err) {
            res.send(err);
          }
          res.send(result);
        });
      }
    });
  } else {
    res.send({
      status: false
    });
  }
});
app.get("/mentee/tasks/reassign", function (req, res) {
  console.log("inside mentor create task req.query ", req.query);
  // let user_id=req.session.passport.user;
  console.log("inside mentor create task ", req.headers['cookie']);
  if (req.headers['cookie'] != null) {
    console.log("inside if block in mentor create task ", req.headers['cookie']);

    let user_id = req.session.passport.user;
    UserDetails.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        console.log(req.query);
        tasks.update({
          _id: req.query.id
        }, {
          $set: {
            submitted: false
          }
        }, function (err, result) {
          if (err) {
            res.send(err);
          }
          res.send(result);
        });
      }
    });
  } else {
    res.send({
      status: false
    });
  }
});

// app.get("/task/update/:id", function(req,res){
//     console.log(req.params.id);
//     res.render("./components/edit-form",{todo : req.params.id});

// });

app.post("/task/updatetask", function (req, res) {
  console.log("inside mentor create task req.query ", req.query);
  // let user_id=req.session.passport.user;
  console.log("inside mentor create task ", req.headers['cookie']);
  if (req.headers['cookie'] != null) {
    console.log("inside if block in mentor create task ", req.headers['cookie']);

    let user_id = req.session.passport.user;
    UserDetails.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        console.log(req.query);
        tasks.update({
          _id: req.query.id
        }, {
          $set: {
            task: req.query.task
          }
        }, function (err, result) {
          if (err) {
            res.send(err);
          }
          res.send(result);
        });
      }
    });
  } else {
    res.send({
      status: false
    });
  }
});
app.get("/task/deletetask", function (req, res) {
  console.log("inside /task/deletetask req.query ", req.query);
  // let user_id=req.session.passport.user;
  console.log("inside /task/deletetask cookie ", req.headers['cookie']);
  if (req.headers['cookie'] != null) {
    console.log("inside if block in mentor create task ", req.headers['cookie']);

    let user_id = req.session.passport.user;
    UserDetails.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        tasks.remove({
          _id: req.query.id
        }, function (err, delData) {});
        res.send({
          status: true
        });
      }
    });
  } else {
    res.send({
      status: false
    });
  }
});

app.post("/mentee/add", function (req, res) {
  console.log("inside mentor create task req.query ", req.query);
  // let user_id=req.session.passport.user;
  console.log("inside mentor create task ", req.headers['cookie']);
  if (req.headers['cookie'] != null) {
    console.log("inside if block in mentor create task ", req.headers['cookie']);

    let user_id = req.session.passport.user;
    UserDetails.findOne({
      _id: user_id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        // console.log("task added");
        console.log(req.query);
        var newMember = new members({
          member: req.query.member,
        });
        members.create(newMember, function (err, member) {
          if (err) console.log(err);
          else {
            console.log("inserted " + newMember);
            res.send({
              status: true
            });
          }
        });
      }
    });
  } else {
    res.send({
      status: false
    });
  }

});

app.get("/addMembers", function (req, res) {

  members.find({}, function (err, membersList) {
    if (err) console.log(err);
    else {
      // res.render("index.ejs" ,{todoList : todoList}); 
      res.send(membersList);
      // console.log(tasksList);
    }
  });
});

app.listen(4000, function () {
  console.log("server listening on port 4000");
});