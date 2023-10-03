import { SanntidsdataResponse, StationInformation, StationStatus } from "../data/sanntid/sanntidsdataTypes";

export const mockResponseStationInformation: SanntidsdataResponse = {
    last_updated: 1111,
    data: {
        stations: [
            {
                station_id: "627",
                name: "Skøyen Stasjon",
                address: "Skøyen Stasjon",
                lat: 59.9226729,
                lon: 10.6788129,
                capacity: 20,
            } as StationInformation,
        ],
    },
};

export const mockResponseStationStatus: SanntidsdataResponse = {
    last_updated: 1111,
    data: {
        stations: [
            {
                station_id: "627",
                is_installed: 1,
                is_renting: 1,
                num_bikes_available: 7,
                num_docks_available: 5,
                last_reported: 1540219230,
                is_returning: 1,
            } as StationStatus,
        ],
    },
};
