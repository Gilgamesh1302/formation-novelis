import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard";
import CustomPagination from "../CustomPagination";
import EmptyListHandler from "../EmptyListHandler";


const Articles = ({ articles }) => {
    return (
        <EmptyListHandler 
            isEmpty={articles.content.length === 0}
            message="No articles to show"
        >
            <Grid item xs={12}>
                <Typography variant='h3' ml={2}>
                    Article List
                </Typography>
            </Grid>
            {articles.content.map((article) => (
                <Grid item sm={6} md={4} lg={3} key={article.id}>
                    <ArticleCard article={article} />
                </Grid>
            ))}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <CustomPagination 
                    count={articles.totalPages}
                />
            </Grid>
        </EmptyListHandler>
    );
};

export default Articles;