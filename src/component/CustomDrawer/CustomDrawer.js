import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { navBarItems } from '@/constant/GeneralConstants';
import React from 'react';
import { drawerPaper as sx, drawerStyle } from './CustomDrawer.css';

export const CustomDrawer = ({ window, isDrawerOpen, handleDrawerToggle }) => {
    const container = window !== undefined ? () => window().document.body: undefined;
    return (
        <Box component='nav'>
            <Drawer
                container={container}
                variant='temporary'
                open={isDrawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true, }} 
                sx={drawerStyle}
                PaperProps={{ sx }}
            >
                <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                    <Typography 
                        variant='h6'
                        sx= {{ my: 2 }}
                    >
                        My Blog
                    </Typography>
                    <Divider />
                    <List>
                        {navBarItems.map(item => (
                            <ListItem key={item} disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};