import React, { useState, useEffect } from "react";
import "./App.css"

const App = () => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [taskText, setTaskText] = useState(""); 
  const [editId, setEditId] = useState(null); 

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!taskText.trim()) return; 

    if (editId) {
      setTasks(tasks.map(task => task.id === editId ? { ...task, text: taskText } : task));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
    }

    setTaskText(""); 
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleEdit = (task) => {
    setTaskText(task.text);
    setEditId(task.id);
  };

  return (
    <div className="container">
      <h2>Task Manager</h2>
      <input 
        type="text" 
        value={taskText} 
        onChange={(e) => setTaskText(e.target.value)} 
        placeholder="Enter task"
      />
      <button onClick={handleAddTask}>{editId ? "Update" : "Add"} Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleToggleComplete(task.id)} 
            />
            <span>{task.text}</span>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
