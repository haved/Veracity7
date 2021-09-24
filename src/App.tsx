import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./Style/App.css";
import * as d3 from "d3";
import "bootstrap/dist/css/bootstrap.min.css";
import MapContainer from "./Components/MapContainer";
import { Card } from "react-bootstrap";
import InfoContainer from "./Components/InfoContainer";
import { Boat, loadBoats } from "./Boat";
import { propTypes } from "react-bootstrap/esm/Image";
import { sortAndDeduplicateDiagnostics } from "typescript";

function App(this: any) {
  const [boatsUnsorted, setBoatsUnsorted] = useState<Boat[]>([]);
  const [sorting, setSorting] = useState<string | null>();
  const [boats, setBoats] = useState<Boat[]>([]);

  useEffect(() => {
    async function loadAsync() {
      setBoatsUnsorted(await loadBoats());
    }
    loadAsync();
  }, []);

  useEffect(() => {
    const sorted = [...boatsUnsorted];
    if (sorting === "price") sorted.sort((a, b) => a.price - b.price);
    setBoats(sorted);
    if (sorting === "totalCO2")
      sorted.sort(
        (a, b) =>
          a.ladenTrip.totalCO2 +
          a.ballastTrip.totalCO2 -
          (b.ladenTrip.totalCO2 + b.ballastTrip.totalCO2)
      );
    setBoats(sorted);
    if (sorting === "ballastDistance")
      sorted.sort(
        (a, b) => a.ballastTrip.totalDistance - b.ballastTrip.totalDistance
      );
  }, [boatsUnsorted, sorting]);

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1 style={{ marginLeft: 10 }}>This is header</h1>
        </header>
      </div>
      <div className="ContainerContainer">
        <MapContainer boats={boats}></MapContainer>
        <InfoContainer boats={boats} setSorting={setSorting}></InfoContainer>
      </div>
    </div>
  );
}

export default App;
