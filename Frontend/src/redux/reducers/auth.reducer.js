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
        },
        updateLocalUser : (state, action ) => {
            state.user = {
                ...state.user, ...action.payload
            }
        }
    }
}) 

export default authSlice
export const { userExists, userDoesNotExist } = authSlice.actions