import express from 'express';
import userController from '../controllers/userController'
const router = express.Router();

function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}
router.get('/user', isLoggedIn, function(req, res) {
   res.json(req.user);
})

router.get('/account', isLoggedIn, (req, res) => {
  //console.log(req.user);
  res.render('account', {
    message: req.flash('loginMessage'),
    user: req.user
  })
}, userController.getUserDetails);


//POST method for user login
//router.post('/login', userController.postLogin);

module.exports = router;
