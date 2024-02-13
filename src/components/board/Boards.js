import {useGetBoardsQuery, useAddBoardMutation} from "./boardsSlice";
import {IconButton, Input} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useRef} from "react";
import BoardsExcerpt from "./BoardsExcerpt";

const Boards = () => {
    const ref = useRef();

    const {
        data: boards,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBoardsQuery();
    const [addBoard] = useAddBoardMutation();

    const handleCreateClick = () => {
        if (ref.current.value.length > 0) {
            let name = ref.current.value
            addBoard({name: name});
        }
    }

    let content;
    if (isLoading) {
        content = <tr><td>"Loading..."</td></tr>;
    } else if (isSuccess) {
        content = boards.ids.map((board_id) => <BoardsExcerpt key={boards.entities[board_id].id+"_BoardsExcerpt"} board={boards.entities[board_id]}></BoardsExcerpt>);
    } else if (isError) {
        content = <tr><td>{error}</td></tr>;
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        content
                    }
                </tbody>
            </table>
            <div className="center">
                <Input inputRef={ref}></Input>
                <IconButton onClick={handleCreateClick}>
                    <AddBox/>Add
                </IconButton>
            </div>
        </div>
    )
}

export default Boards;