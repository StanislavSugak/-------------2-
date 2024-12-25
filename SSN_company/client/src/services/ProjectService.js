import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class ProjectService extends BaseService {
    async createProjects(projectData){
        console.log(projectData)
        const response = await BaseService.request("post", API_ENDPOINTS.PROJECT.CREATE_PROJECTS, { projectData } );
        console.log(response)
        return response;
    }

    async getProjects(id_user, role){
        const response = await BaseService.request("get", API_ENDPOINTS.PROJECT.GET_PROJECTS, { params: { id_user, role } });

        return response;
    }

    async removeStack(id_project, id_stack){
        const response = await BaseService.request("delete", API_ENDPOINTS.PROJECT.REMOVE_STACK, {  params: {id_project, id_stack} });
        window.location.reload();
        return response;
    }

    async removeUser(id_project, id_user, id_stack){
        const response = await BaseService.request("delete", API_ENDPOINTS.PROJECT.REMOVE_USER, {  params: {id_project, id_user, id_stack} });
        window.location.reload();
        return response;
    }

    async addStack(id_project, id_stack, count_required){
        console.log(id_project, id_stack, count_required)
        const response = await BaseService.request("post", API_ENDPOINTS.PROJECT.ADD_STACK, {id_project, id_stack, count_required});
        console.log(response)
        return response;
    }
}

const projectServiceInstance = new ProjectService();

export default projectServiceInstance;
