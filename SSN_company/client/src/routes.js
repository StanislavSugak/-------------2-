import {ANALITIC_ROUTE, EMPLOYEE_ROUTE, LOGIN_ROUTE, PROJECT_ROUTE, SHAPING_ROUTE, WORKSPACE_ROUTE, SETTING_ROUTE, LOGOUT_ROUTE } from "./utils/consts";
import {IconAnalitic, IconBack, IconEmployee, IconLogout, IconProject, IconSetting, IconShaping, IconWorkspace} from "./utils/icon";
import {Analitic, Authorization, Employee, Project, Shaping, Workspace, Logout} from './utils/components'

export const teamleadRoutes = [
    {   
        path: EMPLOYEE_ROUTE,
        Component: Employee,
        icon: IconEmployee,
        name: "employee",
    },
    {
        path: SHAPING_ROUTE,
        Component: Shaping,
        icon: IconShaping,
        name: "shaping",
    }
];

export const employeeRoutes = [
    {
        path: PROJECT_ROUTE,
        Component: Project,
        icon: IconProject,
        name: "project",
    },
    {
        path: ANALITIC_ROUTE,
        Component: Analitic,
        icon: IconAnalitic,
        name: "analytic",
    },
    {
        path: WORKSPACE_ROUTE,
        Component: Workspace,
        icon: IconWorkspace,
        name: "workspace",
    },
];

export const commonRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Authorization,
        name: "authorization",
    }
];

export const basicRoutes = [
    {
        path: SETTING_ROUTE,
        Component: Logout,
        icon: IconSetting,
        name: "setting",
    },
    {
        path: LOGOUT_ROUTE,
        Component: Logout,
        icon: IconLogout,
        name: "logout",
    },
];