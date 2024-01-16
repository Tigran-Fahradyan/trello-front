import {useAssignBoardUserMutation, useGetUsersQuery} from "../../api/apiSlice";
import {Button, MenuItem, Select} from "@mui/material";

const NotAssignedUsers = ({board_id, assigned_users}) => {

    const [assignUser] = useAssignBoardUserMutation();
    let selectedUserId = 0

    const handleAssignToBoard = () => {
        assignUser({id: board_id, body: {board_user: {user_id: selectedUserId}}});
    }

    const handleUserChange = (value) => {
        if (value > 0) {
            selectedUserId = parseInt(value)
        }else{
            selectedUserId = 0
        }
    }

    let notAssignedUsers, content;
    const {
        data: allUsers,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();

    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const assignedUserIds = assigned_users.map((user) => user.id);
        notAssignedUsers = allUsers.filter((item) => !assignedUserIds.includes(item.id));
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <>
            {
                isSuccess ?
                (
                    <><Select sx={{ minWidth: 120 }} defaultValue="0" onChange={(e) => handleUserChange(e.target.value)}>
                        <MenuItem key="select the value" value="0">
                            Select User
                        </MenuItem>
                        {
                            notAssignedUsers.map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.full_name}</MenuItem>
                            ))
                        }
                    </Select>
                        <Button onClick={handleAssignToBoard}>Add User</Button></>
                ) : content

            }
        </>
    )
}

export default NotAssignedUsers;