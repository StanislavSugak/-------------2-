import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class UserService extends BaseService {
    async getUser(id_user){
        const response = await BaseService.request("get", API_ENDPOINTS.USER.GET_ONE_USER, { params: { id_user } });
        console.log(response);
        return response;
    }
    
    async updateUser(userPersonalData){

        const response = await BaseService.request("put", API_ENDPOINTS.USER.UPDATE_USER, { userPersonalData });

        return response;
    }

    async addUserStack(userStack){

        const response = await BaseService.request("post", API_ENDPOINTS.USER.ADD_STACK_USER, { userStack });

        return response;
    }

    async registrationUser(email, password, role, id_direction, name, surname){
        const response = await BaseService.request("post", API_ENDPOINTS.USER.REGISTRATION, { email, password, role, id_direction, name, surname});

        return response;
    }
}

const userServiceInstance = new UserService();

export default userServiceInstance;
