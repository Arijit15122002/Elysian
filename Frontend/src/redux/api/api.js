import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({

    reducerPath : 'api',
    baseQuery : fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_BASE_URL}/api/`
    }),

    tagTypes : ['Chat'],   

    endpoints : (builder) => ({

        myChats : builder.query({
            query : ({userId}) => ({
                url : "chat/my"
            }),
            providesTags : ['Chat']
        }),

        searchUser : builder.query({
            query : (name) => ({
                url : `user/search/${name}`,
            }),
            providesTags : ['User'],
        }),



    })

})

export default api

export const { useMyChatsQuery, useLazySearchUserQuery } = api