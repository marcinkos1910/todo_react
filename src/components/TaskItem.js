function TaskItem({id, status, name, handleChangeStatus, handeDeleteTask}) {
    return (
        <li className='todo-item'>
            <span className={status ? 'status done' : 'status active'}
                  onClick={() => handleChangeStatus(id)}
            />
            {name}
            <button onClick={() => handeDeleteTask(id)}>x</button>
          </li>
    )
}

export default TaskItem;