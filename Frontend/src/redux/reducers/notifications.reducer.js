import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications : []
}

const notificationsSlice = createSlice({
    name : 'notifications',
    initialState,
    reducers : {
        setNotifications : (state, action) => {
            state.notifications = action.payload
        },
        addNotifications : (state, action) => {
            return {
                ...state,
                notifications: [action.payload, ...state.notifications],
            };
        }, 
        clearNotifications : (state) => {
            state.notifications = []
        }
    }
})

export default notificationsSlice
export const { setNotifications, addNotifications, clearNotifications } = notificationsSlice.actions