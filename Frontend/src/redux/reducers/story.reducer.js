import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    storyContainer : null
}

const currentStoryContainerSlice = createSlice({
    name : 'currentStoryContainer',
    initialState,
    reducers : {
        setCurrentStoryContainer : (state, action) => {
            state.storyContainer = action.payload
        }
    }
})

export default currentStoryContainerSlice
export const { setCurrentStoryContainer } = currentStoryContainerSlice.actions
