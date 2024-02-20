import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from "../../api/apiSlice";

const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse(response, meta, arg) {
                return userAdapter.setAll(initialState, response)
            },
            providesTags: (response, error, arg) => [
                { type: 'User', id: "LIST" },
                ...response?.ids.map(id => ({ type: 'User', id }))
            ]
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: 'LIST'}
            ]
        }),
        removeUser: builder.mutation({
            query: ({id}) => ({
                url: `/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: 'LIST'}
            ]
        })
    })
});

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useRemoveUserMutation,
} = extendedApiSlice

const selectUsersData = createSelector(
    ([state, id]) => extendedApiSlice.endpoints.getUsers.select(id)(state),
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
} = userAdapter.getSelectors(state => selectUsersData(state) ?? initialState)