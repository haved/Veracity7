import * as React from "react";
import {Feature, Geometry, FeatureCollection } from 'geojson';
import { feature } from 'topojson-client';
import { geoEqualEarth, geoOrthographic, geoPath } from "d3-geo";
import '../Style/App.css';
import { Boat, loadBoats } from "../Boat";

const uuid = require('react-uuid');

const scale: number = 200;
const cx: number = 400;
const cy: number = 150;

const MapContainer  = (props: {boats: Boat[]})  => {
    const {boats} = props;
    const [geographies, setGeographies] = React.useState<[] | Array<Feature<Geometry | null>>>([]);

    React.useEffect(() => {
        fetch('/data/world.json').then((response) => {
            if(response.status !== 200) {
                console.log("error" + response.status);
                return;
            }

            response.json().then((worldData) => {
                const mapFeature: Array<Feature<Geometry | null>> = ((feature(worldData, worldData.objects.countries) as unknown) as FeatureCollection).features;
                setGeographies(mapFeature);
            })

        })
    }, []);

    const projection = geoOrthographic().scale(scale).translate([cx, cy]).rotate([0,0]);
    boats.forEach( e => {
        console.log(e);
    })

    return (
        <div className={"Container"} id={"map"}>
            <svg width={scale*3} height={scale*3} viewBox="0 0 800 450">
                <g>
                    {(geographies as []).map((d, i) => (
                        <path key={`path-${uuid()}`} 
                        d={geoPath().projection(projection)(d) as string}
                        fill={`rgba(38,50,56,${(1/ (geographies ? geographies.length : 0)) * i})`}
                        stroke="aliceblue"
                        strokeWidth={0.5}
                        />
                    ))}
                </g>
                <g>
                    {}
                </g>
            </svg>
        </div>
    );
}

export default MapContainer