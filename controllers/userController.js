const ApiError = require('../exceptions/ApiError');
const userModel = require('../models/userModel');
const UserDto = require('../dtos/user-dto');
const GetService = require('../service/getService');

class UserController {
    async getUser(req,res,next) {
        try{
            const username = req.params.username
            const userDoc = await userModel.findOne({username});
            if(!userDoc) throw ApiError.BadRequest('no such user');
            if(req.user.username === userDoc.username) return res.json(new UserDto(userDoc));
            return res.json(new UserDto(userDoc).isUser());
        }catch(e) {
            next(e);
        }
    }

    async getById(req,res,next) {
        try{
            const userId = req.params.id;
            const user = await userModel.findById(userId);
            if(!user) throw ApiError.BadRequest('no such user');
            if(req.user.username === userDoc.username) return res.json(new UserDto(userDoc));
            return res.json(new UserDto(userDoc).isUser());
        }catch(e) {
            next(e);
        }
    }
    async getAllUsers(req,res,next) {
        try{
            const {limit,offset} = req.query;

            const arr = await new GetService(userModel).getAll(limit,offset)
    
            const users = arr.map(user => new UserDto(user).isUser());
            res.json({length: users.length, users});
        }catch(e) {
            next(e);
        }

    }
}

module.exports = new UserController()