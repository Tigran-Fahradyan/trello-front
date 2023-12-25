import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {nanoid} from "@reduxjs/toolkit";

const API_URL = 'https://trello-back-064098635aa0.herokuapp.com/users'
const initialState = {
    users: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get(API_URL);
        console.log(response);
        return [...response.data];
    } catch (err) {
        return err.message;
    }
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        create: (state, data) => {
            if (data.payload.name.length > 0){
                state.users.push({id: nanoid(), name: data.payload.name});
            }else{
                return state
            }
        },
        remove: (state, data) => {
            const user = state.users.find((item) => item.id === data.payload.id);
            const indexEl = state.users.indexOf(user);
            state.users.splice(indexEl, 1);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const loadUsers = action.payload;
                state.users = state.users.concat(loadUsers);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const selectAllUsers = (state) => state.usersReducer.users
export const getUsersStatus = (state) => state.usersReducer.status
export const getUsersError = (state) => state.usersReducer.error

export const {create, remove} = usersSlice.actions;
export default usersSlice.reducer;