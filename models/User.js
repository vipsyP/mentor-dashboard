const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
    // MAX_LOGIN_ATTEMPTS = 5,
    // LOCK_TIME = 2 * 60 * 60 * 1000;
    mongoose.connect("mongodb://myteam:myteam1@ds119171.mlab.com:19171/mentorsdashboard");

var UserSchema = new Schema({
    username: { type: String, required: true },
    email: {type: String, required: true, index: { unique: true } },
    role: {type: String, required: true},
    password: { type: String, required: true },
    // loginAttempts: { type: Number, required: true, default: 0 },
    // lockUntil: { type: Number }
});

// hash the password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  // checking if password is valid
//   UserSchema.methods.validPassword = function(password) {
//     console.log('password',password);
//     console.log('this.password',this.password);
//     return bcrypt.compareSync(password, this.password);
//   };



// UserSchema.pre('save', function(next) {
//     var user = this;

// // only hash the password if it has been modified (or is new)
// if (!user.isModified('password')) return next();

// // generate a salt
// bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) return next(err);

//         // override the cleartext password with the hashed one
//         user.password = hash;
//         next();
//     });
// });


// });

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

 UserSchema.methods.comparePassword = function(candidatePassword) {
    var user = this;
    // console.log("candidatePassword",candidatePassword);
    // console.log("user.password",user.password);
    return new Promise(function(resolve,reject)
    {
        bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
            // Prevent conflict btween err and isMatch
            if (err)
                reject(new Error("Error checking use password"));
            else
            {
                console.log(isMatch === true ? 'passwords match' : 'passwords dont match');
                // return;
                resolve(isMatch);
            }
        });
    });
};

module.exports = mongoose.model('users', UserSchema);

