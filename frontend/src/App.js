import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTaskTitle,
          description: newTaskDescription
        })
      });

      if (!response.ok) throw new Error('Failed to create task');
      
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setError('');
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: !task.completed })
      });

      if (!response.ok) throw new Error('Failed to update task');
      
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
      setError('');
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete task');
      
      setTasks(tasks.filter(t => t.id !== taskId));
      setError('');
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <h1>Next Up - Task Manager</h1>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Next Up - Task Manager</h1>
        
        {error && <div className="error">{error}</div>}

        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="Task title *"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Task description (optional)"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Add one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                    className="checkbox"
                  />
                  <div className="task-details">
                    <h3 className="task-title">{task.title}</h3>
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="stats">
          <p>Total tasks: {tasks.length}</p>
          <p>Completed: {tasks.filter(t => t.completed).length}</p>
          <p>Pending: {tasks.filter(t => !t.completed).length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
