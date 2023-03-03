import { NavBar } from "@component/NavBar";
import React from "react";

export const LayoutWithHeader = ({ children }) => {
    return (
        <>
            <NavBar />
            { children }
        </>
    )
}

export default LayoutWithHeader;