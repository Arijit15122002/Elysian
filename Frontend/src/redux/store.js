import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth.reducer'
import api from './api/api'
import miscSlice from './reducers/misc.reducer'

const store =  configureStore({
    
    reducer: {
        [authSlice.name] : authSlice.reducer,
        [miscSlice.name] : miscSlice.reducer,
        [api.reducerPath] : api.reducer
    },
    middleware : (defaultMiddleware) => [...defaultMiddleware(), api.middleware]

})

export default store