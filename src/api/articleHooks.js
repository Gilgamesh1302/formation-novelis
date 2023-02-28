import { filterArticleURL, getArticleCommentsURL, getArticlesURL } from "@/utils/urls"
import axios from "axios"
import { useQuery } from "react-query";


const getArticlesByPage = async (page, search, filter) => {
    const { data } = await axios.get(getArticlesURL(page, search), filter);
    return data;
}

const getArticleByIdWithComments = async (id) => {
    const { data } = await axios.get(getArticleCommentsURL(id));
    return data;
}

const getFilteredArticles = async (filter) => {
    const { data } = await axios.get(filterArticleURL, filter);
    return data;
}


const useGetArticles = (page = 0, search, filter) => {
    return useQuery(
        ['articles', { page, search }],
        () => getArticlesByPage(page, search, filter),
    ); 
}

const useGetArticleById = (id) => {
    return useQuery(['article', { id: id }], () => getArticleByIdWithComments(id));
}


export { useGetArticles, useGetArticleById };