import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const TaskItem = ({ id, status, name, handleChangeStatus }) => {
  async function handleDeleteTask() {
    await deleteDoc(doc(db, "todos", id));
  }

  async function handleChangeStatus() {
    await updateDoc(doc(db, "todos", id), { status: !status });
  }

  return (
    <li className="todo-item">
      <span
        onClick={handleChangeStatus}
        className={status ? "status done" : "status active"}
      />
      {name}
      <button onClick={() => handleDeleteTask(id)}>x</button>
    </li>
  );
};

export default TaskItem;