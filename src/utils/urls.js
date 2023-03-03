const articlesBaseURL = `${process.env.NEXT_PUBLIC_API_URL}/articles`;
const commentsBaseURL = `${process.env.NEXT_PUBLIC_API_URL}/comments`;
const usersBaseURL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const getArticlesURL = (page, search) => `${articlesBaseURL}?page=${page}&keyword=${search}`;
const deleteArticleByIdURL = (id) => `${articlesBaseURL}/${id}`;
const getArticleByIdURL = (id) => `${articlesBaseURL}/${id}`;
const getArticleCommentsURL = (id) => `${articlesBaseURL}/${id}/comments`;

const deleteCommentByIdURL = (id) => `${commentsBaseURL}/${id}`;

const authenticateUserURL = () => `${usersBaseURL}/login`;
const addToFavouriteURL = `${usersBaseURL}/articles/favourite`;

export { commentsBaseURL, articlesBaseURL, usersBaseURL };
export { getArticleByIdURL, getArticlesURL, getArticleCommentsURL, deleteArticleByIdURL };
export { deleteCommentByIdURL };
export { authenticateUserURL, addToFavouriteURL };