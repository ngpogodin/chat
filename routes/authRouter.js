const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const {body} = require('express-validator');



router.post('/login',authController.login);
router.post('/registration',
                            body('username').isLength({min:4,max:15}),
                            body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), 
                            authController.registration);
router.get('/refresh', authController.refresh)


module.exports = router