import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: "form",
    initialState: {
        createTask: {
            name: '',
            description: '',
            date_start: '', // Добавляем состояние для даты
        },
        createWish: {
            direction: '',
            stack: '',
        },
    },
    reducers: {
        setName(state, action) {
            console.log("Setting name:", action.payload);
            state.createTask.name = action.payload;
        },
        setDescription(state, action) {
            state.createTask.description = action.payload;
        },
        setDate(state, action) {
            state.createTask.date_start = action.payload; // Сохраняем дату
        },
        resetForm(state) {
            state.createTask.name = '';
            state.createTask.description = '';
            state.createTask.date_start = ''; // Сбрасываем дату
            console.log("куыукыукык:");
        },
        setDirection(state, action) {
            console.log("Setting direction:", action.payload);
            state.createWish.direction = action.payload;
        },
        setStack(state, action) {
            state.createWish.stack = action.payload;
        },
        resetWishForm(state) {
            state.createWish.direction = '';
            state.createWish.stack = '';
            console.log("Wish form reset");
        },
    },
});

export const { 
    setName, setDescription, setDate, resetForm,
    setDirection, setStack, resetWishForm,
    setPersonalInfo, resetPersonalInfo
} = formSlice.actions;

export default formSlice.reducer;