import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';

type fh = [String, Number];
import 'bootstrap/dist/css/bootstrap.min.css';
import MapContainer from "./Components/MapContainer";
import InfoContainer from './Components/InfoContainer';

function App() {
  

  let ais = d3.csv("http://localhost:3000/data/Dataset_Gren_AIS_2021.csv");
  
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
