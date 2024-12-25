const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const tokenService = require('../service/tokenService')

module.exports = function (req, res, next){
    if(req.method === "OPTIONS"){
        next()
    }
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.badRequest('пользователь не авторизовам'))
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) {
            return next(ApiError.badRequest('пользователь не авторизовам'))
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.badRequest('пользователь не авторизовам'))
        }

        req.user = userData;
        next();
    } catch(e){
        res.status(401).json({message: "Пользователь неавторизован"})
    }
}