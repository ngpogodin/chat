const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel')

class TokenService {
     generateTokens(payload) {
        try{
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '3d'});

            return {
                refreshToken,
                accessToken
            }
        }catch(e) {
          console.log(e)
        }
    }
    async saveToken(userId, refreshToken) {
         const tokenData = await tokenModel.findOne({user: userId});
         if(tokenData) {
             tokenData.refreshToken = refreshToken
             tokenData.save();
             return tokenData;
         }
         const token = await tokenModel.create({user: userId, refreshToken});
         return token
    }
    async validateAccess(token) {
         try{
             const userData = await jwt.verify(token,process.env.JWT_ACCESS_SECRET);
             return userData
         }catch(e) {
             return null
         }
    }
    validateRefresh(token) {
         try {
             const userData =  jwt.verify(token, process.env.JWT_REFRESH_SECRET);
             return userData
         }catch(e) {
             return null
         }
    }
    async findToken(refreshToken) {
         const tokenData = await tokenModel.findOne({refreshToken});
         return tokenData
    }

}

module.exports = new TokenService()