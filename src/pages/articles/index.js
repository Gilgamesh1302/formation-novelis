import { useGetArticles } from '@/api/articleHooks';
import Articles from '@/component/Articles';
import Filter from '@/component/Filter';
import PreFetch from '@/component/PreFetch';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { filterOuterContainer } from './style';



const ArticleList = () => {
    const page = useSelector(state => state.page.value);
    const filter = useSelector(state => state.filter.filter);
    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState("");
    const { isLoading, isError, data: articles, error, refetch } = useGetArticles(page, keyword, filter);

    const handleChange = event => {
        setSearch(event.target.value);
    }

    const handleClick = (event) => {
        if (event.key === "Enter") {
            setKeyword(search);
        }
    }

    useEffect(() => {
        if (search === "") {
            setKeyword("");
        }
    }, [search])

    return (
        <PreFetch isLoading={isLoading} isError={isError} error={error}>
            <Grid container p={2} pb={0} alignItems="flex-start">
                <Grid item md={3} lg={2} pr={2}>
                    <Box sx={filterOuterContainer}>
                        <Paper elevation={12} sx={{ minHeight: "calc(100vh - 96px)", p: 1 }}>
                            <Filter 
                                search={search}
                                handleChange={handleChange}
                                handleClick={handleClick}
                            />
                        </Paper>
                    </Box>
                </Grid>
                <Grid item md={9} lg={10} xs={12} container spacing={2} mb={2}> 
                    <Articles articles={articles} />
                </Grid>
            </Grid>
        </PreFetch>
    )
};

export default ArticleList;