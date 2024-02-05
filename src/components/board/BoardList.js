import {Button, Grid, Input} from "@mui/material";
import {useRef, useState} from "react";
import {Droppable} from "react-beautiful-dnd";
import BoardTasks from "./BoardTasks";
import {useDeleteBoardListMutation, useAddListTaskMutation, useUpdateBoardListMutation} from "../../api/apiSlice";

const BoardList = ({list}) => {
    const ref = useRef();
    const descRef = useRef();

    const handleAddTaskClick = (data) => {
        if (ref.current.value.length > 0 && descRef.current.value.length > 0) {
            addListTask({id: list.board_id, list_id: list.id, body: {list_task: {name: ref.current.value, description: descRef.current.value}}});
            ref.current.value = '';
            descRef.current.value = '';
        }
    }
    const [deleteBoardList] = useDeleteBoardListMutation();
    const [addListTask] = useAddListTaskMutation();
    const [updateBoardList] = useUpdateBoardListMutation();

    const handleRemoveListClick = (list) => {
        deleteBoardList({list: list});
    }

    const [showRenamePopup, setShowRenamePopup] = useState(false);
    const toggleRenameInput = (e, action = "hide") => {
        if (action === "show") {
            setShowRenamePopup(true)
        }else{
            setShowRenamePopup(false)
            updateBoardList({list: list, body: {board_list: {name: e.target.value}}})
        }
    }
    
    return (
        <Grid key={"grid_"+list.id} item>
            {
                showRenamePopup
                    ? <><Input key={"input_"+list.id} defaultValue={list.name} onBlur={(e) => toggleRenameInput(e)}></Input></>
                    : <Grid key={"name_"+list.id} container onClick={(e) => toggleRenameInput(e, "show")}>{list.name}</Grid>
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
            <Button onClick={handleAddTaskClick}>Add Card</Button>
        </Grid>
    )
}

export default BoardList;