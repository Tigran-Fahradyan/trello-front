import {Box, Grid, Input} from "@mui/material";
import {useParams} from "react-router-dom";
import BoardList from "./BoardList";
import {DragDropContext} from "react-beautiful-dnd";
import {useGetBoardListsQuery} from "../../api/apiSlice";
import AssignedUsers from "./AssignedUsers";

const SingleBoard = () => {
    const id = useParams().id;

    const {
        data: lists,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBoardListsQuery({id: id});

    // const assignedUserIds = []
    // const assignedUserIds = board.users;
    // const users = useSelector((state) => state.usersReducer.users);
    // const assignedUsers = users.filter((item) => assignedUserIds.includes(item.id));
    // const notAssignedUsers = users.filter((item) => !assignedUserIds.includes(item.id));

    // const [listNewName, setListNewName] = useState('');
    const handleAddInputChange = (name) => {
        // setListNewName(name)
    };

    const onDragEndHandler = (result) => {
        const {source, destination} = result;
        if (!destination){
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }
        // dispatch(moveTask({board_id: board.id, movement: {source: source, destination: destination}}))
    }

    // const [userIdAssignBoard, setUserIdAssignBoard] = useState(0);
    // const handleUserChange = (value) => {
    //     if (value > 0) {
    //         setUserIdAssignBoard(parseInt(value))
    //     }else{
    //         setUserIdAssignBoard(0)
    //     }
    // }

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {

    } else if (isError) {
        content = <p>{error}</p>;
    }

    if (isSuccess) {
        return (
            <div>
                <DragDropContext onDragEnd={onDragEndHandler}>
                    <Box>
                        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={25}>
                            {
                                lists.map((list) => (
                                    <BoardList key={list.id} list={list}></BoardList>
                                ))
                            }
                        </Grid>
                        <Box mt={3} p={3}>
                            <Input placeholder="List Name" onChange={(e) => handleAddInputChange(e.target.value)}></Input>
                            {/*<Button onClick={() => dispatch(createList({board_id: boardData.id, name: listNewName}))}>Add List</Button>*/}
                        </Box>
                    </Box>
                </DragDropContext>
                <Box mt={3} p={3}>
                    {
                        // (notAssignedUsers).length > 0 ?
                        //     <><Select sx={{ minWidth: 120 }} defaultValue="0" onChange={(e) => handleUserChange(e.target.value)}>
                        //         <MenuItem key="select the value" value="0">
                        //             Select User
                        //         </MenuItem>
                        //         {
                        //             notAssignedUsers.map((item) => (
                        //                 <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        //             ))
                        //         }
                        //     </Select>
                        //     <Button onClick={() => dispatch(assignToBoard({id: boardData.id, user_id: userIdAssignBoard}))}>Add User</Button></>
                        //     : null

                    }
                </Box>
                {/*<AssignedUsers></AssignedUsers>*/}
            </div>
        )
    }else{
        return content;
    }
}

export default SingleBoard;