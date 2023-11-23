import {Button, IconButton, Input} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useRef} from "react";
import {create, remove} from "../../reducers/usersReducer";


const Users = () => {
    const users = useSelector((state) => state.usersReducer.users);
    const dispatch = useDispatch();

    const ref = useRef();

    const handleCreateClick = () => {
        if (ref.current.value.length > 0){
            dispatch(create({name: ref.current.value}));
            ref.current.value = '';
        }
    }

    const handleDeleteClick = (id) => {
        dispatch(remove({id: id}));
    }

    useEffect(() => {

    }, [users])

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
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                <Button onClick={() => handleDeleteClick(user.id)}>Delete</Button>
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

export default Users;