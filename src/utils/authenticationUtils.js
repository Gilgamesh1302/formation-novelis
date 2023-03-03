import { useGetUser } from "@/api/userHooks";
import { logout } from "@/redux/userSlice";
import { useSelector } from "react-redux";

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
    getTokenFromLocalStorage,
    isUserAuthenticated,
    removeTokenFromLocalstorage,
    signOut,
};