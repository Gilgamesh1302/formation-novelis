import React from "react";
import { formatDate } from "@utils/dateUtils";
import { getFirstLettersFromName } from "@utils/stringUtils";
import { Avatar, Box, Typography } from "@mui/material";
import { commentConrtainerStyle, containerStyle } from "./style";

const Comment = ({ comment }) => {
    return (
        <Box sx={containerStyle}>
            <Avatar sx={{ mr: 2 }}>{getFirstLettersFromName(comment.user.username)}</Avatar>
            <Box sx={commentConrtainerStyle}>
                <Typography variant="subtitle2" sx={{lineHeight: 1}}>
                    {comment.user.username}
                </Typography>
                <Typography variant="caption">
                    {formatDate(comment.publishingDate)}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {comment.content}
                </Typography>
            </Box>
        </Box>
    )
};

export default Comment;