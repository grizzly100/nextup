import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import TaskList from './components/TaskList';
import PeopleList from './components/PeopleList';
import OrganisationList from './components/OrganisationList';
import LinkList from './components/LinkList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/people" element={<PeopleList />} />
            <Route path="/organisations" element={<OrganisationList />} />
            <Route path="/links" element={<LinkList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
