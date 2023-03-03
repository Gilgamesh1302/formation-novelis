const filterOuterContainer = {
    mb: 2,
    display: {
        md: "block",
        xs: "none"
    },
    pr: 2,
};

const articlesContainer = {
    alignItems: "stretch",
    position: "relative",
    overflowY: {
        xs: "auto",
        md: "scroll",
    },
    maxHeight: {
        md: "calc(100vh - 64px)",
        xs: "auto"
    },
    pb: 2,
    pr: 2
}

const simpleDialog = {
    display: { 
        xs: "block", 
        md: "none" 
    },
};

const paper = {
    minHeight: "calc(100vh - 96px)",
    p: 1
}

export { articlesContainer, filterOuterContainer, simpleDialog, paper };

