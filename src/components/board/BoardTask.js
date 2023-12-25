import {Box, Button, Grid, Paper} from "@mui/material";
import {removeTask} from "./boardsSlice"
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {Draggable} from "react-beautiful-dnd";

const BoardTask = ({index, board_id, list_id, task}) => {
    const dispatch = useDispatch();

    useEffect(() => {

    }, [task])

    return (
        <Draggable draggableId={board_id+'_'+list_id+'_'+task.id} index={index}>
            {
                (provided) => (
                    <form {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Box m={2}>
                            <Grid item>
                                <legend>{task.name}</legend>
                                <Button onClick={() => dispatch(removeTask({board_id: board_id, list_id: list_id, task_id: task.id}))}>Remove Task</Button>
                                <Paper
                                    sx={{
                                        height: 140,
                                        width: 100,
                                        backgroundColor: '#fff',
                                    }}
                                >
                                    {task.description}
                                </Paper>
                            </Grid>
                        </Box>
                    </form>
                )
            }
        </Draggable>
    )
}

export default BoardTask;