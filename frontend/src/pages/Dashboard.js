import React, { useState, useEffect } from 'react';
import { taskService, personService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [tasksRes, peopleRes] = await Promise.all([
        taskService.upcoming(),
        personService.list(),
      ]);
      setUpcomingTasks(tasksRes.data);
      setPeople(peopleRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPersonName = (personId) => {
    const person = people.find(p => p.id === personId);
    return person ? `${person.first_name} ${person.last_name}` : 'Unknown';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#dc3545';
      case 'MEDIUM': return '#ffc107';
      case 'LOW': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getUrgencyClass = (dueDate) => {
    const days = getDaysUntilDue(dueDate);
    if (days === null) return '';
    if (days <= 1) return 'urgent';
    if (days <= 3) return 'soon';
    return 'normal';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Welcome to NextUp - Your Task Management System</p>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{upcomingTasks.length}</h3>
          <p>Open Tasks</p>
        </div>
        <div className="stat-card">
          <h3>{people.length}</h3>
          <p>Team Members</p>
        </div>
        <div className="stat-card">
          <h3>{upcomingTasks.filter(t => getDaysUntilDue(t.due_date) <= 1).length}</h3>
          <p>Due Today</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>📅 Upcoming Tasks</h2>
        
        {loading ? (
          <div className="loading">Loading dashboard...</div>
        ) : upcomingTasks.length === 0 ? (
          <div className="no-data">No upcoming tasks. Great job! 🎉</div>
        ) : (
          <div className="upcoming-tasks">
            {upcomingTasks.map(task => {
              const daysUntilDue = getDaysUntilDue(task.due_date);
              return (
                <div key={task.id} className={`upcoming-task ${getUrgencyClass(task.due_date)}`}>
                  <div className="task-left">
                    <h4>{task.title}</h4>
                    <p className="task-meta">
                      👤 {getPersonName(task.person_id)} • 
                      📌 <span style={{ 
                        backgroundColor: getPriorityColor(task.priority),
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontSize: '12px'
                      }}>
                        {task.priority}
                      </span>
                    </p>
                  </div>
                  <div className="task-right">
                    <p className="due-date">{formatDate(task.due_date)}</p>
                    {daysUntilDue !== null && (
                      <p className="days-until">
                        {daysUntilDue <= 0 
                          ? '⚠️ Overdue' 
                          : daysUntilDue === 1 
                          ? '⏰ Due tomorrow'
                          : `📆 In ${daysUntilDue} days`}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h2>👥 Quick Stats</h2>
        <div className="stats-info">
          <p>✅ All systems operational</p>
          <p>🔒 Your data is secure</p>
          <p>⚡ Ready to get productive</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
