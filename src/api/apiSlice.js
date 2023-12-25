import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerpath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://trello-back-064098635aa0.herokuapp.com' }),
    endpoints: (builder) => ({
        getBoards: builder.query({
            query: () => '/boards'
        })
    })
})

export const {
    useGetBoardsQuery
} = apiSlice