const {User_Personal, User_Stack} = require("../models/models");
const ApiError = require("../error/ApiError");

class UserPersonalService {
    async create(id_user, persnonalData) {
        const personal = await User_Personal.create({id_user: id_user, ...persnonalData});
        
        return personal;
    }
    
    async update(userPersonalData){
        const updatePersonal = await User_Personal.update(userPersonalData, { where: {id_user: userPersonalData.id_user}});

        return updatePersonal;
    }

    async addStack(userStack){
        const updatePersonal = await User_Stack.create(userStack);

        return updatePersonal;
    }
}

module.exports = new UserPersonalService();
