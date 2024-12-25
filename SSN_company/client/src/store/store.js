import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import settingReducer from './slices/settingSlice';
import employeeReducer from './slices/employeeSlice';
import userReducer from './slices/userSlice'
import modalReducer from './slices/modalSlice'
import formReducer from './slices/formSlice'
import technologyReducer from './slices/technologySlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        setting: settingReducer,
        employee: employeeReducer,
        user: userReducer,
        modal: modalReducer,
        form: formReducer,
        technology: technologyReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;