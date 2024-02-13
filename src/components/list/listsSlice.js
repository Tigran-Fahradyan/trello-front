import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from "../../api/apiSlice";

const listAdapter = createEntityAdapter();
const initialState = listAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLists: builder.query({
            query: ({id}) => `/boards/${id}/board_lists`,
            transformResponse(response, meta, arg) {
                return listAdapter.setAll(initialState, response)
            },
            providesTags: (response, error, arg) => [
                { type: 'List', id: "LIST" },
                ...response?.ids.map(id => ({ type: 'List', id }))
            ]
        }),
        addList: builder.mutation({
            query: ({id, name}) => ({
                url: `/boards/${id}/board_lists`,
                method: 'POST',
                body: {name: name}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'List', id: arg.id}
            ]
        }),
        deleteList: builder.mutation({
            query: ({list}) => ({
                url: `/boards/${list.board_id}/board_lists/${list.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'List', id: arg.id}
            ]
        }),
        updateList: builder.mutation({
            query: ({list, body}) => ({
                url: `/boards/${list.board_id}/board_lists/${list.id}`,
                method: "PATCH",
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'List', id: arg.id}
            ]
        })
    })
});

export const {
    useGetListsQuery,
    useAddListMutation,
    useDeleteListMutation,
    useUpdateListMutation
} = extendedApiSlice

const selectListsData = createSelector(
    ([state, id]) => extendedApiSlice.endpoints.getLists.select(id)(state),
    listsResult => listsResult.data
)

export const {
    selectAll: selectAllLists,
    selectById: selectListById,
} = listAdapter.getSelectors(state => selectListsData(state) ?? initialState)