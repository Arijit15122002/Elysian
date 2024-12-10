import { configureStore, current } from '@reduxjs/toolkit'
import authSlice from './reducers/auth.reducer'
import api from './api/api'
import miscSlice from './reducers/misc.reducer'
import deviceTypeSlice from './reducers/deviceType.reducer'
import suggestedUsersSlice from './reducers/suggestedUsers.reducer'
import currentStoryContainerSlice from './reducers/story.reducer'
import notificationsSlice from './reducers/notifications.reducer'

const store =  configureStore({
    
    reducer: {
        [authSlice.name] : authSlice.reducer,
        [miscSlice.name] : miscSlice.reducer,
        [deviceTypeSlice.name] : deviceTypeSlice.reducer,
        [api.reducerPath] : api.reducer,
        [suggestedUsersSlice.name] : suggestedUsersSlice.reducer,
        [currentStoryContainerSlice.name] : currentStoryContainerSlice.reducer,
        [notificationsSlice.name] : notificationsSlice.reducer
        
    },
    middleware : (defaultMiddleware) => [...defaultMiddleware(), api.middleware]

})

export default store