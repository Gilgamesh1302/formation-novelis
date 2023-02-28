import { createSlice } from "@reduxjs/toolkit"

const initialState = "/articles";

const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        changeRoute: (state, { payload }) => {
            return payload;
        }
    }
})

export const { changeRoute } = routeSlice.actions;
export default routeSlice.reducer;