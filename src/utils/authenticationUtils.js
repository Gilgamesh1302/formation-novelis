import { useGetUser } from "@/api/userHooks";
import { logout } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const loginUser = (dispatch) => {
    const token = localStorage.getItem('token');
    const { data } = useGetUser(token);
    dispatch(loginUser(data));
}

const isServerSide = () => typeof window === undefined;

const getTokenFromLocalStorage = () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        }
        return undefined;
    } catch (e) {
        return undefined;
    }
}

const removeTokenFromLocalstorage = () => {
    try {
        localStorage.removeItem("token");
    } catch (e) {
        return;
    }
}

const isUserAuthenticated = () => {
    const token = useSelector(state => state.token);
    if (token) {
        return true;
    }
    return false;
}

const signOut = (dispatch) => {
    removeTokenFromLocalstorage();
    dispatch(logout())
}    

export { 
    loginUser,
    getTokenFromLocalStorage,
    isUserAuthenticated,
    isServerSide,
    removeTokenFromLocalstorage,
    signOut,
};