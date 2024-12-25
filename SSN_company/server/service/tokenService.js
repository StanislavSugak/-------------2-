const {Refresh_Token} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')


class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'})

        return{ accessToken, refreshToken }
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
            return userData;
        } catch(e){
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
            return userData;
        } catch(e){
            return null;
        }
    }

    async saveToken(id_user, refreshToken){
        const tokenData = await Refresh_Token.findOne({where: {id_user}})
        if(tokenData){
            tokenData.refresh_token = refreshToken;
            return tokenData.save();
        }

        const token = await Refresh_Token.create({id_user, refresh_token: refreshToken})
        return token
    }

    async removeToken(refreshToken){
        const tokenData = await Refresh_Token.deleteOne({where: {refresh_token: refreshToken}})

        return tokenData;
    }

    async findToken(refreshToken){
        const tokenData = await Refresh_Token.findOne({where: {refresh_token: refreshToken}})
        
        return tokenData;
    }
}

module.exports = new TokenService()