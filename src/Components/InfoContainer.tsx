import React from "react";
import Options from "./Options";
import ShipComponent from "./ShipComponent";
import "../Style/App.css";
import { Boat, loadBoats } from "../Boat";

function InfoContainer(props: { boats: Boat[] }) {
  const { boats } = props;

  let showBoats = boats.map((boat) => (
    <ShipComponent boat={boat} key={boat.vesselName}></ShipComponent>
  ));

  return (
    <div className="Container" id={"info"}>
      <div className="info-section">
        <div className="info-container">
          <h4>Organization Station</h4>
          <Options></Options>
        </div>
        <div className="options-container">{showBoats}</div>
      </div>
    </div>
  );
}

export default InfoContainer;
