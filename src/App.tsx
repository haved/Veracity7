import React from 'react';
import logo from './logo.svg';
<<<<<<< HEAD
import './Style/App.css';
=======
import './App.css';
import * as d3 from 'd3';

type fh = [String, Number];
>>>>>>> 0c88d232bd1c0ea69bce35616e5e872799f64304
import 'bootstrap/dist/css/bootstrap.min.css';
import MapContainer from "./Components/MapContainer";
import { Card } from "react-bootstrap";
import InfoContainer from "./Components/InfoContainer";

function App() {
  

  let ais = d3.csv("http://localhost:3000/data/Dataset_Gren_AIS_2021.csv");
  
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
