import {useGetBoardAssignedUsersQuery} from "../../api/apiSlice";
import {Button} from "@mui/material";

const AssignedUsers = () => {
    const {
        data: assignedUsers,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBoardAssignedUsersQuery();

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {

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
                                {
                                    assignedUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                {user.name}
                                            </td>
                                            <td>
                                                {/*<Button onClick={() => dispatch(removeFromBoard({id: id, user_id: user.id}))}>Delete</Button>*/}
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    )
                    : content
            }
        </>
    )
}

export default AssignedUsers;