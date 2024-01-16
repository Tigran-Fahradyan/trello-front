import {Box, Button, Grid, Input} from "@mui/material";
import {useParams} from "react-router-dom";
import BoardList from "./BoardList";
import {DragDropContext} from "react-beautiful-dnd";
import {useAddBoardListMutation, useGetBoardListsQuery} from "../../api/apiSlice";
import AssignedUsers from "./AssignedUsers";
import {useState} from "react";

const SingleBoard = () => {
    const id = useParams().id;

    const {
        data: lists,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBoardListsQuery({id: id});
    const [addBoardList] = useAddBoardListMutation();

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
        // dispatch(moveTask({board_id: board.id, movement: {source: source, destination: destination}}))
    }


    const addListHandle = () => {
        addBoardList({id: id, name: listNewName});
    }

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
                            <Button onClick={() => addListHandle()}>Add List</Button>
                        </Box>
                    </Box>
                </DragDropContext>
                <Box mt={3} p={3}>

                </Box>
                <AssignedUsers board_id={id}>
                </AssignedUsers>
            </div>
        )
    }else{
        return content;
    }
}

export default SingleBoard;