import * as React from "react";
import { Dropdown } from "react-bootstrap";

const Options = () => {
  const [value, setValue] = React.useState(null);

  const handleSelect = (e: any) => {
    console.log(e.target[e.target.selectedIndex].value);
    console.log("lol");
  };

  return (
    <div className="options">
      <select className="form-select" onChange={handleSelect}>
        <option value="price">Price</option>
        <option value="totalCO2">CO2 Emissions</option>
        <option value="distance">Distance</option>
      </select>
    </div>
  );
};

export default Options;
