const ApiError = require("../error/ApiError");
const Controller = require("./controller");
const userService = require("../service/userService");
const userPersonalService = require("../service/userPersonalService");

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

class UserController extends Controller {
    async registration(req, res) {
        const { role, email, password, id_direction, name, surname } = req.body;

        const user_regData = { role, email, password, id_direction, name, surname }

        Controller.checkFields(user_regData);
        
        const userData = await userService.registration(user_regData);

        if (!userData) {
            return next(ApiError.internal("Ошибка при создании пользователя"));
        }

        return res.json(userData);
    }

    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw ApiError.badRequest("Email и пароль обязательны для входа")
        }

        const userData = await userService.login(email, password);
        if (!userData) {
            throw ApiError.unauthorized("Неверный email или пароль");
        }

        res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return res.json(userData);
    }

    async logout(req, res) {
        const { refreshToken } = req.cookies;
        const token = await userService.logout(refreshToken);

        res.clearCookie("refreshToken");

        return res.json(token); 
    }

    async refresh(req, res) {
        const { refreshToken } = req.cookies;

        const userData = await userService.refresh(refreshToken);

        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true,});

        return res.json(userData);
    }

    async update(req, res){
        const {userPersonalData} = req.body
        console.log(userPersonalData)
        const updatePersonal = await userPersonalService.update(userPersonalData);

        return res.json(updatePersonal);
    }

    async addStackUser(req, res){
        const {userStack} = req.body
        console.log(userStack)
        const updatePersonal = await userPersonalService.addStack(userStack);

        return res.json(updatePersonal);
    }

    async getAll(req, res) {
        const {sort_by} = req.query;

        const users = await userService.getAll(sort_by);

        return res.json(users);
    }

    async getOne(req, res){
        const {id_user} = req.query;
        
        const user = await userService.getOne(id_user);
        console.log(user)
        return res.json(user);
    }
    
    async getReport(req, res) {
        const { users } = req.query; 
    }
}

module.exports = new UserController();