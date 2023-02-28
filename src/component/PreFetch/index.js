import React from "react";
import Loading from "../Loading";

const PreFetch = ({ isLoading, isError, error, children }) => {
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <p>{error.message}</p>
    }
    return children;
};

export default PreFetch;