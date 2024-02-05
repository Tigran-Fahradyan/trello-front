import {Box, Button, Grid, Paper} from "@mui/material";
import {Draggable} from "react-beautiful-dnd";
import {useRemoveListTaskMutation} from "../../api/apiSlice";

const SingleTask = ({index, board_id, list_id, task}) => {
    const [removeListTask] = useRemoveListTaskMutation();

    const handleRemoveTask = () => {
        removeListTask({id: board_id, list_id: list_id, task_id: task.id});
    }

    return (
        <Draggable draggableId={board_id+'_'+list_id+'_'+task.id} index={index}>
            {
                (provided) => (
                    <form {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Box m={2}>
                            <Grid item>
                                <legend>{task.name}</legend>
                                <Button onClick={handleRemoveTask}>Remove Task</Button>
                                <Paper
                                    sx={{
                                        height: 140,
                                        width: 100,
                                        backgroundColor: '#7f7f7f',
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

export default SingleTask;