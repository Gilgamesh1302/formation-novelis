const filterAndSortObject = {
    sortBy: {
        title: {
            label: "Title",
            value: "title"
        },
        author: {
            label: "Author name",
            value: "author"
        },
        createdAt: {
            label: "Publishing date",
            value: "createdAt"
        },
    },
    filterBy: {
        author: {
            label: "Author Name",
            value: "author"
        },
        dateInterval: {
            label: "Publishing date",
            value: "createdAt",
            begin: "Start Date",
            end: "End Date"
        },
        articleWithUserComments: {
            label: "Articles in which I commented",
            value: "userComments"
        },
    }
}

export { filterAndSortObject };