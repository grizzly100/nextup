import React, { useState, useEffect } from 'react';
import { taskService, personService } from '../services/api';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    state: '',
    priority: '',
    person_id: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    person_id: '',
    priority: 'MEDIUM',
    state: 'OPEN',
    due_date: '',
  });

  useEffect(() => {
    loadTasks();
    loadPeople();
  }, [filters]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.list(filters);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadPeople = async () => {
    try {
      const response = await personService.list();
      setPeople(response.data);
    } catch (err) {
      console.error('Failed to load people:', err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.create(formData);
      setFormData({
        title: '',
        description: '',
        person_id: '',
        priority: 'MEDIUM',
        state: 'OPEN',
        due_date: '',
      });
      setShowForm(false);
      loadTasks();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await taskService.delete(taskId);
        loadTasks();
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  const handleUpdateTaskState = async (taskId, newState) => {
    try {
      await taskService.update(taskId, { state: newState });
      loadTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#dc3545';
      case 'MEDIUM': return '#ffc107';
      case 'LOW': return '#28a745';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPersonName = (personId) => {
    const person = people.find(p => p.id === personId);
    return person ? `${person.first_name} ${person.last_name}` : 'Unknown';
  };

  return (
    <div className="task-list-container">
      <div className="task-header">
        <h2>Tasks</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreateTask} className="task-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Assigned To *</label>
              <select
                value={formData.person_id}
                onChange={(e) => setFormData({ ...formData, person_id: e.target.value })}
                required
              >
                <option value="">Select a person</option>
                {people.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.first_name} {p.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="datetime-local"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              >
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary">Create Task</button>
        </form>
      )}

      <div className="filters">
        <select
          value={filters.state}
          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
        >
          <option value="">All States</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <select
          value={filters.person_id}
          onChange={(e) => setFilters({ ...filters, person_id: e.target.value })}
        >
          <option value="">All People</option>
          {people.map(p => (
            <option key={p.id} value={p.id}>
              {p.first_name} {p.last_name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="no-data">No tasks found</div>
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-header-card">
                <h3>{task.title}</h3>
                <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                  {task.priority}
                </span>
              </div>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-meta">
                <p><strong>Assigned to:</strong> {getPersonName(task.person_id)}</p>
                <p><strong>Due:</strong> {formatDate(task.due_date)}</p>
                <p><strong>Status:</strong> <span className={`status-badge ${task.state.toLowerCase()}`}>{task.state}</span></p>
              </div>
              <div className="task-actions">
                {task.state === 'OPEN' && (
                  <button
                    onClick={() => handleUpdateTaskState(task.id, 'CLOSED')}
                    className="btn-success"
                  >
                    Mark Complete
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
