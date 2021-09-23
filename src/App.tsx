import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapContainer from "./Components/MapContainer";
import InfoContainer from './Components/InfoContainer';

function App() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>This is header</h1>
        </header>
      </div>
      <MapContainer></MapContainer>
      <InfoContainer></InfoContainer>
    </div>

    
  );
}

export default App;
