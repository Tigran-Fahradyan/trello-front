import {Box, Button, Grid, Input, MenuItem, Select} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {createList, moveTask, assignToBoard, removeFromBoard, selectBoardById} from "./boardsSlice"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import BoardList from "./BoardList";
import {DragDropContext} from "react-beautiful-dnd";

const SingleBoard = () => {
    const id = useParams().id;
    const boardData = useSelector((state) => selectBoardById(state, Number(id)));
    // const boardData = useSelector((state) => state.boardsReducer.boards.find((b) => b.id === parseInt(id)));
    console.log(boardData)
    const assignedUserIds = boardData.users
    const users = useSelector((state) => state.usersReducer.users)
    const assignedUsers = users.filter((item) => assignedUserIds.includes(item.id));
    const notAssignedUsers = users.filter((item) => !assignedUserIds.includes(item.id));

    const dispatch = useDispatch();

    const [listNewName, setListNewName] = useState('');
    const handleAddInputChange = (name) => {
        setListNewName(name)
    };

    const onDragEndHandler = (result) => {
        const {source, destination} = result;
        if (!destination){
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }
        dispatch(moveTask({board_id: boardData.id, movement: {source: source, destination: destination}}))
    }

    const [userIdAssignBoard, setUserIdAssignBoard] = useState(0);
    const handleUserChange = (value) => {
        if (value > 0) {
            setUserIdAssignBoard(parseInt(value))
        }else{
            setUserIdAssignBoard(0)
        }
    }

    useEffect(() => {

    }, [boardData])

    if (boardData) {
        return (
            <div>
                <DragDropContext onDragEnd={onDragEndHandler}>
                    <Box>
                        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={25}>
                            {
                                boardData.lists.map((list) => (
                                    <BoardList key={list.id} board_id={boardData.id} list={list}></BoardList>
                                ))
                            }
                        </Grid>
                        <Box mt={3} p={3}>
                            <Input placeholder="List Name" onChange={(e) => handleAddInputChange(e.target.value)}></Input>
                            <Button onClick={() => dispatch(createList({board_id: boardData.id, name: listNewName}))}>Add List</Button>
                        </Box>
                    </Box>
                </DragDropContext>
                <Box mt={3} p={3}>
                    {
                        (notAssignedUsers).length > 0 ?
                            <><Select sx={{ minWidth: 120 }} defaultValue="0" onChange={(e) => handleUserChange(e.target.value)}>
                                <MenuItem key="select the value" value="0">
                                    Select User
                                </MenuItem>
                                {
                                    notAssignedUsers.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    ))
                                }
                            </Select>
                            <Button onClick={() => dispatch(assignToBoard({id: boardData.id, user_id: userIdAssignBoard}))}>Add User</Button></>
                            : null

                    }
                </Box>
                {
                    assignedUsers.length > 0 ?
                        (
                            <div className="table-container">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>

                                    </thead>
                                    <tbody>
                                    {
                                        assignedUsers.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    {user.name}
                                                </td>
                                                <td>
                                                    <Button onClick={() => dispatch(removeFromBoard({id: boardData.id, user_id: user.id}))}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )
                        : null
                }
            </div>
        )
    }else{
        return null;
    }
}

export default SingleBoard;