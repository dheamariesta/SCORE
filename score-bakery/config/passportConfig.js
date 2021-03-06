
// Load passport local
var localStrategy = require('passport-local').Strategy;

// Load validator
// var validator = require('validator');

// Load user model
var User = require('../models/user');
var Admin = require('../models/admin');

module.exports = function( passport ) {

  // Serialize user
  passport.serializeUser( function( user, done){
      done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        done(err, user);
      });
  });

  // Passport signup
  passport.use('local-signup', new localStrategy({
      typeField : 'type',
      usernameField : 'username',
      emailField : 'email',
      passwordField : 'password',
      passReqToCallback: true
    },
    function( req, username, password, done){

        // Check that the email is in the right format
        // if( !validator.isEmail(email) ){
        //   return done(null, false, req.flash('loginMessage','That is not a valid email address'));
        // }

        console.log(username,  password)
        // Check that the password is at least 8 chars
        if( password.length < 4 ){
          return done(null, false, req.flash('loginMessage','The password needs to be 8 chars long'));
        }

        process.nextTick(function(){
          User.findOne( { 'username' : username }, function(err, user){
            if(err){
              return done(err);
            }
            if(user){
              return done(null, false, req.flash('loginMessage','That username is already in use'));
            }else{
              var newUser = new User();
              newUser.type = req.body.type;
              newUser.username = username;
              newUser.password = password;
              newUser.email = req.body.email;
              newUser.save(function(err){
                if(err){
                  console.log(err);
                }
                return done(null, newUser, req.flash('loginMessage', 'Logged in successfully'));
              });
            }
          });
        });
    }));

  // Passport login
  passport.use('local-login', new localStrategy({
      typeField: 'type',
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback: true
    },
    function( req, username, password, done){
      User.findOne( {'username' : username}, function(err, user){
        if(err){
          console.log('error')
          return done(err.message);
        }

        if(!user){
          console.log('not user')
          return done(null,false, req.flash('loginMessage', {
            type: 'warning',
            message: 'sorry no one by that username'
          }));
        } else if(user.type == 'user'){

          console.log('is user', user.username, user.type)
          user.comparePassword(password, function(err, isMatch){

            if(isMatch){
              console.log('user has logged in')
              return done(null, user, req.flash('loginMessage', 'Logged in successfully'));
            }

            return done(null,false, req.flash('loginMessage', 'sorry wrong password'));
          })
        } else {
          console.log(user.type);
          user.comparePassword(password, function(err, isMatch){

            if(isMatch){
              console.log('admin has logged in')
              return done(null, user, req.flash('loginMessage', 'admin login Successful'));
            }

            return done(null,false, req.flash('loginMessage', 'sorry wrong password'));
          })

        }


      });
    }));




}
