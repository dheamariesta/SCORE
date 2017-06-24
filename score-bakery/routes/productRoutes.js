import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();


router.get('/product/eggtart', (req, res) => {
  //console.log(req.user);
  res.render('eggtart', {
    message: req.flash('loginMessage')
  })
});


//POST method for user login
//router.post('/login', userController.postLogin);

module.exports = router;
