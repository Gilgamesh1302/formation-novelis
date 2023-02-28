import { changeRoute } from '@/redux/routeSlice';
import { AppBar, Button, Container, NoSsr, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../Profile/Profile';

export const NavBar = () => {
    const token = useSelector(state => state.token);
    const dispatch = useDispatch()
    const router = useRouter();
    const handleClick = () => {
        dispatch(changeRoute(router.asPath));
        router.push("/")
    }
    const ProfileSection = token ?
        <Profile /> :
        <Button sx={{ color: "white" }} onClick={handleClick}>log in</Button>
    return (
        <>
            <AppBar sx={{ position: "sticky", top: 0 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant='h6'
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            My Blog
                        </Typography>
                        <NoSsr>
                            { ProfileSection }
                        </NoSsr>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};