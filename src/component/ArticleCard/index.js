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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useReducer } from "react";
import { red } from "@mui/material/colors";
import Link from "next/link";
import {
  getFirstLettersFromName,
  getSubstringFromString,
} from "@/utils/stringUtils";
import { formatDate } from "@/utils/dateUtils";
import { cardActionStyle, cardContainerStyle } from "./style";

const ArticleCard = ({ article }) => {
  return (
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
        <IconButton aria-label="add to favoutie">
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
  );
};

export default ArticleCard;
