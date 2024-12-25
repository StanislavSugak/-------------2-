const { User, Direction, User_Personal, User_Stack, Stack, User_Learn } = require("../models/models");
const userPersonalService = require('./userPersonalService')
const tokenService = require("./tokenService");
const UserDTO = require("../dtos/userDTO");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");

const { employeeQueries, userQueries } = require("../queries/queries");
const sequelize = require("../db"); 

const {jsPDF} = require('jspdf');
require('jspdf-autotable');


class UserService { //role, email, password, id_direction
    async registration(userData) {
        const { email, password } =  userData;
        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            throw ApiError.conflict(
                "Пользователь с таким email уже существует"
            );
        }
        
        const hashPassword = await bcrypt.hash(password, 3);

        const user = await User.create({email, password: hashPassword, id_direction: userData.id_direction, role: userData.role});
        const userPersonal = await User_Personal.create({id_user: user.id, name: userData.name, surname: userData.surname,  date_hire: new Date() })
        return user;
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw ApiError.unauthorized("Пользователь не найден");
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.unauthorized("Пароли не верны");
        }

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.badRequest("Токен не предоставлен");
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorized("Не авторизован");
        }
        const user = await User.findByPk(userData.id);
        if (!user) {
            throw ApiError.notFound("Пользователь не найден");
        }

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({ ...userDTO });
        if (!tokens) {
            throw ApiError.internal("Ошибка при создании токенов");
        }

        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return { ...tokens, user: userDTO };
    }
    
    async getAll(sort_by) {
        let users = [];

        users = await sequelize.query(employeeQueries.employee.getEmployees, { bind: [sort_by], type: sequelize.QueryTypes.SELECT });

        return users;
    }

    async getOne(id_user){
        const user = await sequelize.query(userQueries.user.getUser, { bind: [id_user], type: sequelize.QueryTypes.SELECT });

        return user;
    }
    
    async getReport(sortedEmployees) {
        
    }
}

module.exports = new UserService();
