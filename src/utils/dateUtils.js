const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }
    return date.toLocaleDateString("en-GB", options);
};

export { formatDate };