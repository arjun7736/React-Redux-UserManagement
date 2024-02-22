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
            state.loading = false;
            state.error = action.payload;
        },
        userFetchStart: (state) => {
            state.loading = true;
        },
        userFetchSuccess: (state, action) => {
            state.userData = action.payload;
            state.error = false;
            state.loading = false;
        },
        userFetchFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userUpdateStart: (state) => {
            state.loading = false
        },
        userUpdateSuccess: (state, action) => {
            state.updatedUserData = action.payload;
            state.loading = false;
            state.error = false;
        },
        userUpdateError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userSearchStart: (state) => {
            state.loading = false
        },
        userSearchSuccess: (state, action) => {
            state.userData = action.payload;
            state.loading = false;
            state.error = false;
        },
        userSearchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentAdmin = null;
            state.loading = false;
            state.error = false
        }
    }
})

export const { loginStart, signOut, loginSuccess, loginError, userFetchStart, userFetchSuccess, userFetchFailure, userUpdateError, userUpdateSuccess, userUpdateStart,userSearchError,userSearchSuccess,userSearchStart } = adminSlice.actions
export default adminSlice.reducer;