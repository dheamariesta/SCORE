import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();

//GET login page
router.get('/admin', adminController.getLogin);

//POST method for admin login
router.post('/admin', adminController.postLogin);

//GET method for admin signup
router.get('/admin/signup', adminController.getSignup);

//POST method for admin signup
router.post('/admin/signup', adminController.postSignup);

module.exports = router;
