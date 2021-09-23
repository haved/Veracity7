import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>This is header</h1>
        <Card>Test</Card>
      </header>
    </div>
  );
}

export default App;
