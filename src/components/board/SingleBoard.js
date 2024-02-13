import {Box, Button, Grid, Input} from "@mui/material";
import {useParams} from "react-router-dom";
import Lists from "../list/Lists";
import {DragDropContext} from "react-beautiful-dnd";
import {useMoveTaskMutation} from "../task/taskSlice";
import {useGetListsQuery, useAddListMutation} from "../list/listsSlice";
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
    } = useGetListsQuery({id: id});
    const [addBoardList] = useAddListMutation();
    const [moveListTask] = useMoveTaskMutation();

    const [listNewName, setListNewName] = useState('');
    const handleAddInputChange = (name) => {
        setListNewName(name)
    };

    const onDragEndHandler = (result) => {
        const {source, destination, draggableId} = result;
        if (!destination){
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }

        let split_data = draggableId.split("_");
        let taskId = split_data[split_data.length - 1];
        if (!taskId) {
            return;
        }

        moveListTask({id: id, list_id: source.droppableId, task_id: taskId, body: {list_task: {board_list_id: destination.droppableId}}});
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
                                lists.ids.map((list_id) => (
                                    <Lists key={list_id} list={lists.entities[list_id]}></Lists>
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