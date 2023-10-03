import "./styles.css";
import "leaflet/dist/leaflet.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import StationMapHandler from "./components/station-map/StationMapContainer";

const queryClient = new QueryClient();

export const App = () => (
    <QueryClientProvider client={queryClient}>
        <StationMapHandler />
    </QueryClientProvider>
);
