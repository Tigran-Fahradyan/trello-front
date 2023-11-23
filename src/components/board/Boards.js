import {useDispatch, useSelector} from "react-redux";
import {Button, IconButton, Input} from "@mui/material";
import {Link} from 'react-router-dom'
import {create, remove} from "../../reducers/boardsReducer";
import {AddBox} from "@mui/icons-material";
import {useRef} from "react";


const Boards = () => {
    const boards = useSelector((state) => state.boardsReducer.boards);
    const dispatch = useDispatch();


    const handleDeleteClick = (id) => {
        dispatch(remove({id: id}));
    }

    const ref = useRef()
    const handleCreateClick = () => {
        if (ref.current.value.length > 0) {
            dispatch(create({name: ref.current.value}));
            ref.current.value = '';
        }
    }

    return (
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
                        boards.map((board) => (
                            <tr key={board.id}>
                                <td>
                                    <Link to={"/boards/"+ board.id}>{board.name}</Link>
                                </td>
                                <td>
                                    <Button onClick={() => handleDeleteClick(board.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
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