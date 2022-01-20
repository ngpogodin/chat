const userModel = require('../models/userModel');
const tokenService = require('./tokenService')
const bcrypt = require('bcrypt');



class UserService {
    async registration(username, password) {
            if(await userModel.findOne({username})) {
                throw new Error('user already exist');
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);

            const user = await userModel.create({username, hash, salt});

            const tokens = tokenService.generateTokens({username, id: user._id});
            await tokenService.saveToken(user._id, tokens.refreshToken);

            return {
                user,
                ...tokens
            }

    }
    async login(username,password) {
            const user = await userModel.findOne({username});
            if(!user) throw new Error('user not exist');

            const match = await bcrypt.compare(password, user.hash);
            if(!match) throw new Error('invalid password');

            const tokens = tokenService.generateTokens({username, id: user._id});
            await tokenService.saveToken(user._id, tokens.refreshToken);

            return {
                user,
                ...tokens
            }

    }
    async refresh(refreshToken) {
        if(!refreshToken) {
            throw new Error('not auth')
        }
        const check = tokenService.validateRefresh(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!check || !tokenFromDb) {
            throw new Error('not auth');
        }

        const user = await userModel.findById(check.id);
        const tokens = tokenService.generateTokens({username:user.username, id: user._id});
        await tokenService.saveToken(user._id,tokens.refreshToken)
        return {
            user,
            ...tokens
        }
    }
}

module.exports = new UserService();