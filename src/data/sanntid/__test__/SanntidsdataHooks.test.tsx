import { mockUseStationInformation, mockUseStationStatus } from "../../../test/mockedHooks";
import { useStations } from "../SanntidsdataHooks";
import { SanntidsdataResponse, Station, StationInformation, StationStatus } from "../sanntidsdataTypes";

describe("SanntidsdataHooks", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("useStations", () => {
        it("should merge stationInformation and stationStatus for elements with equal station_id", () => {
            const responseStationInformation: SanntidsdataResponse = {
                last_updated: 1111,
                data: {
                    stations: [
                        {
                            station_id: "1",
                            name: "Skøyen Stasjon",
                            address: "Skøyen Stasjon",
                            lat: 59.9226729,
                            lon: 10.6788129,
                            capacity: 20,
                        } as StationInformation,
                        {
                            station_id: "2",
                            name: "Oslo Stasjon",
                            address: "Oslo Stasjon",
                            lat: 59.9226728,
                            lon: 10.6788128,
                            capacity: 21,
                        } as StationInformation,
                    ],
                },
            };

            const responseStationStatus: SanntidsdataResponse = {
                last_updated: 1111,
                data: {
                    stations: [
                        {
                            station_id: "2",
                            is_installed: 2,
                            is_renting: 2,
                            num_bikes_available: 2,
                            num_docks_available: 2,
                            last_reported: 1540219231,
                            is_returning: 2,
                        } as StationStatus,
                        {
                            station_id: "1",
                            is_installed: 1,
                            is_renting: 1,
                            num_bikes_available: 1,
                            num_docks_available: 1,
                            last_reported: 1540219230,
                            is_returning: 1,
                        } as StationStatus,
                    ],
                },
            };

            mockUseStationInformation({
                data: responseStationInformation,
                isError: false,
                isSuccess: true,
            });

            mockUseStationStatus({
                data: responseStationStatus,
                isError: false,
                isSuccess: true,
            });

            const stations = useStations();

            expect(stations).toEqual({
                stations: [
                    {
                        station_id: "1",
                        name: "Skøyen Stasjon",
                        address: "Skøyen Stasjon",
                        lat: 59.9226729,
                        lon: 10.6788129,
                        capacity: 20,
                        is_installed: 1,
                        is_renting: 1,
                        num_bikes_available: 1,
                        num_docks_available: 1,
                        last_reported: 1540219230,
                        is_returning: 1,
                    },
                    {
                        station_id: "2",
                        name: "Oslo Stasjon",
                        address: "Oslo Stasjon",
                        lat: 59.9226728,
                        lon: 10.6788128,
                        capacity: 21,
                        is_installed: 2,
                        is_renting: 2,
                        num_bikes_available: 2,
                        num_docks_available: 2,
                        last_reported: 1540219231,
                        is_returning: 2,
                    },
                ] as Station[],
                requiredDataIsError: false,
                requiredDataIsLoading: false,
            });
        });
    });
});
