import {IconButton, Input} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useRef} from "react";
import {create, selectAllUsers, getUsersStatus, getUsersError, fetchUsers} from "./usersSlice";
import UsersExcerpt from "./UsersExcerpt";

const Users = () => {
    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);
    const usersStatus = useSelector(getUsersStatus);
    const error = useSelector(getUsersError);

    const ref = useRef();

    const handleCreateClick = () => {
        if (ref.current.value.length > 0){
            dispatch(create({name: ref.current.value}));
            ref.current.value = '';
        }
    }

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [usersStatus, dispatch]);

    let content;
    if (usersStatus === 'loading') {
        console.log(1)
        content = <tr><td>"Loading..."</td></tr>;
    } else if (usersStatus === 'succeeded') {
        console.log(2)
        content = users.map((user) => <UsersExcerpt key={user.id+"_UsersExcerpt"} user={user}></UsersExcerpt>);
    } else if (usersStatus === 'failed') {
        console.log(3)
        content = <tr><td>{error}</td></tr>;
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
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

export default Users;