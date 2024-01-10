import {useGetListTasksQuery} from "../../api/apiSlice";
import SingleTask from "./SingleTask";

const BoardTasks = ({list}) => {
    const {
        data: tasks,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetListTasksQuery({id: list.board_id, list_id: list.id})

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
                tasks.map((task, index) => (
                    <SingleTask index={index} key={list.board_id + "_list_" + list.id + 'task_' + task.id} task={task} list_id={list.id} board_id={list.board_id}></SingleTask>
                ))
                : content
            }
        </>
    )
}

export default BoardTasks;