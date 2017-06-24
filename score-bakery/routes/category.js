import express from 'express';
import categoryController from '../controllers/categoryController';
import userController from '../controllers/userController';
const router = express.Router();
function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

router.get('/category', isLoggedIn, function(req, res) {
  //console.log(req.user);
  res.render('category', {
    message: req.flash('loginMessage'),
    user: req.user
  })
}, userController.getUserDetails)


//POST method for user login
//router.post('/login', userController.postLogin);

module.exports = router;
