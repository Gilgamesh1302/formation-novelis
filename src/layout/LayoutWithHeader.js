import { NavBar } from "@/component/NavBar/NavBar";
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