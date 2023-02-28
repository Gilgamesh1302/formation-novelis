import { useGetUser } from "@/api/userHooks";
import { appBarSettingsItems } from "@/constant/GeneralConstants";
import {
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAvatar from "../CustomAvatar";

export const Profile = () => {
  const [anchorElSetting, setAnchorEl] = useState(null);
  const token = useSelector(state => state.token);
  const { data: user } = useGetUser(token)
  const dispatch = useDispatch();
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const anchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  };

  return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Menu">
                <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                    <CustomAvatar name={user && user.username} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorElSetting}
                sx={{ mt: 5 }}
                anchorOrigin={anchorOrigin}
                keepMounted
                transformOrigin={anchorOrigin}
                open={Boolean(anchorElSetting)}
                onClose={handleCloseMenu}
            >
                {appBarSettingsItems.map((setting) => (
                <MenuItem key={setting.name} onClick={() => setting.onClick(dispatch)}>
                    <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
                ))}
            </Menu>
        </Box>
  );
};
