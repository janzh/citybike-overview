import React from "react";

import { useStations } from "../../data/sanntid/SanntidsdataHooks";
import GeneralError from "../error/GeneralError";
import Loader from "../loader/Loader";
import StationMap from "./StationMap";

const StationMapHandler = () => {
    const { requiredDataIsLoading, requiredDataIsError } = useStations();

    if (requiredDataIsLoading) {
        return <Loader />;
    }

    if (requiredDataIsError) {
        return <GeneralError />;
    }

    return <StationMap />;
};
export default StationMapHandler;
