import {useAssignBoardUserMutation} from "./boardsSlice";
import {selectAllUsers, useGetUsersQuery} from "../user/usersSlice";
import {Button, MenuItem, Select} from "@mui/material";
import {useSelector} from "react-redux";

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

    let content, assignedUserIds, notAssignedUsersList;

    const allUsers = useSelector((state) => selectAllUsers([state]))
    assignedUserIds = assigned_users.ids;
    notAssignedUsersList = allUsers.filter((item) => !assignedUserIds.includes(item.id));


    // const {
    //     data: allUsers,
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // } = useGetUsersQuery();

    // if (isLoading) {
    //     content = <p>"Loading..."</p>;
    // } else if (isSuccess) {
    //     const assignedUserIds = assigned_users.ids;
    //     notAssignedUserIds = allUsers.ids.filter((id) => !assignedUserIds.includes(id));
    //     notAssignedUserIds.map((id) => notAssignedUsers.push(allUsers.entities[id]))
    // } else if (isError) {
    //     content = <p>{error}</p>;
    // }

    return (
        <>
            {
                allUsers ?
                (
                    <><Select sx={{ minWidth: 120 }} defaultValue="0" onChange={(e) => handleUserChange(e.target.value)}>
                        <MenuItem key="select the value" value="0">
                            Select User
                        </MenuItem>
                        {
                            notAssignedUsersList.map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.full_name}</MenuItem>
                            ))
                        }
                    </Select>
                        <Button onClick={handleAssignToBoard}>Add User</Button></>
                ) : <p>"Loading..."</p>

            }
        </>
    )
}

export default NotAssignedUsers;