import { LatLng } from "leaflet";
import React from "react";
import { Map, TileLayer } from "react-leaflet";

import { useStations } from "../../data/sanntid/SanntidsdataHooks";
import StationMarker from "./StationMarker";

const MAP_CENTER_COORDINATES = new LatLng(59.91273, 10.74609);
const MAP_ZOM = 15;

const StationMap = () => {
    const { stations } = useStations();

    return (
        <section>
            <Map center={MAP_CENTER_COORDINATES} zoom={MAP_ZOM}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {stations.map((station, index) => (
                    <StationMarker key={index} station={station} />
                ))}
            </Map>
        </section>
    );
};
export default StationMap;
