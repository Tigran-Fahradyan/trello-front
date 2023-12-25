import {useDispatch, useSelector} from "react-redux";
import {IconButton, Input} from "@mui/material";
import {create, fetchBoards, getBoardsError, getBoardsStatus, selectAllBoards} from "./boardsSlice";
import {AddBox} from "@mui/icons-material";
import {useRef, useEffect} from "react";
import BoardsExcerpt from "./BoardsExcerpt";

const Boards = () => {
    const dispatch = useDispatch();

    const boards = useSelector(selectAllBoards);
    const boardsStatus = useSelector(getBoardsStatus);
    const error = useSelector(getBoardsError);

    const ref = useRef();

    const handleCreateClick = () => {
        if (ref.current.value.length > 0) {
            dispatch(create({name: ref.current.value}));
            ref.current.value = '';
        }
    }

    useEffect(() => {
        if (boardsStatus === 'idle') {
            dispatch(fetchBoards())
        }
    }, [boardsStatus, dispatch]);

    let content;
    if (boardsStatus === 'loading') {
        content = <tr><td>"Loading..."</td></tr>;
    } else if (boardsStatus === 'succeeded') {
        content = boards.map((board) => <BoardsExcerpt key={board.id+"_BoardsExcerpt"} board={board}></BoardsExcerpt>);
    } else if (boardsStatus === 'failed') {
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
                    {content}
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