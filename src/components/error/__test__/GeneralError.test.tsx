import { render } from "@testing-library/react";
import React from "react";

import GeneralError from "../GeneralError";

describe("GeneralError", () => {
    it("should render without failure", () => {
        const { asFragment } = render(<GeneralError />);
        expect(asFragment()).toMatchSnapshot();
    });
});
