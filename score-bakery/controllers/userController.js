let User = require ('../models/user');
let passport = require('passport')

let userController = {
  getLogin: (req, res, next) => {
    res.render('login', {
      title: 'Login'
    })
  },

  postLogin: (req, res, next) => {
    var userLoginStrategy = passport.authenticate('local-login', {
      successRedirect: '/category',
      failureRedirect: '/login',
      failureFlash: false
    })
    console.log('logged in user: ', userLoginStrategy);
    return userLoginStrategy(req, res, next)
  },

  getSignup: (req, res, next) => {
    res.render('signup', {
      title: 'Sign up'
    })
  },

  postSignup: (req, res, next) => {
    var userSignupStrategy = passport.authenticate('local-signup', {
      successRedirect : '/category',
      failureRedirect : '/signup',
      failureFlash: false
    })
    return userSignupStrategy(req, res, next)
  },

  getUserDetails: (req, res) => {
    console.log(req.user);
  }






}
module.exports = userController
