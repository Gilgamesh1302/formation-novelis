import { Typography } from "@mui/material";
import React from "react";

const EmptyListHandler = ({ isEmpty, message, children }) => {
    if (isEmpty) {
        return (
            <Typography variant="body1" textAlign="center">{message}</Typography>
        )
    }
    return children;
};

export default EmptyListHandler;