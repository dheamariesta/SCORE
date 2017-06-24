import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

//GET login page
router.get('/login', userController.getLogin);

//POST method for user login
router.post('/login', userController.postLogin);

module.exports = router;
