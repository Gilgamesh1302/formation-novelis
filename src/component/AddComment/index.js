import { useSaveComment } from "@/api/commentHooks";
import { useGetUser } from "@/api/userHooks";
import { changeComment } from "@/redux/commentSlice";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomAvatar from "../CustomAvatar";
import { buttonStyle, containerStyle } from "./style";

const AddComment = ({ article }) => {
    const content = useSelector(state => state.comment.content);
    const token = useSelector(state => state.token);
    const { isLoading: userLoading, data: user } = useGetUser(token);
    const dispatch = useDispatch();
    const { mutate, isLoading } = useSaveComment();
    const onChange = event => {
        dispatch(changeComment(event.target.value));
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
            mutate(comment);    
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