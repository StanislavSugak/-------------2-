import { API_ENDPOINTS } from "../http/apiEndpoints";
import BaseService from "./BaseService";

class EmployeeService extends BaseService {
    async getEmployees(sort_by){
        const response = await BaseService.request("get", API_ENDPOINTS.EMPLOYEE.GET_EMPLOYEES, {params: { sort_by } });

        return response;
    }

    async getReportEmployees(users) {
        const response = await BaseService.request("get", API_ENDPOINTS.EMPLOYEE.GET_REPORT_EMPLOYEES, { params: {users} });

        return response.data; 
    }
    
}

const employeeServiceInstance = new EmployeeService();

export default employeeServiceInstance;
