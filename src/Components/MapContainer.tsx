import * as React from "react";
import {Feature, Geometry, FeatureCollection } from 'geojson';
import { feature } from 'topojson-client';
import { geoEqualEarth, geoOrthographic, geoPath } from "d3-geo";
import '../Style/App.css';
import { Boat, Trip } from "../Boat";

const scale: number = 200;
const cx: number = 400;
const cy: number = 220;
const viewboxWidth = 800;
const viewboxHeight = 450;

const PRICE_PER_DOT = 50000;
const CO2_PER_DOT = 100;
const TIME_PER_DOT = 24;
const DISTANCE_PER_DOT = 500;

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1:number, lon1:number, lat2:number, lon2:number) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value:number) 
{
    return Value * Math.PI / 180;
}

const MapContainer  = (props: {boats: Boat[], boatsHidden: string[], dotVariable: string|null})  => {
    const {boats} = props;
    const [geographies, setGeographies] = React.useState<[] | Array<Feature<Geometry | null>>>([]);
    const trips: Trip[] = [];

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

    const shownBoats = boats.filter((it) => !props.boatsHidden.includes(it.vesselName));

    const projection = geoEqualEarth().scale(scale).translate([cx, cy]).rotate([0,0]);
    shownBoats.forEach(e => {
        trips.push(e.ballastTrip);
        trips.push(e.ladenTrip);
    });

    function pathOfTrip(trip: Trip) {
      const projectedPoints: [number, number][] = [];
      trip.points.forEach((point) => {
        const projectedPoint = projection([point.long, point.lat])!;
        projectedPoints.push(projectedPoint);
      });

      let lastPoint = [0,0];
      const pathData = projectedPoints.map((p, i)=> {
        if(i === 0 || Math.abs(lastPoint[0]-p[0])>100) {
          lastPoint = p;
          return `M ${p[0]} ${p[1]}`;
        } else {
          lastPoint = p;
          return `L ${p[0]} ${p[1]}`;
        }
      }).join(" ");

      return (
        <path key={trip.key}
          d={pathData}
          stroke={trip.color}
          fill="none"
          strokeWidth={1.5}
          />
      );
    }

    function makeDotPointsForTrip(trip: Trip, numDots: number) {
      numDots = Math.floor(numDots);
      const circles = [];
      let totalDist = 0;
      for(let i = 1; i < trip.points.length; i++) {
        const from = trip.points[i-1];
        const to = trip.points[i];
        const dist = calcCrow(from.lat, from.long, to.lat, to.long);
        totalDist += dist;
      }
      const kmPerDot = totalDist/(numDots+1);

      let lastDistTraveled = 0;
      let distTraveled = 0;
      let nextDot = kmPerDot;
      let dataPoint = 0;
      let lastPoint:[number,number] = [0,0]
      while(dataPoint < trip.points.length && circles.length < numDots) {
        while(dataPoint+1 < trip.points.length && distTraveled < nextDot) {
          const from = trip.points[dataPoint];
          dataPoint++;
          const to = trip.points[dataPoint];
          const dist = calcCrow(from.lat, from.long, to.lat, to.long);
          lastDistTraveled = distTraveled;
          distTraveled += dist;
        }

        const from = trip.points[dataPoint-1];
        const to = trip.points[dataPoint];

        const unlerp = (nextDot-lastDistTraveled)/(distTraveled-lastDistTraveled);
        const point: [number, number] = [from.long*(1-unlerp) + to.long*unlerp, from.lat*(1-unlerp) + to.lat*unlerp];
        const proj = projection(point)!;
        if (Math.abs(lastPoint[0]-proj[0]) < 100 || circles.length === 0)
          circles.push(<circle r="2.5" transform={`translate(${proj[0]}, ${proj[1]})`} fill={trip.color} stroke="white"/>);
        lastPoint = proj;
        nextDot += kmPerDot;
      }

      console.log(circles.length);

      return circles;
    }

    function makeDotPointsLegend(height: number, color: string, numDots: number) {
      const circles = [];
      for(let i = 0; i < numDots; i++) {
        circles.push(<circle r="2.5" transform={`translate(${4+i*6}, ${viewboxHeight-height*6})`} fill={color} stroke="white"/>) 
      }
      return circles;
    }

    function makeString(text: string) {
      return <text x="6" y={viewboxHeight+16} fill="white">{text}</text>
    }

    function makeDotPoints() {
      if(props.dotVariable === "price") {
        return shownBoats.flatMap((boat, i) => [
          makeDotPointsForTrip(boat.ladenTrip, boat.price / PRICE_PER_DOT),
          makeDotPointsLegend(shownBoats.length-i, boat.color, boat.price / PRICE_PER_DOT),
          makeString(`Each dot: $${PRICE_PER_DOT} USD`)
        ]);
      } else if(props.dotVariable === "totalCO2") {
        return shownBoats.flatMap((boat, i) => [
          makeDotPointsForTrip(boat.ballastTrip, boat.ballastTrip.totalCO2 / CO2_PER_DOT),
          makeDotPointsForTrip(boat.ladenTrip, boat.ladenTrip.totalCO2 / CO2_PER_DOT),
          makeDotPointsLegend(shownBoats.length-i, boat.color, (boat.ballastTrip.totalCO2 + boat.ladenTrip.totalCO2) / CO2_PER_DOT),
          makeString(`Each dot: ${CO2_PER_DOT} tonnes CO2`)
        ]);
      } else if(props.dotVariable === "ballastDistance") {
        return shownBoats.flatMap((boat, i) => [
          makeDotPointsForTrip(boat.ballastTrip, boat.ballastTrip.totalDistance / DISTANCE_PER_DOT),
          makeDotPointsLegend(shownBoats.length-i, boat.color, boat.ballastTrip.totalDistance / DISTANCE_PER_DOT),
          makeString(`Each dot: ${DISTANCE_PER_DOT}nm`)
        ]);
      }
      return [];
    }

    return (
        <div className={"Container"} id={"map"}>
            <svg width={scale*3} height={scale*3} viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}>
                <g>
                    {(geographies as []).map((d, i) => (
                        <path key={`path-${i}`} 
                        d={geoPath().projection(projection)(d) as string}
                        fill={`rgba(38,50,56,${(1/ (geographies ? geographies.length : 0)) * i})`}
                        stroke="aliceblue"
                        strokeWidth={0.5}
                        />
                    ))}
                </g>
                <g>
                  {trips.map((d) => pathOfTrip(d))}
                </g>
                {props.dotVariable !== null && makeDotPoints()}
            </svg>
        </div>
    );
};

export default MapContainer;