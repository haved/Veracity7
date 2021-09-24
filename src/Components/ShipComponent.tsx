import * as React from "react";
import "../Style/App.css";
import { Card } from "react-bootstrap";
import { Boat, loadBoats } from "../Boat";
import "../Boat";
import "../App";

const ShipComponent = (props: { boat: Boat }) => {
  const { boat } = props;
  const [open, setOpen] = React.useState<Boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <div className="ship-container" onClick={handleClick}>
      <div className="image" style={{backgroundColor: boat.color}}>
      </div>
      <div className="ship-info">
        <div className="ship-top-info">
          <div className="vessel-name">
            <h5>{boat.vesselName}</h5>
          </div>
        </div>
        <div className="ship-mini-info">
            <p>Price: {(boat.price/1000000).toFixed(2)} M$,</p>
          </div>
          <div className="ship-mini-info">
            <p>CO2 [T]:{((boat.ballastTrip.totalCO2 + boat.ladenTrip.totalCO2)/1000).toFixed(2)} G,</p>
          </div>
          <div className="ship-mini-info">
            <p>Distance [KM]: {((boat.ballastTrip.totalDistance/1000).toFixed(2))} G</p>
          </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Total Price: </p>
          {Math.round(boat.price)}
        </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Total CO2: </p>
          {Math.round(boat.ladenTrip.totalCO2 + boat.ballastTrip.totalCO2)}
        </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Distance From Me: </p>
          {Math.round(boat.ballastTrip.totalDistance)}
        </div>
      </div>
    </div>
  );
};

export default ShipComponent;
