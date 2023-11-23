import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    boards: [
        {
            id: 1,
            name: "First Board",
            lists: [
                {
                    id: 1,
                    name: "Backlog",
                    showRenamePopup: false,
                    tasks: []
                },
                {
                    id: 2,
                    name: "In Progress",
                    showRenamePopup: false,
                    tasks: []
                },
                {
                    id: 3,
                    name: "Done",
                    showRenamePopup: false,
                    tasks: []
                },
            ],
            users: []
        }
    ]
}

export const boardsReducer = createSlice({
    name: "boards",
    initialState,
    reducers: {
        create: (state, data) => {
            if (data.payload.name.length > 0){
                const boardId = state.boards[state.boards.length - 1].id + 1;
                const boardData = {id: boardId, name: data.payload.name, lists: [
                        {
                            id: 1,
                            name: "Backlog",
                            showRenamePopup: false,
                            tasks: []
                        },
                        {
                            id: 2,
                            name: "In Progress",
                            showRenamePopup: false,
                            tasks: []
                        },
                        {
                            id: 3,
                            name: "Done",
                            showRenamePopup: false,
                            tasks: []
                        },
                    ]}
                state.boards.push(boardData);
            }else{
                return state
            }
        },
        remove: (state, data) => {
            const board = state.boards.find((item) => item.id === data.payload.id);
            const indexEl = state.boards.indexOf(board);
            state.boards.splice(indexEl, 1);
        },
        createList: (state, data) => {

            if (data.payload.name.length > 0){
                const board = state.boards.find((b) => b.id === data.payload.board_id);
                const newElementId = board.lists[board.lists.length - 1].id + 1;
                board.lists.push({id: newElementId, name: data.payload.name, showRenamePopup: false, tasks: []});
            }else{
                return state
            }
        },
        removeList: (state, data) => {
            const board = state.boards.find((b) => b.id === data.payload.board_id);
            board.lists = board.lists.filter((list) => list.id !== data.payload.list_id)
        },
        renameList: (state, data) => {
            const board = state.boards.find((b) => b.id === data.payload.board_id);
            const list = board.lists.find((list) => list.id === data.payload.list_id);
            list.name = data.payload.name
            list.showRenamePopup = !list.showRenamePopup
        },
        toggleRenameList: (state, data) => {
            const board = state.boards.find((b) => b.id === data.payload.board_id);
            const list = board.lists.find((list) => list.id === data.payload.list_id);
            list.showRenamePopup = !list.showRenamePopup
        },
        addTask: (state, data) => {
            if (data.payload.name.length > 0){
                const board = state.boards.find((b) => b.id === data.payload.board_id);
                const list = board.lists.find((list) => list.id === data.payload.list_id);
                const tasks = list.tasks
                let newElementId = Date.now()
                tasks.push({id: newElementId, name: data.payload.name, description: data.payload.description})
            }
        },
        removeTask: (state, data) => {
            const board = state.boards.find((b) => b.id === data.payload.board_id);
            const list = board.lists.find((list) => list.id === data.payload.list_id);
            list.tasks = list.tasks.filter((task) => task.id !== data.payload.task_id)
        },
        moveTask: (state, data) => {
            // const board_id = data.payload.board_id;
            const board = state.boards.find((item) => item.id === data.payload.board_id);
            const {source, destination} = data.payload.movement;
            const sourceList = board.lists.find((item) => item.id.toString() === source.droppableId)
            const destinationList = board.lists.find((item) => item.id.toString() === destination.droppableId)
            const task = sourceList.tasks[source.index]
            sourceList.tasks.splice(source.index, 1)
            destinationList.tasks.splice(destination.index, 0, task)
        },
        assignToBoard: (state, data) => {
            const board = state.boards.find((item) => item.id === data.payload.id);
            board.users.push(parseInt(data.payload.user_id))
        },
        removeFromBoard: (state, data) => {
            const board = state.boards.find((item) => item.id === data.payload.id);
            board.users = board.users.filter((item) => item !== parseInt(data.payload.user_id))
        }
    }
})

export const {
    create,
    remove,
    createList,
    removeList,
    toggleRenameList,
    addTask,
    renameList,
    removeTask,
    moveTask,
    assignToBoard,
    removeFromBoard
} = boardsReducer.actions;

export default boardsReducer.reducer;