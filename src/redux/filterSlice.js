import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: null
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (state, { payload }) => {
            state.filter = payload;
        }
    }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;