import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://trello-back-064098635aa0.herokuapp.com'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Boards', 'BoardLists', 'ListTasks'],
    endpoints: (builder) => ({
        getBoards: builder.query({
            query: () => '/boards',
            providesTags: ['Boards']
        }),
        addBoard: builder.mutation({
            query: (board) => ({
              url: '/boards',
                method: 'POST',
                body: board
            }),
            invalidatesTags: ['Boards']
        }),
        deleteBoard: builder.mutation({
            query: ({id}) => ({
                url: `/boards/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Boards']
        }),
        getSingleBoard: builder.query({
            query: ({id}) => `/boards/${id}`,
            providesTags: ['Boards']
        }),
        getBoardAssignedUsers: builder.query({
            query: ({id}) => `/boards/${id}/users`,
            providesTags: ['Boards']
        }),
        getBoardLists: builder.query({
            query: ({id}) => `/boards/${id}/board_lists`,
            providesTags: ['BoardLists']
        }),
        deleteBoardList: builder.mutation({
            query: ({list}) => ({
                url: `/boards/${list.board_id}/board_lists/${list.id}`,
                method: 'DELETE',
                body: list.id
            }),
            invalidatesTags: ['BoardLists']
        }),
        getListTasks: builder.query({
            query: ({id, list_id}) => `/boards/${id}/board_lists/${list_id}/list_tasks`,
            providesTags: ['ListTasks']
        })
    })
})

export const {
    useGetBoardsQuery,
    useAddBoardMutation,
    useDeleteBoardMutation,
    useGetSingleBoardQuery,
    useGetBoardAssignedUsersQuery,
    useGetBoardListsQuery,
    useDeleteBoardListMutation,
    useGetListTasksQuery,
} = apiSlice