const ApiError = require("../error/ApiError");
const Controller = require("./controller");

const projectService = require("../service/projectService");

class ProjectController extends Controller {
    async create(req, res){
        const {projectData} = req.body; 
        console.log(projectData);
        const project = await projectService.create(projectData);

        return res.json(project);
    }

    // async update(req, res) {
    //     const { id_user, id_stack } = req.params;
    //     const { grade, is_mentor } = req.body;

    //     const user_stackData = { id_user, id_stack, grade, is_mentor };

    //     Controller.checkFields(user_stackData);

    //     const filteredUserData = Object.fromEntries(
    //         Object.entries(user_stackData).filter(
    //             ([key, value]) => value !== null && value !== undefined
    //         )
    //     );

    //     const user_stackUpdated = await user_stackService.updateStack(
    //         user_stackData
    //     );

    //     return res.json(user_stackUpdated);
    // }
    
    async getAll(req, res) {
        const {id_user, role} = req.query;
        
        const users = await projectService.getAll(id_user, role);

        return res.json(users);
    }
    
    async removeStack(req, res){
        const {id_project, id_stack} = req.query;
        console.log(id_project, id_stack)
        const stack = await projectService.removeStack(id_project, id_stack);

        return res.json(stack);
    }

    async removeUser(req, res){
        const {id_project,id_user, id_stack} = req.query;
        console.log(id_project, id_user, id_stack)
        const stack = await projectService.removeUser(id_project, id_user, id_stack);

        return res.json(stack);
    }
    
    async createStack(req, res){
        const {id_project, id_stack, count_required} = req.body;
        console.log(id_project, id_stack, count_required);
        const stack = await projectService.createStack(id_project, id_stack, count_required);

        return res.json(stack);
    }
}

module.exports = new ProjectController();