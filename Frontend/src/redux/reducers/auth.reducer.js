import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : {},
    loggedIn : false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userExists : (state, action) => {
            state.user = action.payload,
            state.loggedIn = true
        },
        userDoesNotExist : (state) => {
            state.user = {},
            state.loggedIn = false
        }
    }
}) 

export default authSlice
export const { userExists, userDoesNotExist } = authSlice.actions

