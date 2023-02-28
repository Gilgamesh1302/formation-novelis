import React from "react";
import { Avatar } from "@mui/material"
import { getFirstLettersFromName } from "@/utils/stringUtils";

const CustomAvatar = ({ name="", ...props }) => {
    return <Avatar {...props}>{getFirstLettersFromName(name)}</Avatar>
}

export default CustomAvatar;