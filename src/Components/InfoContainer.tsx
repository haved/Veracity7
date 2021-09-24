import React from "react";
import Options from "./Options";
import ShipComponent from "./ShipComponent";
import "../Style/App.css";
import { Boat, loadBoats } from "../Boat";

function InfoContainer(props: {
  boats: Boat[];
  setSorting: (sorting: string) => void;
}) {
  const { boats } = props;
  const COLORS: string[] = ["#00AA00", "#66AA00", "#99AA00", "#AAAA00", "#AA6600", "#AA0000"];

  let showBoats = boats.map((boat, i) => (
    <ShipComponent boat={boat} color={COLORS[i]} key={boat.vesselName}></ShipComponent>
  ));

  return (
    <div className="Container" id={"info"}>
      <div className="info-section">
        <div className="info-container">
          <h4>Organization Station</h4>
          <Options setSorting={props.setSorting}></Options>
        </div>
        <div className="options-container">{showBoats}</div>
      </div>
    </div>
  );
}

export default InfoContainer;
