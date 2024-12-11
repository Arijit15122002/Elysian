import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    suggestedUsers : []
}

const suggestedUsersSlice = createSlice({
    name : 'suggestedUsers',
    initialState,
    reducers : {
        setSuggestedUsers : (state, action) => {
            state.suggestedUsers = action.payload
        },
        clearSuggestedUsers : (state) => {
            state.suggestedUsers = []
        }
    }
})

export default suggestedUsersSlice  
export const { setSuggestedUsers, clearSuggestedUsers } = suggestedUsersSlice.actions

