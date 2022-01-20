const Router = require('express');
const router = new Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const roomRouter = reqiore('./roomRouter');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/room',authMiddleware, roomRouter);


module.exports = router;

