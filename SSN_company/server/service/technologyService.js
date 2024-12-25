const ApiError = require("../error/ApiError");
 
const { techologyQueries } = require("../queries/queries");
const sequelize = require("../db"); 
const { User_Learn } = require("../models/models");


class TechnologyService {
    async create(id_user, id_stack){
        const project = await User_Learn.create({id_user: id_user, id_stack: id_stack, date_enter: new Date()} );

        return project;
    }

    async getAll(){
        let direction = [];
        let stack = [];

        direction  = await sequelize.query(techologyQueries.direction.getDirection, { type: sequelize.QueryTypes.SELECT });
        stack = await sequelize.query(techologyQueries.stack.getStack, { type: sequelize.QueryTypes.SELECT });

        return {
            direction,
            stack
        };
    }

    async deleteWish(id) {
        const wish = await User_Learn.findByPk(id);
    
        if (!wish) {
            throw ApiError.notFound(`Wish with ID ${id} not found`);
        }
    
        await wish.update({date_end: new Date()});
    
        return wish;
    }
}

module.exports = new TechnologyService();
