import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

//GET signup page
router.get('/signup', userController.getSignup);

//POST method for user signup
router.post('/signup', userController.postSignup);

module.exports = router;
