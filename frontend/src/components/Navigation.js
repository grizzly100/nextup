import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>📋 NextUp</h1>
        </div>
        <ul className="navbar-menu">
          <li><a href="/">Dashboard</a></li>
          <li><a href="/tasks">Tasks</a></li>
          <li><a href="/people">People</a></li>
          <li><a href="/organisations">Organizations</a></li>
          <li><a href="/links">Links</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
