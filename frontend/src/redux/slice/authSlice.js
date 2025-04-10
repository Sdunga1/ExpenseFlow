import { createSlice } from "@reduxjs/toolkit";

//! initial state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user:null,
    },

    //Reducers
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload;
        },

        //Logout action
        logoutAction: (state) => {
            state.user = null;
        }
    }
})

//! Generate actions
export const {loginAction, logoutAction} = authSlice.actions;

//! Generate the reducers
const authReducer = authSlice.reducer;
export default authReducer;