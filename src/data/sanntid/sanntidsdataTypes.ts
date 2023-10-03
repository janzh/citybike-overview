export interface StationInformation {
    station_id: string;
    name: string;
    address: string;
    lat: number;
    lon: number;
    capacity: number;
}

export interface StationStatus {
    is_installed: number;
    is_renting: number;
    num_bikes_available: number;
    num_docks_available: number;
    last_reported: number;
    is_returning: number;
    station_id: string;
}

export interface Sanntidsdata {
    stations: StationInformation[] | StationStatus[];
}

export interface SanntidsdataResponse {
    last_updated: number;
    data: Sanntidsdata;
}

export interface Station extends StationInformation, StationStatus {}
