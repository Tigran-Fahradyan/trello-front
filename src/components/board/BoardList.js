import {Button, Grid, Input} from "@mui/material";
import {addTask, removeList, renameList, toggleRenameList} from "./boardsSlice";
import {useDispatch} from "react-redux";
import {useRef} from "react";
import {Droppable} from "react-beautiful-dnd";
import BoardTasks from "./BoardTasks";
import {useDeleteBoardListMutation} from "../../api/apiSlice";

const BoardList = ({list}) => {
    const dispatch = useDispatch();

    const ref = useRef();
    const descRef = useRef();
    const handleAddTaskClick = (data) => {
        // if (ref.current.value.length > 0 && descRef.current.value.length > 0) {
        //     dispatch(addTask({board_id: list.board_id, list_id: data.id, name: ref.current.value, description: descRef.current.value}));
        //     ref.current.value = '';
        //     descRef.current.value = '';
        // }
    }

    const [deleteBoardList] = useDeleteBoardListMutation();

    const handleRemoveListClick = (list) => {
        deleteBoardList({list: list});
    }
    
    return (
        <Grid key={"grid_"+list.id} item>
            {
                list.showRenamePopup
                    ? <><Input key={"input_"+list.id} defaultValue={list.name} onBlur={(e) => dispatch(renameList({board_id: list.board_id, list_id: list.id, name: e.target.value}))}></Input></>
                    : <Grid key={"name_"+list.id} container onClick={() => dispatch(toggleRenameList({board_id: list.board_id, list_id: list.id}))}>{list.name}</Grid>
            }
            <Button onClick={() => handleRemoveListClick(list)}>Remove</Button>

            <Droppable droppableId={list.id.toString()}>
                {
                    (provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <Grid key={list.id} container direction="column" justifyContent="flex-start" alignItems="center">
                                <BoardTasks list={list}></BoardTasks>
                            </Grid>
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>

            <div>
                <Input inputRef={ref} defaultValue="" placeholder="Card Name"></Input>
            </div>
            <div>
                <Input inputRef={descRef} defaultValue="" placeholder="Card Descroption"></Input>
            </div>
            {/*<Button onClick={() => handleAddTaskClick({id: list.id})}>Add Card</Button>*/}
        </Grid>
    )
}

export default BoardList;