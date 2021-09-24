import * as React from "react";
import { Dropdown } from "react-bootstrap";

const Options = (props: { setSorting: (sort: string) => void }) => {
  const handleSelect = (e: any) => {
    props.setSorting(e.target[e.target.selectedIndex].value as string);
  };

  return (
    <div className="options">
      <select className="form-select" onChange={handleSelect}>
        <option value="price">Price</option>
        <option value="totalCO2">CO2 Emissions</option>
        <option value="ballastDistance">Distance</option>
        <option value="CO2nm">CO2/nm</option>
        <option value="pricenm">Price/nm</option>
      </select>
    </div>
  );
};

export default Options;
