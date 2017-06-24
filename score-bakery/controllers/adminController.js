let Admin = require ('../models/admin');
let passport = require('passport')

let adminController = {
  getLogin: (req, res) => {
    res.render('admin-login', {
      title: 'Admin'
    })
  },

  postLogin: (req, res) => {
    const type = req.body.type;
    const username = req.body.username;
    const password = req.body.password;

    Admin.find({username: username, type: type}, (err, users) => {
        if(err){
          res.render('admin-login', {
            title: 'Login'
          });
        }else{

            users[0].comparePassword(password, (err, isMatch) =>{

                if(isMatch){
                    res.redirect('/admin');
                }else{
                  res.render('admin-dashboard', {
                    title: 'Dashboard'
                  });
                }

            });

        }
    });
  },

  getSignup: (req, res, next) => {
    res.render('admin-signup', {
      title: 'Sign up'
    })
  },

  postSignup: (req, res, next) => {
    var adminSignupStrategy = passport.authenticate('admin-signup', {
      successRedirect : '/dashboard',
      failureRedirect : '/admin/signup',
      failureFlash: false
    })
    return adminSignupStrategy(req, res, next)
  },

  getUserDetails: (req, res,next) => {
    console.log(req.user);
  }






}
module.exports = adminController
