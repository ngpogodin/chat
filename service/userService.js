const userModel = require('../models/userModel');
const tokenService = require('./tokenService')
const bcrypt = require('bcrypt');
const ApiError = require('../exceptions/ApiError');
const UserDto = require('../dtos/user-dto');



class UserService {
    async registration(username, password) {
            if(await userModel.findOne({username})) {
                throw ApiError.BadRequest('user already exists');
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);

            const user = await userModel.create({username, hash, salt});

            const tokens = tokenService.generateTokens({username, id: user._id});
            await tokenService.saveToken(user._id, tokens.refreshToken);

            return {
                user:new UserDto(user),
                ...tokens
            }

    }
    async login(username,password) {
            const user = await userModel.findOne({username});
            if(!user) throw ApiError.BadRequest('user not exist');

            const match = await bcrypt.compare(password, user.hash);
            if(!match) throw ApiError.BadRequest('invalid password');

            const tokens = tokenService.generateTokens({username, id: user._id});
            await tokenService.saveToken(user._id, tokens.refreshToken);

            return {
                user:new UserDto(user),
                ...tokens
            }

    }
    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.ForbiddenError();
        }
        const check = tokenService.validateRefresh(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!check || !tokenFromDb) {
            throw ApiError.ForbiddenError();
        }

        const user = await userModel.findById(check.id);
        const tokens = tokenService.generateTokens({username:user.username, id: user._id});
        await tokenService.saveToken(user._id,tokens.refreshToken)
        return {
            user:new UserDto(user),
            ...tokens
        }
    }
}

module.exports = new UserService();