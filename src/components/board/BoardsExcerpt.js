import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useDeleteBoardMutation} from "../../api/apiSlice";

const BoardsExcerpt = ({board}) => {
    const [deleteBoard] = useDeleteBoardMutation();

    const handleDeleteClick = (id) => {
        deleteBoard({id: id});
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