import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL = 'https://trello-back-064098635aa0.herokuapp.com'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['Users', 'Boards', 'BoardUsers', 'BoardLists', 'ListTasks'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['Users']
        }),
        addUser: builder.mutation({
            query: (user) => ({
              url: '/users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        removeUser: builder.mutation({
            query: ({id}) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        }),
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
            providesTags: ['BoardUsers']
        }),
        assignBoardUser: builder.mutation({
            query: ({id, body}) => ({
                url: `/boards/${id}/assign_user`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['BoardUsers']
        }),
        removeBoardUser: builder.mutation({
            query: ({id, body}) => ({
                url: `/boards/${id}/unassign_user`,
                method: 'DELETE',
                body: body
            }),
            invalidatesTags: ['BoardUsers']
        }),
        getBoardLists: builder.query({
            query: ({id}) => `/boards/${id}/board_lists`,
            providesTags: ['BoardLists']
        }),
        addBoardList: builder.mutation({
            query: ({id, name}) => ({
                url: `/boards/${id}/board_lists`,
                method: 'POST',
                body: {name: name}
            }),
            invalidatesTags: ['BoardLists']
        }),
        deleteBoardList: builder.mutation({
            query: ({list}) => ({
                url: `/boards/${list.board_id}/board_lists/${list.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['BoardLists']
        }),
        updateBoardList: builder.mutation({
            query: ({list, body}) => ({
                url: `/boards/${list.board_id}/board_lists/${list.id}`,
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ['BoardLists']
        }),
        getListTasks: builder.query({
            query: ({id, list_id}) => `/boards/${id}/board_lists/${list_id}/list_tasks`,
            providesTags: ['ListTasks']
        }),
        addListTask: builder.mutation({
            query: ({id, list_id, body}) => ({
                url: `/boards/${id}/board_lists/${list_id}/list_tasks`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['ListTasks']
        }),
        removeListTask: builder.mutation({
            query: ({id, list_id, task_id}) => ({
                url: `/boards/${id}/board_lists/${list_id}/list_tasks/${task_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['ListTasks']
        }),
        moveListTask: builder.mutation({
            query: ({id, list_id, task_id, body}) => ({
                url: `/boards/${id}/board_lists/${list_id}/list_tasks/${task_id}`,
                method: `PATCH`,
                body: body
            }),
            invalidatesTags: ['ListTasks']
        })
    })
})

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useRemoveUserMutation,
    useGetBoardsQuery,
    useAddBoardMutation,
    useDeleteBoardMutation,
    useGetSingleBoardQuery,
    useGetBoardAssignedUsersQuery,
    useGetBoardListsQuery,
    useAddBoardListMutation,
    useDeleteBoardListMutation,
    useUpdateBoardListMutation,
    useAssignBoardUserMutation,
    useRemoveBoardUserMutation,
    useGetListTasksQuery,
    useAddListTaskMutation,
    useRemoveListTaskMutation,
    useMoveListTaskMutation,
} = apiSlice