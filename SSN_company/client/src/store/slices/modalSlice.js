import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
        headerText: '',
        modalContent: null,
        openSelects: [],
    },
    reducers: {
        openModal(state) {
            state.isOpen = true;
        },
        closeModal(state) {
            state.isOpen = false;
        },
        setHeaderText(state, action){
            state.headerText = action.payload;
        },
        setModalContent(state, action) { // Действие для установки контента
            state.modalContent = action.payload;
        },
        toggleSelectOpen(state, action) {
            const id = action.payload;
            // Закрываем все селекторы, кроме выбранного
            if (state.openSelects.includes(id)) {
                state.openSelects = state.openSelects.filter(selectId => selectId !== id);
            } else {
                state.openSelects = [id]; // Оставляем только открытый селектор
            }
        }
    },
});

export const { openModal, closeModal, setHeaderText, setModalContent,toggleSelectOpen } = modalSlice.actions;

export default modalSlice.reducer;