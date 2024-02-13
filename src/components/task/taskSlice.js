import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from "../../api/apiSlice";

const taskAdapter = createEntityAdapter();
const initialState = taskAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: ({id, list_id}) => `/boards/${id}/board_lists/${list_id}/list_tasks`,
            transformResponse(response, meta, arg) {
                return taskAdapter.setAll(initialState, response)
            },
            providesTags: (response, error, arg) => [
                { type: 'Task', id: "LIST" },
                ...response?.ids.map(id => ({ type: 'Task', id }))
            ]
        }),
        addTask: builder.mutation({
            query: ({id, list_id, body}) => ({
                url: `/boards/${id}/board_lists/${list_id}/list_tasks`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: (response, error, arg) => [
                {type: 'Task', id: arg.id}
            ]
        }),
        removeTask: builder.mutation({
            query: ({id, list_id, task_id}) => ({
                url: `/boards/${id}/board_lists/${list_id}/list_tasks/${task_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (response, error, arg) => [
                {type: 'Task', id: arg.id}
            ]
        }),
        moveTask: builder.mutation({
           query: ({id, list_id, task_id, body}) => ({
              url: `/boards/${id}/board_lists/${list_id}/list_tasks/${task_id}`,
              method: `PATCH`,
              body: body
           }),
           invalidatesTags: (response, error, arg) => [
              {type: 'Task', id: arg.id}
           ]
        })
    })
});

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useMoveTaskMutation,
    useRemoveTaskMutation
} = extendedApiSlice

const selectTasksData = createSelector(
    ([state, id]) => extendedApiSlice.endpoints.getTasks.select(id)(state),
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
} = taskAdapter.getSelectors(state => selectTasksData(state) ?? initialState)