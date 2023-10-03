import { render } from "@testing-library/react";
import React from "react";

import { mockUseStationInformation, mockUseStationStatus } from "../../../test/mockedHooks";
import { mockResponseStationInformation, mockResponseStationStatus } from "../../../test/stationMock";
import StationMapContainer from "../StationMapContainer";

describe("StationMapContainer", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render without failure", () => {
        mockUseStationInformation({
            data: mockResponseStationInformation,
            isError: false,
            isSuccess: true,
        });

        mockUseStationStatus({
            data: mockResponseStationStatus,
            isError: false,
            isSuccess: true,
        });

        const { asFragment } = render(<StationMapContainer />);

        expect(asFragment()).toMatchSnapshot();
    });

    describe("loading states", () => {
        it("should show loader if request to get stationInformation is not settled", () => {
            mockUseStationInformation({
                data: undefined,
                isError: false,
                isSuccess: false,
            });

            mockUseStationStatus({
                data: mockResponseStationStatus,
                isError: false,
                isSuccess: true,
            });

            const { getByText } = render(<StationMapContainer />);

            expect(getByText("Vent, siden laster")).toBeInTheDocument();
        });

        it("should show loader if request to get stationStatus is not settled", () => {
            mockUseStationInformation({
                data: mockResponseStationInformation,
                isError: false,
                isSuccess: true,
            });

            mockUseStationStatus({
                data: undefined,
                isError: false,
                isSuccess: false,
            });

            const { getByText } = render(<StationMapContainer />);

            expect(getByText("Vent, siden laster")).toBeInTheDocument();
        });
    });

    describe("error states", () => {
        it("should show loader if request to get stationInformation failed", () => {
            mockUseStationInformation({
                data: undefined,
                isError: true,
                isSuccess: false,
            });

            mockUseStationStatus({
                data: mockResponseStationStatus,
                isError: false,
                isSuccess: true,
            });

            const { getByText } = render(<StationMapContainer />);

            expect(getByText("Beklager det har skjedd en feil, prøv igjen senere.")).toBeInTheDocument();
        });

        it("should show loader if request to get stationStatus failed", () => {
            mockUseStationInformation({
                data: mockResponseStationInformation,
                isError: false,
                isSuccess: true,
            });

            mockUseStationStatus({
                data: undefined,
                isError: true,
                isSuccess: false,
            });

            const { getByText } = render(<StationMapContainer />);

            expect(getByText("Beklager det har skjedd en feil, prøv igjen senere.")).toBeInTheDocument();
        });
    });
});
