import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "@/redux/pageSlice"
import userReducer from "@/redux/userSlice";
import routerReducer from "@/redux/routeSlice";
import filterReducer from "@/redux/filterSlice";
import { getTokenFromLocalStorage } from "@/utils/authenticationUtils";

const token = getTokenFromLocalStorage() || "";
const initialState = {
    token,
}

export const store = configureStore({
    reducer: {
        page: pageReducer,
        token: userReducer,
        route: routerReducer,
        filter: filterReducer
    },
    preloadedState: initialState
});
