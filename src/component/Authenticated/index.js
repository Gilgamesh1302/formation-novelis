import { isUserAuthenticated } from "@/utils/authenticationUtils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Authenticated = ({ children }) => {
    const router = useRouter();
    const route = useSelector(state => state.route);
    const isAuthenticated = isUserAuthenticated();
    useEffect(() => {
        if (isAuthenticated) {
            router.push(route);
        }
    }, []);
    return children;
}

export default Authenticated;