import TaskItem from "./TaskItem";

function TaskList({tasks, handleChangeStatus, handeDeleteTask}) {
    return(
        <ul>
        {tasks.map(({id, name, status}) => <TaskItem
            key={id}
            id={id}
            status={status}
            name={name}
            handeDeleteTask={handeDeleteTask}
            handleChangeStatus={handleChangeStatus}
        />)}
      </ul>
    );
}

export default TaskList;