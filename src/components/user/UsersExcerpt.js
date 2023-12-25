import {useDispatch} from "react-redux";
import {remove} from "./usersSlice";
import {Button} from "@mui/material";

const UsersExcerpt = ({ user }) => {
    const dispatch = useDispatch();

    const handleDeleteClick = (id) => {
        dispatch(remove({id: id}));
    }

    return (
        <tr>
            <td>
                {user.id}
            </td>
            <td>
                {user.full_name}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                <Button onClick={() => handleDeleteClick(user.id)}>Delete</Button>
            </td>
        </tr>
    );
};

export default UsersExcerpt;