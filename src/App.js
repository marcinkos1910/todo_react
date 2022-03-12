import { useState } from "react";
import "./App.css";


function* uuidGen(){
  let id = 0;

  while (true) {
    yield id;
    id++;
  }
}

const uuid = uuidGen()

function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter'){
      setTasks([...tasks, {
        name: value,
        id: uuid.next().value,
        status: false
      }]);
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
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <input type="text"
             value={value} 
             onChange={handleChange}
             onKeyUp={handleKeyUp}
      />
      <ul>
        {tasks.map(({id, name, status}) => (
          <li key={id} className='todo-item'>
            <span className={status ? 'status done' : 'status active'}
                  onClick={() => handleChangeStatus(id)}
            />
            {name}
            <button onClick={() => handeDeleteTask(id)}>x</button>
          </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
