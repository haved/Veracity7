import React from 'react';
import logo from './logo.svg';
import './Style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapContainer from "./Components/MapContainer";
import { Card } from "react-bootstrap";
import InfoContainer from "./Components/InfoContainer";

function App() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>This is header</h1>
        </header>
      </div>
        <div className="ContainerContainer">
            <MapContainer></MapContainer>
            <InfoContainer></InfoContainer>
        </div>
    </div>

    
  );
}

export default App;
