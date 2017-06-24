import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express'
  });
});



router.get('/eggtart', (req, res, next) => {
  res.render('eggtart', {
    title: 'EggTart'
  })
})

router.get('/shoppingcart', (req, res, next) => {
  res.render('shoppingcart', {
    title: 'EggTart'
  })
})

router.get('/account', (req, res, next) => {
  res.render('account', {
    title: 'EggTart'
  })
})

router.get('/dashboard', (req, res, next) => {
  res.render('admin-dashboard', {
    title: 'Dashboard'
  })
})
export default router;

module.exports = function(app, passport){
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/category')
  }

  //Sign up
  app.get('/signup', function(req, res) {
    res.render('signup', {
      message: req.flash('loginMessage')
    });
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  //Login
  app.get('/login', function(req, res){
    res.render('login', {
      message: req.flash('loginMessage')
    });
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/category',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/category', isLoggedIn, function(req, res) {
    res.render('categoryPastry', {
      message: req.flash('logginMessage')
    })
  })
}
