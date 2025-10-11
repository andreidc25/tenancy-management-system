// src/App.jsx

import React from 'react';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tenancy Management System</h1>
        <LoginForm />
      </header>
    </div>
  );
}

export default App;