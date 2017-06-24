let Admin = require ('../models/admin');
let passport = require('passport')
let User = require('../models/user')


let adminController = {
  getLogin: (req, res) => {
    res.render('admin-login', {
      title: 'Admin'
    })
  },

  postLogin: (req, res, next) => {
    var userLoginStrategy = passport.authenticate('local-login', {
      successRedirect: '/dashboard',
      failureRedirect: '/admin',
      failureFlash: false
    })
    console.log('logged in user: ', userLoginStrategy);
    return userLoginStrategy(req, res, next)
  },

  getSignup: (req, res, next) => {
    res.render('admin-signup', {
      title: 'Sign up'
    })
  },

  postSignup: (req, res, next) => {
    var adminSignupStrategy = passport.authenticate('local-signup', {
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
