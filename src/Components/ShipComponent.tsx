import * as React from "react";
import "../Style/App.css";
import { Card, Form, InputGroup } from "react-bootstrap";
import { Boat, loadBoats } from "../Boat";
import "../Boat";
import "../App";
import "./InfoContainer"

const ShipComponent = (props: { boat: Boat, color: any, hidden: boolean, toggleBoatHidden: (vessel: string)=>void, sorted: string | null | undefined}) => {
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
            <Form.Check aria-label="option 1" onClick={handleHideToggle} style={{float: "right"}} />
          </div>
        </div>
        <div className={(open) ? "disable" : "active"}>
          <div className="ship-mini-info">
            {(props.sorted === "price") ? `Price: \$${(boat.price/1000000).toFixed(2)} M` : ``}
            {(props.sorted === "totalCO2") ? `Total CO2 (t): ${((boat.ballastTrip.totalCO2 + boat.ladenTrip.totalCO2)/1000).toFixed(2)} k` : ``}
            {(props.sorted === "ballastDistance") ? `Distance from me (nm): ${((boat.ballastTrip.totalDistance/1000).toFixed(2))} k` : ``}
            {(props.sorted === "pricenm") ? `Price/nm: ${((boat.price)/(boat.ladenTrip.totalDistance)).toFixed(2)}$` : ``}
            {(props.sorted === "CO2nm") ? `CO2(t)/nm: ${((boat.ballastTrip.totalCO2 + boat.ladenTrip.totalCO2)/(boat.ballastTrip.totalDistance + boat.ladenTrip.totalDistance)).toFixed(2)}` : ``}
          </div>
        </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Total Price: </p> <p className="info-value">${(boat.price/1000000).toFixed(2)} M</p>
          
        </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Total CO2 (t): </p> <p className="info-value">{((boat.ballastTrip.totalCO2 + boat.ladenTrip.totalCO2)/1000).toFixed(2)} k</p>
          
        </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Total distance (nm): </p><p className="info-value">{(((boat.ballastTrip.totalDistance + boat.ladenTrip.totalDistance)/1000).toFixed(2))} k</p>
        </div>
        <div className={`information ${(open) ? "active" : "disable"}`}>
          <p className="info-text">Distance from me (nm): </p> <p className="info-value">{((boat.ballastTrip.totalDistance/1000).toFixed(2))} k</p>
        </div>
      </div>
    </div>
  );
};

export default ShipComponent;
