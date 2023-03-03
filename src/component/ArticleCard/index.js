import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useState } from "react";
import { red } from "@mui/material/colors";
import Link from "next/link";
import {
    getFirstLettersFromName,
    getSubstringFromString,
} from "@utils/stringUtils";
import { formatDate } from "@utils/dateUtils";
import { cardActionStyle, cardContainerStyle } from "./style";
import { useSelector } from "react-redux";
import { useAddToFavourite, useGetUser } from "@api/userHooks";

const ArticleCard = ({ article }) => {
    const token = useSelector(state => state.token);
    const [open, setOpen] = useState(false);
    const [openSucess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const { data: user } = useGetUser(token);
    const { mutate } = useAddToFavourite();
    const color = user?.favouriteArticlesId?.includes(article.id) && red[500];

    const addOrRemoveFromfavourite = () => {
        if (token) {
            mutate({ article, user: null }, {
                onSuccess: (data) => {
                    setMessage(data)
                    setOpenSuccess(true)
                }   
            });
        } else {
            setOpen(true);
        }
    }
    const handleClose = () => setOpen(false);
    const handleSuccessClose = () => setOpenSuccess(false);

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" variant="filled" sx={{ width: '100%' }}>
                    You must create an account in order to add articles to your favourite
                </Alert>
            </Snackbar>
            <Snackbar open={openSucess} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Card elevation={12} sx={cardContainerStyle}>
                <CardHeader
                    avatar={<Avatar>{getFirstLettersFromName(article.author)}</Avatar>}
                    title={getSubstringFromString(article.title, 0, 27)}
                    subheader={formatDate(article.createdAt)}
                />
                <Box sx={{ px: 2 }}>
                    <CardMedia
                    component="img"
                    sx={{ borderRadius: 2, aspectRatio: "16/10" }}
                    image="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"
                    />
                </Box>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {getSubstringFromString(article.content, 0, 100)}
                    </Typography>
                </CardContent>
                <CardActions sx={cardActionStyle}>
                    <IconButton 
                        sx={{ color }}
                        aria-label="add to favoutie"
                        onClick={addOrRemoveFromfavourite}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <Link
                        href={`/articles/${article.id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <Button size="medium">Read More</Button>
                    </Link>
                </CardActions>
            </Card>
        </>
    );
};

export default ArticleCard;
