    import { createSlice } from "@reduxjs/toolkit";

    const settingSlice = createSlice({
        name: "setting",
        initialState: {
            isBurgerOpen: true,
            isLoading: false,
            currentPage: 1,
            currentFilter: 1,
            currentSort: 0, 
            pageOther: false,
        },
        reducers: {
            setBurgerOpen(state, action) {
                state.isBurgerOpen = action.payload;
            },
            setLoading(state, action) { 
                state.isLoading = action.payload;
            },
            setCurrentPage(state, action) { 
                state.currentPage = action.payload;
            },
            setCurrentFilter(state, action) {
                state.currentFilter = action.payload; 
            },
            setCurrentSort(state, action) {
                state.currentSort = action.payload; 
            },
            setPageOther(state, action) {
                state.pageOther = action.payload;
                localStorage.setItem('pageOther', action.payload); 
            },
        },
    });

    export const { setBurgerOpen, setLoading, setCurrentPage, setCurrentFilter, setCurrentSort, setPageOther  } = settingSlice.actions;

    export default settingSlice.reducer;