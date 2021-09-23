import React from 'react';
import logo from './logo.svg';
import './Style/App.css';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapContainer from "./Components/MapContainer";
import { Card } from "react-bootstrap";
import InfoContainer from "./Components/InfoContainer";
type fh = [String, Number];
function App() {
  

  let ais = d3.csv("http://localhost:3000/data/Dataset_Gren_AIS_2021.csv");
  
  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1 style={{marginLeft: 10}}>This is header</h1>
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
