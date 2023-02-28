import { changeComment } from "@/redux/commentSlice";
import { commentsBaseURL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import fetchWithToken from "./customFetch";


const saveComment = async (comment, token) => {
    const  { data } = await fetchWithToken(axios.post, commentsBaseURL, comment, token);
    return data;
}

const useSaveComment = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const mutation = useMutation(
        (comment) => saveComment(comment, token), {
        onSuccess: () => {
            dispatch(changeComment(""));
            queryClient.invalidateQueries("article")
        }
    });
    return mutation;
};

export { useSaveComment };