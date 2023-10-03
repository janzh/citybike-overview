import React from "react";
import { Popup } from "react-leaflet";

import { Station } from "../../data/sanntid/sanntidsdataTypes";

const texts = {
    bikesAvailable: "Ledige sykler: ",
    docksAvailable: "Ledige låser: ",
};

interface StationMarkerPopupProps {
    station: Station;
}

const StationMarkerPopup = ({ station }: StationMarkerPopupProps) => (
    <Popup>
        <p>{station.name}</p>
        <p>{`${texts.bikesAvailable}${station.num_bikes_available}`}</p>
        <p>{`${texts.docksAvailable} ${station.num_docks_available}`}</p>
    </Popup>
);

export default StationMarkerPopup;
