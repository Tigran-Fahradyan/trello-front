import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from "../../api/apiSlice";

const boardAdapter = createEntityAdapter();
const initialState = boardAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      getBoards: builder.query({
         query: () => '/boards',
         transformResponse(response, meta, arg) {
            return boardAdapter.setAll(initialState, response)
         },
         providesTags: (response, error, arg) => [
            { type: 'Board', id: "LIST" },
            ...response.ids.map(id => ({ type: 'Board', id }))
         ]
      }),
      addBoard: builder.mutation({
         query: (board) => ({
            url: '/boards',
            method: 'POST',
            body: board
         }),
         invalidatesTags: (result, error, arg) => [
            {type: 'Board', id: arg.id}
         ]
      }),
      deleteBoard: builder.mutation({
         query: ({id}) => ({
            url: `/boards/${id}`,
            method: 'DELETE',
            body: id
         }),
         invalidatesTags: (result, error, arg) => [
            {type: 'Board', id: arg.id}
         ]
      }),
      getSingleBoard: builder.query({
         query: ({id}) => `/boards/${id}`,
         transformResponse(response, meta, arg) {
            return response
         }
      }),
      getBoardAssignedUsers: builder.query({
         query: ({id}) => `/boards/${id}/users`,
         transformResponse(response, meta, arg) {
            return boardAdapter.setAll(initialState, response)
         },
         providesTags: (result, error, arg) => [
            { type: 'BoardUser', id: "LIST" },
            ...result.ids.map(id => ({ type: 'BoardUser', id }))
         ]
      }),
      assignBoardUser: builder.mutation({
         query: ({id, body}) => ({
            url: `/boards/${id}/assign_user`,
            method: 'POST',
            body: body
         }),
         invalidatesTags: (result, error, arg) => [
            {type: 'BoardUser', id: arg.id}
         ]
      }),
      removeBoardUser: builder.mutation({
         query: ({id, body}) => ({
            url: `/boards/${id}/unassign_user`,
            method: 'DELETE',
            body: body
         }),
         invalidatesTags: ['BoardUsers']
      }),
   })
});

export const {
   useGetBoardsQuery,
   useAddBoardMutation,
   useDeleteBoardMutation,
   useGetBoardAssignedUsersQuery,
   useAssignBoardUserMutation,
   useRemoveBoardUserMutation,
} = extendedApiSlice

export const selectBoardsResult = extendedApiSlice.endpoints.getBoards.select()

const selectBoardsData = createSelector(
    selectBoardsResult,
    boardsResult => boardsResult.data
)

export const {
   selectAll: selectAllBoards,
   selectById: selectBoardById,
} = boardAdapter.getSelectors(state => selectBoardsData(state) ?? initialState)