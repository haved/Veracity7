import * as React from "react";
import "../Style/App.css";
import { Card } from "react-bootstrap";
import { Boat, loadBoats } from "../Boat";
import "../Boat";
import "../App";

const ShipComponent = async () => {
  return (
    <div className="ship-container">
      <div>
        <p>Image</p>
      </div>
      <div className="ship-info">
        <div>
          <h5>Name of ship</h5>
        </div>
        <div>
          <p>Imagine a lot of different information about this ship here.</p>
          <p>Speed: I am</p>
          <p>Lorem: dimsum</p>
        </div>
      </div>
    </div>
  );
};

export default ShipComponent;
