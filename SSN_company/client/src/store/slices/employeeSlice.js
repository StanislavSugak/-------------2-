import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EmployeeService from '../../services/EmployeeService';

export const getEmployees = createAsyncThunk('employee/getEmployees', async (sort_by) => {
    const response = await EmployeeService.getEmployees(sort_by);
    console.log(response)
    return response;
});

export const getReportEmployees = createAsyncThunk('employee/getReportEmployees', async (users) => {
    const response = await EmployeeService.getReportEmployees(users);
    console.log(response)
    return response.data;
});


const employeeSlice = createSlice({
    name: 'employee', 
    initialState: {
        employees: {},
        isLoading: false,
    },
    reducers: {
        setEmployees(state, action) {
            state.employees = action.payload; 

        },
        setLoading(state, action) { 
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {  
        builder
            .addCase(getEmployees.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.employees = action.payload;
                state.isLoading = false;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.isLoading = false;
            })
    },
});

export const { setEmployees, setLoading } = employeeSlice.actions;

export default employeeSlice.reducer;