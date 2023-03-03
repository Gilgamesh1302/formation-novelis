import { getArticleCommentsURL, getArticlesURL } from "@/utils/urls"
import axios from "axios"
import { useQuery } from "react-query";


// Api calls with axios
const getArticlesByPage = async (page, search, filter) => {
    const { data } = await axios.get(getArticlesURL(page, search), { params: filter });
    return data;
}

const getArticleByIdWithComments = async (id) => {
    const { data } = await axios.get(getArticleCommentsURL(id));
    return data;
}


// React Query custom hooks
const useGetArticles = (page = 0, search, filter) => {
    return useQuery(
        ['articles', { page, search, filter }],
        () => getArticlesByPage(page, search, filter),
        {refetchOnWindowFocus: false}
    ); 
}

const useGetArticleById = (id) => {
    return useQuery(
        ['article', { id: id }], 
        () => getArticleByIdWithComments(id)
    );
}

export { useGetArticles, useGetArticleById };