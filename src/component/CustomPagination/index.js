import { changePage } from "@/redux/pageSlice";
import Pagination from "@mui/material/Pagination";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomPagination = ({ count }) => {
    const page = useSelector(state => state.page.value);
    const dispatch = useDispatch();
    const handleChange = (_, value) => {
        dispatch(changePage(value - 1));
    }
    return (
        <Pagination 
            count={count}
            page={page + 1}
            showLastButton
            showFirstButton
            onChange={handleChange}
        />
    )
};

export default CustomPagination;