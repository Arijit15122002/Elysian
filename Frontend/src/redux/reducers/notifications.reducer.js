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
            state.notifications.push(action.payload)
        }
    }
})

export default notificationsSlice
export const { setNotifications, addNotifications } = notificationsSlice.actions