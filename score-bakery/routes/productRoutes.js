import express from 'express';
import productController from '../controllers/productController';
import userController from '../controllers/userController'
const router = express.Router();

function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

router.get('/product/eggtart', isLoggedIn, (req, res) => {
  //console.log(req.user);
  res.render('eggtart', {
    message: req.flash('loginMessage')
  })
}, userController.getUserDetails);


//POST method for user login
//router.post('/login', userController.postLogin);

module.exports = router;
