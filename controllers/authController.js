const userService = require('../service/userService')


class AuthController {
    async login(req,res,next) {
        try{
           const userData = await userService.login(req.body.username, req.body.password);
           res.cookie('refreshToken',userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true});
           res.json({userData})
        }catch(e) {
            console.log(e);
            res.json(e)
        }
    }
    async registration(req,res,next) {
        try{
            const userData = await userService.registration(req.body.username, req.body.password);
            res.cookie('refreshToken',userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true});
            res.json({userData})
        }catch(e) {
            console.log(e);
            res.json(e);
        }
    }
    async refresh(req,res,next) {
        try{
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            console.log(userData.refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true});

            res.json(userData);

        }catch(e) {
            console.log(e)
            res.json(e)
        }
    }
}

module.exports = new AuthController()