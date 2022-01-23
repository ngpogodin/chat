const ApiError = require('../exceptions/ApiError');
const tokenService = require('../service/tokenService');



module.exports = async function(req,res,next) {
    try{
        const authorizationHeader  = req.headers.authorization;
        if(!authorizationHeader) {
            throw ApiError.UnauthorizedError()
        }

        const token = authorizationHeader.split(' ')[1];
        if(!token) {
            throw ApiError.UnauthorizedError();
        }

        const userData = await tokenService.validateAccess(token);
        if(!userData) {
            throw ApiError.UnauthorizedError();
        }
        req.user = userData;
        next()
    }catch(e) {
        next(e)
    }

}