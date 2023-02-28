import { getTokenFromLocalStorage } from "@/utils/authenticationUtils";
import axios from "axios";
import { useSelector } from "react-redux";

const fetchWithToken = async (fetchFunction, url, body, token) => {
    if (body) {
        return await fetchFunction(url, body, {
            headers: {
                Authorization: token
            }
        })
    }
    return await fetchFunction(url, {
        headers: {
            Authorization: token
        }
    })
};

export default fetchWithToken;