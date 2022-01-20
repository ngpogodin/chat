const Router = require('express');
const router = new Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter')


router.use('/', authRouter);
router.use('/user', userRouter)


module.exports = router;

