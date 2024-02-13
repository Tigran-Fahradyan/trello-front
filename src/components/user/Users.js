import {IconButton, Input} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useRef} from "react";
import UsersExcerpt from "./UsersExcerpt";
import {useAddUserMutation, useGetUsersQuery} from "./usersSlice";
import { useForm } from "react-hook-form"

const Users = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        addUser({full_name: data.full_name})
        ref.current.value = '';
    }

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();
    const [addUser] = useAddUserMutation();

    const ref = useRef();

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = users.map((user) => <UsersExcerpt key={user.id+"_UsersExcerpt"} user={user}></UsersExcerpt>);
    } else if (isError) {
        content = <p>{error}</p>;
    }

    if (isSuccess) {
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input inputRef={ref} {...register("full_name", {required: true})}></Input>
                        {errors.full_name && <span>This field is required</span>}
                        <IconButton type={"submit"}>
                            <AddBox/>Add
                        </IconButton>
                    </form>
                </div>
            </div>
        )
    }else{
        return content;
    }
}

export default Users;