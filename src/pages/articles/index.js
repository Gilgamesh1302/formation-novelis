import { useGetArticles } from '@api/articleHooks';
import Articles from '@component/Articles';
import Filter from '@component/Filter';
import PreFetch from '@component/PreFetch';
import SimpleDialog from '@component/SimpleDialog';
import { Box, Grid, Paper, useMediaQuery } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { articlesContainer, filterOuterContainer, simpleDialog, paper } from './style';



const ArticleList = () => {
    const page = useSelector(state => state.page.value);
    const filter = useSelector(state => state.filter.filter);
    const matches = useMediaQuery(('(min-width:900px)'))
    const form = useForm();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState("");
    const [desc, setDesc] = useState(false);
    const { isLoading, isError, data: articles, error, refetch } = useGetArticles(page, keyword, filter);

    const handleChange = event => {
        setSearch(event.target.value);
    }

    const handleClick = (event) => {
        if (event.key === "Enter") {
            setKeyword(search);
        }
    }

    const openDialog = () => {
        setOpen(true)
    }

    const filterComponent = <Filter 
        form={form}
        search={search}
        desc={desc}
        setDesc={setDesc}
        handleChange={handleChange}
        handleClick={handleClick}
    />

    useEffect(() => {
        if (search === "") {
            setKeyword("");
        }
    }, [search]);

    useEffect(() => {
        if (matches) {
            setOpen(false);
        }
    }, [matches])

    return (
        <>
            <Head>
                <title>Articles</title>
            </Head>
            <SimpleDialog open={open} setOpen={setOpen} sx={simpleDialog}>
                {filterComponent}
            </SimpleDialog>
            <Grid container pt={2} pl={2} pb={0} alignItems="flex-start">
                <Grid item md={3} lg={2} pr={2}>
                    <Box sx={filterOuterContainer}>
                        <Paper elevation={12} sx={paper}>
                            {filterComponent}
                        </Paper>
                    </Box>
                </Grid>
                <Grid 
                    item 
                    md={9} 
                    lg={10} 
                    xs={12} 
                    container 
                    spacing={2} 
                    sx={articlesContainer}
                    alignSelf={isLoading && "stretch"}
                > 
                    <PreFetch isLoading={isLoading} isError={isError} error={error}>
                        <Articles articles={articles} openDialog={openDialog} />
                    </PreFetch>
                </Grid>
            </Grid>
        </>
    )
};

export default ArticleList;