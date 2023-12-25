import {configureStore} from "@reduxjs/toolkit";
import boardsReducer from "../components/board/boardsSlice";
import usersReducer from "../components/user/usersSlice";

export const store = configureStore({
    reducer: {
        boardsReducer: boardsReducer,
        usersReducer: usersReducer,
    }
})
