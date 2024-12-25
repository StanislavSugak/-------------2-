const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
    console.log(err)
    console.log('123')
    if(err instanceof ApiError){ //мой класс ли
        console.log(err)
        return res.status(err.status).json({message: err.message}) 
    }
    return res.status(500).json({message: "Непредвиденная ошибка"})
}
