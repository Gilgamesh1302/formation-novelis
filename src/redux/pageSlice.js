const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    value: 0
};

const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { changePage } = pageSlice.actions;
export default pageSlice.reducer;