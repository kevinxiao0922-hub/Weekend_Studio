import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Student } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Student | null>(null);

  // Check local storage for persistent session simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('weekend_studio_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('weekend_studio_user');
      }
    }
  }, []);

  const handleLogin = (student: Student) => {
    setCurrentUser(student);
    localStorage.setItem('weekend_studio_user', JSON.stringify(student));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('weekend_studio_user');
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard student={currentUser} onLogout={handleLogout} />;
};

export default App;