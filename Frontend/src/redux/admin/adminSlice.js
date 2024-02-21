import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            state.loading = false;
            state.error = false;
        },
        loginError: (state, action) => { 
            state.loading=false;
            state.error=action.payload;
        }
    }
})

export const {loginStart,loginSuccess,loginError}=adminSlice.actions
export default adminSlice.reducer;