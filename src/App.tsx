import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './Style/App.css';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapContainer from "./Components/MapContainer";
import { Card } from "react-bootstrap";
import InfoContainer from "./Components/InfoContainer";
import { Boat, loadBoats } from './Boat';
import { propTypes } from 'react-bootstrap/esm/Image';

function App(this: any) {

  const [boats, setBoats] = useState<Boat[]>([]);

  useEffect(() => {
    async function loadAsync() {
      setBoats(await loadBoats());
    }

    loadAsync();
  }, []);

  console.log(boats);

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1 style={{marginLeft: 10}}>This is header</h1>
        </header>
      </div>
        <div className="ContainerContainer">
            <MapContainer boats={boats}></MapContainer>
            <InfoContainer></InfoContainer>
        </div>
    </div>

    
  );
}

export default App;
