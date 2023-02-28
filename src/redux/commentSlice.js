const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    content: ""
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        changeComment: (state, action) => {
            state.content = action.payload
        },
    } 
});

export const { changeComment } = commentSlice.actions;
export default commentSlice.reducer;