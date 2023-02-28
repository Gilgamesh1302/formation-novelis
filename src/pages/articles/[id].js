import { useGetArticleById } from '@/api/articleHooks';
import AddComment from '@/component/AddComment';
import Comment from '@/component/Comment';
import EmptyListHandler from '@/component/EmptyListHandler';
import PreFetch from '@/component/PreFetch';
import { formatDate } from '@/utils/dateUtils';
import { isUserAuthenticated } from '@/utils/authenticationUtils';
import { Box, CardMedia, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const ArticleDetail = () => {
    const initialState = {
        id: 0,
        content: "",
        title: "",
        createdAt: "",
        author: "",
        comments: []
    }
    const { id } = useRouter().query;
    const { isLoading, isError, data: article = initialState, error } = useGetArticleById(id);

    return (
        <PreFetch 
            isError={isError}
            isLoading={isLoading}
            error={error}
        >
            <Grid
                container
                justifyContent="center"
                p={3}
            >
                <Grid item sm={12} md={8}>
                    <Paper elevation={12}>
                        <Box component="div" sx={{ position: "relative" }}>
                            <CardMedia
                                component="img"
                                sx={{ aspectRatio: "16/9", borderRadius: 1 }}
                                image="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"
                            />
                        </Box>
                        <Box component="div" sx={{ p: 2 }}>
                            <Typography variant='h4'>
                                {article.title}
                            </Typography>
                            <Typography variant='subtitle2' color="text.secondary">
                                By {article.author} - {formatDate(article.createdAt)}
                            </Typography>
                            <Typography variant='body1' mt={3} sx={{ whiteSpace: "pre-line" }}>
                                {article.content}
                            </Typography>
                        </Box>
                        {
                            isUserAuthenticated() && (
                                <Box component="div" sx={{ p: 2, pt: 1 }}>
                                    <Typography variant='h6'>
                                        Leave a Comment
                                    </Typography>
                                    <AddComment article={article} />
                                </Box>
                        )}
                        <Box component="div" sx={{ p: 2, pt: 1 }}>
                            <EmptyListHandler 
                                isEmpty={article.comments.length === 0}
                                message="No Comments To Show"
                            >
                                <Typography variant='h6'>
                                    Comments
                                </Typography>
                                {article.comments.map(comment => (
                                    <Comment comment={comment} key={comment.id} />
                                ))}
                            </EmptyListHandler>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </PreFetch>
    )
}

export default ArticleDetail;