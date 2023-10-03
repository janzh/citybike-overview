import { useQuery } from "@tanstack/react-query";

import { get } from "../../api/axios";
import { SanntidsdataResponse, Station } from "./sanntidsdataTypes";

const SANNTIDSDATA_API_PATH = "/api/oslobysykkel.no";

const sanntidsdataKey = {
    stationInformation: ["stationInformation"],
    stationStatus: ["stationStatus"],
};

export const useStationInformation = () => {
    const getSanntidsdata = () =>
        get<SanntidsdataResponse>({ url: `${SANNTIDSDATA_API_PATH}/station_information.json` });

    return useQuery({
        queryFn: getSanntidsdata,
        queryKey: sanntidsdataKey.stationInformation,
        enabled: true,
    });
};

export const useStationStatus = () => {
    const getStationStatusList = () =>
        get<SanntidsdataResponse>({ url: `${SANNTIDSDATA_API_PATH}/station_status.json` });

    return useQuery({
        queryFn: getStationStatusList,
        queryKey: sanntidsdataKey.stationStatus,
        enabled: true,
    });
};

export interface UseStations {
    stations: Station[];
    requiredDataIsError: boolean;
    requiredDataIsLoading: boolean;
}

export const useStations = (): UseStations => {
    const stationInformationList = useStationInformation().data?.data.stations || [];
    const stationStatusList = useStationStatus().data?.data.stations || [];

    const stations = stationInformationList.map((station) => {
        const matchingStation = stationStatusList.find((station2) => station.station_id === station2.station_id);
        return {
            ...station,
            ...matchingStation,
        } as Station;
    });

    const { isError: stationInformationIsError, isSuccess: stationInformationIsSuccess } = useStationInformation();
    const { isError: stationStatusIsError, isSuccess: stationStatusIsSuccess } = useStationStatus();

    const requiredDataIsError = stationInformationIsError || stationStatusIsError;
    const requiredDataIsSuccess = stationInformationIsSuccess && stationStatusIsSuccess;

    const requiredDataIsLoading = !requiredDataIsError && !requiredDataIsSuccess;

    return {
        stations,
        requiredDataIsError,
        requiredDataIsLoading,
    };
};
