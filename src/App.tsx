import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';

type fh = [String, Number];

function App() {
  

  let ais = d3.csv("http://localhost:3000/data/Dataset_Gren_AIS_2021.csv");
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
