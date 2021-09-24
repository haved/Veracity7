import * as d3 from 'd3';

// You only pay for the laden trip
const PRICE_PER_DAY = 47273;
const COLORS: string[] = ["#05E6CF", "#2517E6", "#32E600", "#E65917", "#E6C30B", "#BD17E6"];

export interface TripPoint {
  hourIn: number,
  long: number,
  lat: number
}

export interface Trip {
  key: string,
  color: string,
  points: TripPoint[],
  totalDistance: number,
  hours: number,
  cargoPrcnt: number,
  totalCO2: number,
}

export interface Boat {
  vesselName: string,
  shipDesign: string,
  color: string,
  backgroundColor: any,
  europeHarbor: string,
  usHarbor: string,
  chinaHarbor: string,
  ballastTrip: Trip,
  ladenTrip: Trip,
  price: number,
}

export async function loadBoats(): Promise<Boat[]> {
  const ship_data = await d3.csv("http://localhost:3000/data/Dataset_Gren_2021.csv");
  const ais_data = await d3.csv("http://localhost:3000/data/Dataset_Gren_AIS_2021.csv");

  const ships: Record<string, Partial<Boat>> = {};
  for (let i = 0; i < ship_data.length; i++) {
    const ship = ship_data[i];
    const name = ship["Vessel name"]!;
    if (!(name in ships))
      ships[name] = {
        vesselName: name,
        shipDesign: ship["StandardShipDesign"]!,
        usHarbor: "USMSY",
        color: COLORS[Math.floor(i/2)],
      }

    const from = ship["PORT_UN_FROM"];
    const to = ship["PORT_UN_TO"];

    const trip: Trip = {
      key: `${name}-${from}-${to}`,
      color: ships[name].color!,
      points: [],
      hours: +ship["HOURS_UNDERWAY [h]"]!,
      totalDistance: +ship["total_distance [nm]"]!,
      cargoPrcnt: +ship["CARGO_to_DWT_pct [%]"]!,
      totalCO2: +ship["Total_CO2 [t]"]!,
    };

    if (from === ships[name].usHarbor) {
      ships[name].chinaHarbor = to;
      ships[name].ladenTrip = trip;
      ships[name].price = trip.hours / 24 * PRICE_PER_DAY;
    } else {
      ships[name].europeHarbor = from;
      ships[name].ballastTrip = trip;
    }
  }

  for(let i = 0; i < ais_data.length; i++) {
    const ais_point = ais_data[i];
    const name = ais_point["Vessel_name"]!;
    const ballast = ais_point["Loading_condition"] === "Ballast";

    const trip = ballast ? ships[name].ballastTrip : ships[name].ladenTrip;
    const lastTime = trip?.points.length === 0 ? 0 : trip?.points[trip?.points.length-1].hourIn!;
    trip?.points.push({
      hourIn: lastTime+(+ais_point["hours_since_last_position"]!),
      long: +ais_point["longitude"]!,
      lat: +ais_point["latitude"]!,
    });
  }

  return Object.values(ships) as Boat[];
}