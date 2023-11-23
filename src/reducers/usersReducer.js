import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [
        {
            id: 1,
            name: "First User",
            board_ids: []
        }
    ]
}

export const usersReducer = createSlice({
    name: "users",
    initialState,
    reducers: {
        create: (state, data) => {
            if (data.payload.name.length > 0){
                let userId = 1;
                if (state.users.length > 0){
                    userId = state.users[state.users.length - 1].id + 1;
                }
                state.users.push({id: userId, name: data.payload.name});
            }else{
                return state
            }
        },
        remove: (state, data) => {
            const user = state.users.find((item) => item.id === data.payload.id);
            const indexEl = state.users.indexOf(user);
            state.users.splice(indexEl, 1);
        }
    }
})

export const {create, remove} = usersReducer.actions;

export default usersReducer.reducer;