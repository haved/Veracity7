import * as React from "react";
import "../Style/App.css";
import { Card } from "react-bootstrap";
import { Boat, loadBoats } from "../Boat";
import "../Boat";
import "../App";

const ShipComponent = (props: { boat: Boat, color: any}) => {
  const color = props.color
  const boat = props.boat;
  const [open, setOpen] = React.useState<Boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <div className="ship-container" onClick={handleClick} style={{background: color}}>
      <div className="image" style={{backgroundColor: boat.color}}>
      </div>
      <div className="ship-info">
        <div className="ship-top-info">
          <div className="vessel-name">
            <h5>{boat.vesselName}</h5>
          </div>
        </div>
        <div className={(open) ? "disable" : "active"}>
          <div className="ship-mini-info">
            <p>Price/nm: {((boat.price)/(boat.ladenTrip.totalDistance)).toFixed(2)} $,</p>
          </div>
          <div className="ship-mini-info">
            <p>CO2(t)/nm: {((boat.ballastTrip.totalCO2 + boat.ladenTrip.totalCO2)/(boat.ballastTrip.totalDistance + boat.ladenTrip.totalDistance)).toFixed(2)}</p>
          </div>
        </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Total Price: </p> <p className="info-value">{(boat.price/1000000).toFixed(2)} M$</p>
          
        </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Total CO2 (t): </p> <p className="info-value">{((boat.ballastTrip.totalCO2 + boat.ladenTrip.totalCO2)/1000).toFixed(2)} G</p>
          
        </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Dinstance from me (nm): </p> <p className="info-value">{((boat.ballastTrip.totalDistance/1000).toFixed(2))} G</p>
        </div>
      </div>
    </div>
  );
};

export default ShipComponent;
