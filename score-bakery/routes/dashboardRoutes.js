import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();
function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin')
}


router.get('/dashboard', isLoggedIn, function(req, res) {
  //console.log(req.user);
  res.render('admin-dashboard', {
    message: req.flash('loginMessage')
  })
}, adminController.getUserDetails)


//POST method for user login
//router.post('/login', userController.postLogin);

module.exports = router;
