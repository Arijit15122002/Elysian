import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deviceType : ''
}

const deviceTypeSlice = createSlice({
    name : 'device',
    initialState,
    reducers : {
        setDeviceType : (state, action) => {
            state.deviceType = action.payload
        }
    },
})

export default deviceTypeSlice
export const { setDeviceType } = deviceTypeSlice.actions