import { Grid, Typography, Button } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import React from "react";
import ArticleCard from "@component/ArticleCard";
import CustomPagination from "@component/CustomPagination";
import EmptyListHandler from "@component/EmptyListHandler";
import { filterButton, filterButtonContainer } from "./style";


const Articles = ({ articles, openDialog }) => {
    return (
        <EmptyListHandler 
            isEmpty={articles.content.length === 0}
            message="No articles to show"
        >
            <Grid item xs={12} sx={filterButtonContainer}>
                <Typography variant='h3'>
                    Article List
                </Typography>
                <Button onClick={openDialog} startIcon={<TuneIcon />} sx={filterButton}>
                    Filter
                </Button>
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