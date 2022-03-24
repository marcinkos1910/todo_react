function TaskInput({value, handleChange, handleKeyUp}){
    return(
        <input type="text"
             value={value} 
             onChange={handleChange}
             onKeyUp={handleKeyUp}
      />
    );
}

export default TaskInput;