import { commentsBaseURL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";


// Api calls with axios
const saveComment = async (comment, token) => {
    const  { data } = await axios.post(commentsBaseURL, comment, {
        headers: {
            Authorization: token
        }
    });
    return data;
}

// React Query Custom Hooks
const useSaveComment = () => {
    const queryClient = useQueryClient();
    const token = useSelector(state => state.token);
    const mutation = useMutation(
        (comment) => saveComment(comment, token), {
        onSuccess: () => {
            queryClient.invalidateQueries("article")
        }
    });
    return mutation;
};

export { useSaveComment };