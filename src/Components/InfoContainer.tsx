import React, { useState } from "react";
import Options from "./Options";
import ShipComponent from "./ShipComponent";
import "../Style/App.css";
import { Boat, loadBoats } from "../Boat";

function InfoContainer(props: {
  boats: Boat[];
  setSorting: (sorting: string) => void;
  sorting: string | null | undefined;
  boatsHidden: string[];
  setBoatsHidden: (hidden: string[]) => void;
}) {
  const { boats } = props;
  const COLORS:Record<string, any> = {
    "M/S Ocean (24)": "#00AA00",
    "M/S Gren (17)": "#66AA00",
    "M/S Innovation (24)": "#99AA00",
    "M/S Sustainable (15)": "#AAAA00",
    "M/S Green (13)": "#AA6600",
    "M/S Eco (06)": "#AA0000"
  };

  const toggleBoatHidden = (vessel: string) => {
    const newHidden = [...props.boatsHidden];
    const vesselIndex = newHidden.indexOf(vessel)
    if(newHidden.includes(vessel))
      newHidden.splice(vesselIndex, 1);
    else
      newHidden.push(vessel);
    props.setBoatsHidden(newHidden);
  };

  let showBoats = boats.map((boat, i) => (
    <ShipComponent boat={boat}
                   color={COLORS[boat.vesselName]}
                   key={boat.vesselName}
                   hidden={props.boatsHidden.includes(boat.vesselName)}
                   toggleBoatHidden={toggleBoatHidden}
                   sorted={props.sorting}></ShipComponent>
  ));

  return (
    <div className="Container" id={"info"}>
      <div className="info-section">
        <div className="info-container">
          <h4>Settings</h4>
          <Options setSorting={props.setSorting}></Options>
        </div>
        <div className="options-container">{showBoats}</div>
      </div>
    </div>
  );
}

export default InfoContainer;
