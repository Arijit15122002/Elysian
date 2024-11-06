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
        }
    }
})

export default suggestedUsersSlice  
export const { setSuggestedUsers } = suggestedUsersSlice.actions

