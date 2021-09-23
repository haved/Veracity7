import * as React from "react";
import { Dropdown } from "react-bootstrap";

const Options  = ()  => {
    return (
        <div className="options">
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort By
            </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Price</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">CO2 Emissions</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Distance</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
    )
}

export default Options