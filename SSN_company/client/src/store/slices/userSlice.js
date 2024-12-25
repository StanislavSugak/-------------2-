import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/UserService';

export const getUser = createAsyncThunk('user/getUser', async ({ id_user}) => {
    const response = await UserService.getUser(id_user);

    return response[0];
});

export const updateUser = createAsyncThunk('user/updateUser', async ({userPersonalData}) => {
    const response = await UserService.updateUser(userPersonalData);

    return response;
});

export const addStackUser = createAsyncThunk('user/addStackUser', async (userStack) => {
    console.log(userStack)
    const response = await UserService.addUserStack(userStack);

    return response;
});

export const registrationUser = createAsyncThunk('user/registrationUser', async ({email, password, role, id_direction, name, surname}) => {
    const response = await UserService.registrationUser(email, password, role, id_direction, name, surname);

    return response;
});

const userSlice = createSlice({
    name: 'user', 
    initialState: {
        user: null,
        isLoading: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {  
        builder
            .addCase(getUser.pending, (state, action) => { 
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
            })  
            .addCase(updateUser.fulfilled, () => {
                window.location.reload();
            })
    },
});

export const {  } = userSlice.actions;

export default userSlice.reducer;