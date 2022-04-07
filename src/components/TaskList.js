import TaskItem from "./TaskItem";

const TaskList = ({ tasks, selection }) => {
  return (
    <ul>
      {tasks
        .filter((e) => selection === "all" || e.status === selection)
        .map(({ id, name, status }) => (
          <TaskItem key={id} id={id} status={status} name={name} />
        ))}
    </ul>
  );
};

export default TaskList;