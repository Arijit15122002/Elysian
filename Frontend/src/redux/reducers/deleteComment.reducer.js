import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    postId : null,
    postAuthorId : null,
    commentId : null,
    replyId : null,
    dropdownOpen : false,
}

const deleteCommentSlice = createSlice({
    name : 'deleteComment',
    initialState,
    reducers : {
        openDropdown : (state, action) => {
            state.postId = action.payload.postId
            state.postAuthorId = action.payload.postAuthorId
            state.commentId = action.payload.commentId
            state.replyId = action.payload.replyId
            state.dropdownOpen = true
        },
        closeDropdown : (state) => {
            state.postId = null
            state.postAuthorId = null
            state.commentId = null
            state.replyId = null
            state.dropdownOpen = false
        }
    }
})

export const { openDropdown, closeDropdown } = deleteCommentSlice.actions
export default deleteCommentSlice