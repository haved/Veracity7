import * as React from "react";
import { Dropdown } from "react-bootstrap";

const Options = () => {
  const [value, setValue] = React.useState(null);

  const handleSelect = (e: any) => {
    console.log(e);
    console.log("lol");
  };

  return (
    <div className="options">
      <select className="form-select" onSelect={(e) => handleSelect}>
        <option value="price">Price</option>
        <option value="totalCO2">CO2 Emissions</option>
        <option value="distance">Distance</option>
      </select>
    </div>
  );
};

export default Options;
