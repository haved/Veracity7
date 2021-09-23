import React from 'react';
import Options from "./Options";
import ShipComponent from './ShipComponent';
import "../Style/App.css";

function InfoContainer () {
    return (
         <div className="Container" id={"info"}>
             <div className="info-section">
                <div className="info-container">
                    <p>Organization Station</p>
                    <Options></Options>
                </div>
                <div className="options-container">
                    
                    <ShipComponent></ShipComponent>
                    <ShipComponent></ShipComponent>
                    <ShipComponent></ShipComponent>
                </div>
            </div>
        </div>
            )
}


export default InfoContainer