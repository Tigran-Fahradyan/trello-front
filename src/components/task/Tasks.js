import {useGetTasksQuery} from "./taskSlice";
import SingleTask from "./SingleTask";

const Tasks = ({list}) => {
    const {
        data: tasks,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTasksQuery({id: list.board_id, list_id: list.id})

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
                tasks.ids.map((task_id, index) => (
                    <SingleTask index={index} key={list.board_id + "_list_" + list.id + 'task_' + task_id} task={tasks.entities[task_id]} list_id={list.id} board_id={list.board_id}></SingleTask>
                ))
                : content
            }
        </>
    )
}

export default Tasks;