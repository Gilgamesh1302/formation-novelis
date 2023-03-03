const defaultOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
}

const formatDate = (dateString, options = defaultOptions) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
};

export { formatDate };