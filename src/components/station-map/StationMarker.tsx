import { divIcon } from "leaflet";
import React from "react";
import { Marker } from "react-leaflet";

import { Station } from "../../data/sanntid/sanntidsdataTypes";
import StationMarkerPopup from "./StationMarkerPopup";

const getIcon = (station: Station) => {
    const noBikesAvailable = station.num_bikes_available === 0 ? "marker-number--empty" : "";
    const noDocksAvailable = station.num_docks_available === 0 ? "marker-number--empty" : "";
    return divIcon({
        iconSize: [40, 40],
        iconAnchor: [0, 0],
        className: "",
        html: `
              <div class="marker">
                <div class="marker-number ${noBikesAvailable}">${station.num_bikes_available}</div>
                <div class="marker-number ${noDocksAvailable}">${station.num_docks_available}</div>
              </div>
       `,
    });
};

interface StationViewProps {
    station: Station;
}

const StationMarker = ({ station }: StationViewProps) => {
    const icon = getIcon(station);
    return (
        <Marker icon={icon} position={[station.lat, station.lon]}>
            <StationMarkerPopup station={station} />
        </Marker>
    );
};

export default StationMarker;
