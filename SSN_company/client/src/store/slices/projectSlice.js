    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import ProjectService from '../../services/ProjectService';

    export const createProjects = createAsyncThunk('project/createProjects', async ({projectData}) => {
        console.log(projectData)
        const response = await ProjectService.createProjects(projectData);

        return response;
    });

    export const getProjects = createAsyncThunk('project/getProjects', async ({ id_user, role }) => {
        const response = await ProjectService.getProjects(id_user, role);

        return response;
    });

    export const removeStack = createAsyncThunk('project/removeStack', async ({ id_project, id_stack }) => {
        console.log( id_project, id_stack )
        const response = await ProjectService.removeStack(id_project, id_stack);

        return response;
    });

    export const removeUser= createAsyncThunk('project/removeUser', async ({  id_project, id_user, id_stack  }) => {
        console.log( id_project, id_user  )
        const response = await ProjectService.removeUser(id_project, id_user, id_stack);

        return response;
    });

    export const addStack= createAsyncThunk('project/addStack', async ({  id_project, id_stack, count_required }) => {
        const response = await ProjectService.addStack(id_project, id_stack, count_required);

        return response;
    });

    const projectSlice = createSlice({
        name: 'project', 
        initialState: {
            projects: {},
            oldProjects: {},
            oldFilter: '',
            isLoading: false,
            currentFilter: '',
        },
        reducers: {
            setProjects(state, action) {
                state.projects = action.payload; 
            },
            setLoading(state, action) { 
                state.isLoading = action.payload;
            },
            setCurrentFilter(state, action) {
                state.currentFilter = action.payload;
            },
            saveOldProjects(state) {
                state.oldProjects = state.projects; 
                state.oldFilter = state.currentFilter;
            },
            restoreOldProjects(state) {
                state.projects = state.oldProjects; 
                state.currentFilter = state.oldFilter; 
            },
        },
        extraReducers: (builder) => {  
            builder
                .addCase(getProjects.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(getProjects.fulfilled, (state, action) => {
                    state.projects = action.payload;
                    state.isLoading = false;
                    state.currentFilter = 'inProgress';
                })
                .addCase(getProjects.rejected, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(createProjects.fulfilled, (state, action) => {
                    window.location.reload();
                });
        },
    });

    export const { setProjects, setLoading, setCurrentFilter, saveOldProjects, restoreOldProjects } = projectSlice.actions;

    export default projectSlice.reducer;