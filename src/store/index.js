import {configureStore} from "@reduxjs/toolkit";
import boardsReducer from "../reducers/boardsReducer";
import usersReducer from "../reducers/usersReducer";

export const store = configureStore({
    reducer: {
        boardsReducer: boardsReducer,
        usersReducer: usersReducer,
    }
})
