import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { loadingContainer } from "./style";

const Loading = () => {
    return (
        <Box variant="div" sx={loadingContainer} >
            <CircularProgress size={64} />
            <Typography variant="h4">
                Loading 
            </Typography>
        </Box>
    )
}; 

export default Loading;