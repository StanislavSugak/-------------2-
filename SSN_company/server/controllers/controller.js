const ApiError = require("../error/ApiError");

class Controller {
    constructor() {
        this.initializeAsyncMethods();
    }

    static AsyncCatch(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next); //?
        };
    }

    initializeAsyncMethods() {     
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        
        for (const method of methods) {
            if (typeof this[method] === 'function' && method !== 'constructor') {
                this[method] = Controller.AsyncCatch(this[method]);
            }
        }
    }
    
    static checkId(id, fieldName = 'id') {
        if (!id || isNaN(id) || parseInt(id) <= 0) {
            throw ApiError.badRequest(`Некорректный идентификатор: ${fieldName}`);
        }   
    }

    static checkString(line){
        if (!line || line.trim() === "") {
            throw ApiError.badRequest("Неккоректный параметр");
        }
    }

    static checkFields(obj) {
        for (const [key, value] of Object.entries(obj)) {  

            if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
                throw ApiError.badRequest(`Поле "${key}" не может быть пустым, null или undefined`);
            }

            if (key.startsWith('id_')) {   // Проверка для полей, начинающихся на id_
                Controller.checkId(value, key);
            }
        }
        return true; 
    }
}

module.exports = Controller;


