import { useEffect, useState } from "react";
import "./App.scss";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localstorage";
import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc, writeBatch, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";


function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selection, setSelection] = useState('all');



  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
        setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })))
    });

    return () => {
        unsubscribe();
    }
}, []);


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyUp = async (event) => {
    if (event.key === 'Enter'){

      const newTodo = {
        name: value,
        status: false
      }

      const docRef = await addDoc(collection(db, "todos"), newTodo)

      setTasks([Object.assign({id: docRef.id}, newTodo), ...tasks]);
      setValue('');     
    }
  }

  async function handleChangeStatus(id) {
    const newTasks = tasks.filter(task => task.id === id)[0];
    newTasks.status = !newTasks.status;

    await updateDoc(doc(db, "todos", id), {status: newTasks.status});

    setTasks([...tasks]);
  }

  async function handeDeleteTask(id) {
    await deleteDoc(doc(db, "todos", id));
    setTasks(tasks.filter(task => task.id !== id))
  }

  async function handeDeleteDone() {
    const batch = writeBatch(db);
    tasks.forEach(task => {
      if (task.status){
        const ref = doc(db, "todos", task.id);
        batch.delete(ref);
      }
    })
    await batch.commit();

    setTasks(tasks.filter(task => !task.status))
  }

  return (
    <div className="App">
      <Headline/>
      <TaskInput 
        value={value} 
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
      />
      {tasks.length === 0 ? ('') : (

      <>
        <TaskList 
        tasks={tasks} 
        handleChangeStatus={handleChangeStatus} 
        handeDeleteTask={handeDeleteTask}
        selection={selection}
      />
      <p>{tasks.filter((e) => !e.status).length} items left</p>
      <div>
        <button onClick={() => setSelection('all')}>All</button>
        <button onClick={() => setSelection(false)}>Active</button>
        <button onClick={() => setSelection(true)}>Complited</button>
      </div>
      {tasks.filter((e) => e.status).length > 0 ? (<button onClick={handeDeleteDone}>Clear completed</button>) : ('')}
      </>)

      }
    </div>
  
  );
}

export default App;
