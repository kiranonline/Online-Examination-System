var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;
var config = require("config");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var UserModel =  require("../models/user");



//user login local strategy
passport.use('login',new LocalStrategy({
  usernameField: 'emailid',
  passwordField : 'password',
  passReqToCallback : true 
  },
  function(req,emailid, password, done) {
    UserModel.findOne({ 'emailid' : emailid, 'status' : true }, function (err, user) {
      if (err) {
          return done(err,false,{
              success: false,
              message: "Server Error"
          }); 
      }
      if (!user) {
          return done(null, false,{
              success: false,
              message: "Invalid emailid"
          });
      }
      else{
          bcrypt.compare(password, user.password).then(function(res) {
            if(res){
              return done(null, user,{
                success: true,
                message: "logged in successfully"
              });
            }
            else{
              return done(null, false,{
                success: false,
                message: "Invalid Password"
              });
            }
          });
        }
    });
  }
));




//options jwt
var opts = {}
//opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('Token');
opts.secretOrKey = config.get('jwt.secret');

passport.use('user-token',new JwtStrategy(opts, function(jwt_payload, done) {
  UserModel.findById(jwt_payload._id, function(err, user) {
        if (err) {
            return done(err, false,{
                success: false,
                message: "Server Error"
            }); 
        }
        if (user) {
            return done(null, user,{
                success: true,
                message: "Successfull"
            }); 
        } else {
            return done(null, false,{
                success: false,
                message: "Authentication Failed"
            });
        }
    });
}));




module.exports = passport