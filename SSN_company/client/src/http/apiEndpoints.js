export const API_ENDPOINTS = {
    USER: {
        LOGIN: 'user/login',
        LOGOUT: 'user/logout',
        REGISTRATION: 'user/registration',
        REFRESH: 'user/refresh',
        GET_USER: 'user/',
        GET_ONE_USER: 'user/one',
        UPDATE_USER: 'user/',
        ADD_STACK_USER: 'user/add_stack'
    },
    PROJECT: {
        GET_PROJECTS: 'project/',
        CREATE_PROJECTS: 'project/',
        REMOVE_STACK: 'project/remove_stack',
        REMOVE_USER: 'project/remove_user',
        ADD_STACK: 'project/add_stack',
    },
    EMPLOYEE: {
        GET_EMPLOYEES: 'user/',
        GET_REPORT_EMPLOYEES: 'user/report',
    },
    TECHNOLOGY:{
        GET_TECHNOLOGY: 'technology/',
        CREATE_WISH: 'technology/',
        END_WISH: 'technology/end_wish'
    }
};