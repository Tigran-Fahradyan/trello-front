import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {remove} from "./boardsSlice";

const BoardsExcerpt = ({board}) => {
    const dispatch = useDispatch();

    const handleDeleteClick = (id) => {
        dispatch(remove({id: id}));
    }

    return (
        <tr key={board.id}>
            <td>
                {board.id}
            </td>
            <td>
                <Link to={"/boards/"+ board.id}>{board.name}</Link>
            </td>
            <td>
                <Button onClick={() => handleDeleteClick(board.id)}>Delete</Button>
            </td>
        </tr>
    );
};

export default BoardsExcerpt;