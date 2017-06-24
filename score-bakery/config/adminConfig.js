
// Load passport local
var localStrategy = require('passport-local').Strategy;

// Load validator
// var validator = require('validator');

// Load user model
var Admin = require('../models/admin');

module.exports = function( passport ) {

  // Serialize user
  passport.serializeUser( function( user, done){
      done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(function(id, done){
      Admin.findById(id, function(err, user){
        done(err, user);
      });
  });

  // Passport signup
  passport.use('admin-signup', new localStrategy({
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
          Admin.findOne( { 'username' : username }, function(err, user){
            if(err){
              return done(err);
            }
            if(user){
              return done(null, false, req.flash('loginMessage','That username is already in use'));
            }else{
              var newAdmin = new Admin();
              newAdmin.type = req.body.type;
              newAdmin.username = username;
              newAdmin.password = password;
              newAdmin.email = req.body.email;
              newAdmin.save(function(err){
                if(err){
                  console.log(err);
                }
                return done(null, newAdmin, req.flash('loginMessage', 'Logged in successfully'));
              });
            }
          });
        });
    }));

  // Passport login
  passport.use('admin-login', new localStrategy({
      typeField: 'type',
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback: true
    },
    function( req, username, password, done){
      Admin.findOne( {'username' : username, 'type' : 'user' }, function(err, user){
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
        } else {
          console.log('is user')
          user.comparePassword(password, function(err, isMatch){

            if(isMatch){
              console.log('user has logged in')
              return done(null, user, req.flash('loginMessage', 'Logged in successfully'));
            }

            return done(null,false, req.flash('loginMessage', 'sorry wrong password'));
          })
        }


      });
    }));




}
