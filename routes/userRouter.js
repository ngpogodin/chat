const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/:username',authMiddleware, userController.getUser);
router.get('/', authMiddleware,userController.getAllUsers);


module.exports = router