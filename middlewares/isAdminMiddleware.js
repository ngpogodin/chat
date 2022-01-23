const ApiError = require('../exceptions/ApiError');
const roomModel = require('../models/roomModel');


module.exports = async (req,res,next) => {
    try{
        const room = await roomModel.findOne({$and :[{ '_id': req.body.roomId}, {'admins' : req.user.id}]});
        if(!room) throw ApiError.ForbiddenError();
        req.room = room
        next()
    }catch(e) {
        next(e)
    }
}