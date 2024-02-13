import {Button} from "@mui/material";
import {useRemoveUserMutation} from "./usersSlice";

const UsersExcerpt = ({ user }) => {
    const [removeUser] = useRemoveUserMutation();
    const handleDeleteClick = (id) => {
        removeUser({id: id});

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