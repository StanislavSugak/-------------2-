const projectQueries = {
    employee: {
        completed: `SELECT * FROM GetProjectsDataByUserFilter($1, 'completed')`,
        inProgress: `SELECT * FROM GetProjectsDataByUserFilter($1, 'progress')`,
        notStarted: `SELECT * FROM GetProjectsDataByUserFilter($1, NULL)`, //null1
    },
    teamlead: {
        completed: `SELECT * FROM GetProjectsDataByTeamleadFilter($1, 'completed')`,
        inProgress: `SELECT * FROM GetProjectsDataByTeamleadFilter($1, 'progress')`,
        notStarted: `SELECT * FROM GetProjectsDataByTeamleadFilter($1, NULL)`,
    }
};

const employeeQueries = {
    employee: {
        getEmployees: `SELECT * FROM GetUsers($1)`,
    }
}

const userQueries = {
    user: {
        getUser: `SELECT * FROM getUser($1)`
    }
}

const techologyQueries = {
    stack: {
        getStack: `SELECT * FROM getStack()`
    },
    direction: {
        getDirection: `SELECT * FROM getDirection()`
    }
}


module.exports = { projectQueries, employeeQueries, userQueries, techologyQueries};