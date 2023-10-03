import { UseQueryResult } from "@tanstack/react-query";

import * as sanntidsdataHooks from "../data/sanntid/SanntidsdataHooks";
import { SanntidsdataResponse } from "../data/sanntid/sanntidsdataTypes";

interface SanntidsdataResponseResultParams {
    data: SanntidsdataResponse | undefined;
    isError: boolean;
    isSuccess: boolean;
}

export const mockUseStationInformation = (result: SanntidsdataResponseResultParams) => {
    const useStationInformation = jest.spyOn(sanntidsdataHooks, "useStationInformation");
    useStationInformation.mockReturnValue(result as UseQueryResult<SanntidsdataResponse>);
};

export const mockUseStationStatus = (result: SanntidsdataResponseResultParams) => {
    const useStationStatus = jest.spyOn(sanntidsdataHooks, "useStationStatus");
    useStationStatus.mockReturnValue(result as UseQueryResult<SanntidsdataResponse>);
};
