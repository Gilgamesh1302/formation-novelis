import { login } from "@/redux/userSlice";
import { addToFavouriteURL, authenticateUserURL, usersBaseURL } from "@/utils/urls";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";


// Api calls with axios
const authenticateUser = async (user) => {
    const { data: token } = await axios.post(authenticateUserURL(), user);
    return token;
};

const addOrRemoveFavouriteArticle = async (favouriteArticle, token) => {
    const { data } = await axios.post(addToFavouriteURL, favouriteArticle, {
        headers: {
            Authorization: token
        }
    });
    return data;
}

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

// React Query Custom Hooks
const useGetUser = (token) => {
    const { isLoading, data } = useQuery(
        ["user", token],
        () => getUser(token)
    );
    return { isLoading, data };
}

const useAddToFavourite = () => {
    const token = useSelector(state => state.token);
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (data) => addOrRemoveFavouriteArticle(data, token),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user", token]);
            }
        }
    );
    return mutation;
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

export { useAuthenticate, useGetUser, useSignUp, useAddToFavourite };