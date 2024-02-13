import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://trello-back-064098635aa0.herokuapp.com';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    // tagTypes: ['Users', 'Boards', 'BoardUsers', 'BoardLists', 'ListTasks'],
    tagTypes: ['Board'],
    endpoints: (builder) => ({})
});