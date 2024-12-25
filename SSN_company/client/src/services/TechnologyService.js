import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class TechnologyService extends BaseService {
    async createWish(id_user, id_stack){
        const response = await BaseService.request("post", API_ENDPOINTS.TECHNOLOGY.CREATE_WISH, {id_stack, id_user});

        return response;
    }

    async getTechnology(){
        const response = await BaseService.request("get", API_ENDPOINTS.TECHNOLOGY.GET_TECHNOLOGY);

        return response;
    }

    async endWish(id){
        const response = await BaseService.request("patch", API_ENDPOINTS.TECHNOLOGY.END_WISH, {id});

        return response;
    }
}

const technologyServiceInstance = new TechnologyService();

export default technologyServiceInstance;
