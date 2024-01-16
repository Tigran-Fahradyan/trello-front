import {useGetBoardAssignedUsersQuery, useRemoveBoardUserMutation} from "../../api/apiSlice";
import {Box, Button} from "@mui/material";
import NotAssignedUsers from "./NotAssignedUsers";

const AssignedUsers = ({board_id}) => {
    const [removeBoardUser] = useRemoveBoardUserMutation();

    const removeFromBoard = (user_id) => {
        removeBoardUser({id: board_id, body: {board_user: {user_id: user_id}}});
    }

    const {
        data: assignedUsers,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBoardAssignedUsersQuery({id: board_id});

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = assignedUsers.map((user) => (
            <tr key={user.id}>
                <td>
                    {user.full_name}
                </td>
                <td>
                    <Button onClick={() => removeFromBoard(user.id)}>Delete</Button>
                </td>
            </tr>
        ))
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <>
            {
                isSuccess ?
                    (
                        <div className="table-container">
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>

                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                            </table>
                            <Box mt={3} p={3}>
                                <NotAssignedUsers board_id={board_id} assigned_users={assignedUsers}></NotAssignedUsers>
                            </Box>
                        </div>
                    )
                    : content
            }
        </>
    )
}

export default AssignedUsers;