import React from 'react';
import Options from "./Options";
import ShipComponent from './ShipComponent';
import "../Style/Container.css";

function InfoContainer () {
    return (
         <div className="Container">
             <div className="info-section">
                <div className="info-container">
                    <p>Organization Station</p>
                </div>
                <div className="options-container">
                    <Options></Options>
                    <ShipComponent></ShipComponent>
                </div>
            </div>
        </div>
            )
}


export default InfoContainer