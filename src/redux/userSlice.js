import { getTokenFromLocalStorage } from "@/utils/authenticationUtils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = ""; 

const userSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            return payload;
        },
        logout: (state) => {
            return "";
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;