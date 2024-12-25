const {Project, Project_Stack, User_Stack, Project_User} = require("../models/models");
const ApiError = require("../error/ApiError");
 
const { projectQueries } = require("../queries/queries");
const sequelize = require("../db"); 


class ProjectService {
    async create(projectData) {
        if (projectData.name.length > 25) {
            throw ApiError.internal("Имя проекта не должно превышать 25 символов");
        }

        const project = await Project.create({...projectData});

        return project;
    }

    async getAll(id_user, role){
        const roleQueries = projectQueries[role === "teamlead" ? 'teamlead' : 'employee'];

        let completedProjects = [];
        let inProgressProjects = [];
        let notStartedProjects = [];

        completedProjects = await sequelize.query(roleQueries.completed, { bind: [id_user], type: sequelize.QueryTypes.SELECT });
        inProgressProjects = await sequelize.query(roleQueries.inProgress, { bind: [id_user], type: sequelize.QueryTypes.SELECT });
        notStartedProjects = await sequelize.query(roleQueries.notStarted, { bind: [id_user], type: sequelize.QueryTypes.SELECT });

        return {
            completed: completedProjects,
            inProgress: inProgressProjects,
            notStarted: notStartedProjects,
        };
    }

    async removeStack(id_project, id_stack) {
        const stack = await Project_Stack.findOne({where: {id_project: id_project, id_stack: id_stack}});
    
        if (!stack) {
            throw ApiError.notFound(`Stack not found`);
        }
        await stack.destroy();

        return stack;
    }

    async removeUser(id_project, id_user, id_stack) {
        const stackUser = await User_Stack.findOne({where: {id_user: id_user, id_stack: id_stack}});
    
        if (!stackUser) {
            throw ApiError.notFound(`User not found`);
        }
        console.log('dfsfs', stackUser.id)
        const stack = await Project_User.findOne({where: {id_project: id_project, id_user_stack: stackUser.id}})
        console.log(stack)
        await stack.destroy();

        return stack;
    }


    async createStack(id_project, id_stack, count_required) {

        const project = await Project_Stack.create({id_project: id_project, id_stack: id_stack, count_required: count_required});
        console.log('sdfsdfsdfsdf')
        return project;
    }
}

module.exports = new ProjectService();
