const tokenService = require('../service/tokenService');


module.exports = async function(req,res,next) {
    try{
        const authorizationHeader  = req.headers.authorization;
        if(!authorizationHeader) {
            throw new Error('not auth')
        }

        const token = authorizationHeader.split(' ')[1];
        if(!token) {
            throw new Error('not auth')
        }

        const userData = await tokenService.validateAccess(token);
        if(!userData) {
            throw new Error('not auth')
        }
        req.user = userData;
        next()
    }catch(e) {
        next(e)
    }

}