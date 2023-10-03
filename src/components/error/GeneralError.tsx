import React from "react";
import styled from "styled-components";

const texts = {
    error: "Beklager det har skjedd en feil, prøv igjen senere.",
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GeneralError = () => (
    <Container>
        <p>{texts.error}</p>
    </Container>
);

export default GeneralError;
