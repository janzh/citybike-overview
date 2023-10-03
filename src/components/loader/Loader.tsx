import React from "react";
import styled from "styled-components";

const texts = {
    loading: "Vent, siden laster",
};

const LoaderSpinner = styled.div`
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Loader = () => (
    <LoaderContainer>
        <LoaderSpinner />
        <div>
            <p>{texts.loading}</p>
        </div>
    </LoaderContainer>
);

export default Loader;
