import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TechnologyService from '../../services/TechnologyService';

export const createWish = createAsyncThunk('technology/createWish', async ({id_user, id_stack}) => {
    console.log('sdfsd')
    const response = await TechnologyService.createWish(id_user, id_stack);
    return response;    
});

export const getTechnology = createAsyncThunk('technology/getTechnology', async () => {
    const response = await TechnologyService.getTechnology();
    return response;    
});

export const endWish = createAsyncThunk('technology/getTechnology', async ({id}) => {
    const response = await TechnologyService.endWish(id);
    return response;    
});

const technologySlice = createSlice({
    name: "technology",
    initialState: {
        direction: [],
        stack: [],
    },
    reducers: {
       
    },
    extraReducers: (builder) => {  
        builder
            .addCase(getTechnology.pending, (state, action) => {

            })
            .addCase(getTechnology.fulfilled, (state, action) => {
                state.direction = action.payload.direction;
                state.stack = action.payload.stack;
            })
            .addCase(getTechnology.rejected, (state, action) => {
            });
        },    
});

export const { } = technologySlice.actions;

export default technologySlice.reducer;