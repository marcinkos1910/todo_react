import TaskItem from "./TaskItem";

function TaskList({tasks, handleChangeStatus, handeDeleteTask, selection}) {
    return(
        <ul>
        {tasks
            .filter((e) => selection === 'all' || e.status === selection)
            .map(({id, name, status}) => <TaskItem
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