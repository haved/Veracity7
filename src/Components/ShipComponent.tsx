import * as React from "react";
import "../Style/App.css";
import { Card, Form, InputGroup } from "react-bootstrap";
import { Boat, loadBoats } from "../Boat";
import "../Boat";
import "../App";
import "./InfoContainer"

const ShipComponent = (props: { boat: Boat, color: any, hidden: boolean, toggleBoatHidden: (vessel: string)=>void}) => {
  const color = props.color;
  const boat = props.boat;
  const [open, setOpen] = React.useState<Boolean>(false);
  const hidden = props.hidden;



  const handleClick = () => {
    setOpen(!open);
  }

  const handleHideToggle = (event: any) => {
    event.stopPropagation();
    props.toggleBoatHidden(boat.vesselName);
  }

  const getBackgroundColor = () => {
    if (hidden) {
      return "#4f4f4f"
    }
    else {
      return color
    }
  }

  return (
    <div className="ship-container" onClick={handleClick} style={{background: getBackgroundColor()}}>
      <div className="image" style={{backgroundColor: boat.color}}>
      </div>
      <div className="ship-info">
        <div className="ship-top-info">
          <div className="vessel-name" style={{display: "flex", justifyContent: "space-between"}}>
            <h5>{boat.vesselName}</h5>
            <Form.Check aria-label="option 1" onClick={handleHideToggle} />
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
