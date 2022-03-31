import { useEffect, useState } from "react";
import "./App.css";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localstorage";
import { uuidGen } from "./utils/uuid";
import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { firestore } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";


function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selection, setSelection] = useState('all');

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    console.log(que);
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setTasks(loadFromLocalStorage('tds'))
  }, []);

  useEffect(() => {
    saveToLocalStorage('tds', tasks);
  }, [tasks])

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter'){
      const newTask = [...tasks, {
        name: value,
        id: uuidGen(),
        status: false
      }];
      setTasks(newTask);
      setValue('');     
    }
  }

  function handleChangeStatus(id) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.status = !task.status
      }
      return task
    })

    setTasks(newTasks);
  }

  function handeDeleteTask(id) {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
    saveToLocalStorage('tds', newTasks)
  }

  function handeDeleteDone() {
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
