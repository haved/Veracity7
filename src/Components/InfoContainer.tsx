import React from 'react';
import Options from "./Options";

function InfoContainer () {
    return (
         <div className="Container">
            <div className="info-container">
                <p>Organization Station</p>
            </div>
            <div className="options-container">
                <Options></Options>
            </div>
        </div>
    );
}

export default InfoContainer