import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [auth, setAuth] = useState({ username: '', password: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: token }
  });

  const login = async () => {
    const res = await axios.post('http://localhost:5000/api/login', auth);
    setToken(res.data.token);
  };

  const register = async () => {
    await axios.post('http://localhost:5000/api/register', auth);
    alert('User registered!');
  };

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    await api.post('/tasks', newTask);
    fetchTasks();
  };

  const toggleComplete = async (id, completed) => {
    await api.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  if (!token) return (
    <div style={{ padding: 20 }}>
      <h2>Login/Register</h2>
      <input placeholder="Username" onChange={e => setAuth({ ...auth, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setAuth({ ...auth, password: e.target.value })} />
      <button onClick={login}>Login</button>
      <button onClick={register}>Register</button>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>
      <input placeholder="Title" onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
      <input placeholder="Description" onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
      <input type="date" onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
              {t.title} - {t.dueDate}
            </span>
            <button onClick={() => toggleComplete(t._id, t.completed)}>✓</button>
            <button onClick={() => deleteTask(t._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
