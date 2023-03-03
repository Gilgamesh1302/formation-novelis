import { useSaveComment } from "@api/commentHooks";
import { useGetUser } from "@api/userHooks";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import CustomAvatar from "@component/CustomAvatar";
import { buttonStyle, containerStyle } from "./style";

const AddComment = ({ article }) => {
    const token = useSelector(state => state.token);
    const { isLoading: userLoading, data: user } = useGetUser(token);
    const { mutate, isLoading } = useSaveComment();
    const [content, setContent] = useState("");

    const onChange = event => {
        setContent(event.target.value);
    }

    const handleButtonClick = () => {
        if (!userLoading) {
            const comment = {
                content,
                article,
                user: {
                    id: user.id
                }
            };
            mutate(comment, {
                onSuccess: () => setContent(""),
            });    
        }
    };

    return (
        <Box component="div" sx={containerStyle}>
            <Box variant="div" sx={{ display: "flex" }}>
                <CustomAvatar name={user?.username} sx={{ mr: 2 }} />
                <TextField
                    sx={{ flexGrow: 1 }}
                    onChange={onChange}
                    value={content}
                    id="comment"
                    label="Your Comment"
                    multiline
                    minRows={3}   
                />
            </Box>
            <LoadingButton
                loading={isLoading}
                sx={buttonStyle}
                variant="contained"
                onClick={handleButtonClick}
            >
                Comment
            </LoadingButton>
        </Box>
    )
}

export default AddComment;