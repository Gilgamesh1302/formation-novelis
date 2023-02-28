import { login } from "@/redux/userSlice";
import { authenticateUserURL, usersBaseURL } from "@/utils/urls";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";


const authenticateUser = async ({ username, password }) => {
    const { data: token } = await axios.post(authenticateUserURL(), { username, password });
    return token;
};

const getUser = async (token) => {
    const { data } = await axios.get(`${usersBaseURL}/authenticated`, {
        headers: {
            Authorization: token
        }
    });
    return data;
};

const saveUser = async (user) => {
    const { data } = await axios.post(usersBaseURL, user);
    return data;
}

const useGetUser = (token) => {
    const { isLoading, data } = useQuery(["user", token], () => getUser(token));
    return { isLoading, data };
}

const useAuthenticate = () => {
    const dispatch = useDispatch();
    const route = useSelector(state => state.route)
    const router = useRouter();
    const mutation = useMutation(authenticateUser, {
        onSuccess: (data) => {
            localStorage.setItem('token', data);
            dispatch(login(data));
            router.push(route);
        }
    });
    return mutation;
}

const useSignUp = () => {
    const router = useRouter()
    const mutation = useMutation(saveUser, {
        onSuccess: () => {
            router.push({
                pathname: "/",
                query: {
                    signed: true
                }
            })
        }
    });
    return mutation;
}

export { useAuthenticate, useGetUser, useSignUp };