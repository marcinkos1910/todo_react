import { useEffect, useState } from "react";
import "./App.css";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localstorage";
import { uuidGen } from "./utils/uuid";
import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";


function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="App">
      <Headline/>
      <TaskInput 
        value={value} 
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
      />
      <TaskList 
        tasks={tasks} 
        handleChangeStatus={handleChangeStatus} 
        handeDeleteTask={handeDeleteTask}
      />
    </div>
  );
}

export default App;
