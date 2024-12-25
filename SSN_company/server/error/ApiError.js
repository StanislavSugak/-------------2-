class ApiError extends Error{
    constructor(status, message){
        super();
        this.status = status
        this.message = message
    }

    static ok(message){
        return new ApiError(200, message); // Код 200 для успешного запроса
    }    

    static badRequest(message) {
        return new ApiError(400, message); // Код 400 для неверного запроса
    }

    static unauthorized(message) { // Ошибка не авторизованного доступа
        return new ApiError(401, message);
    }

    static forbidden(message) { // Доступ запрещён
        return new ApiError(403, message);
    }

    static notFound(message) { // Ошибка, когда объект не найден
        return new ApiError(404, message);
    }

    static conflict(message) {
        return new ApiError(409, message); // Код 409 для конфликта
    }

    static internal(message) { // Внутренняя ошибка сервера
        return new ApiError(500, message);
    }
}


module.exports = ApiError