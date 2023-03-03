import { useAuthenticate } from "@api/userHooks";
import Authenticated from "@component/Authenticated";
import LayoutWithoutHeader from "@layout/LayoutWithoutHeader";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, TextField, Paper, Alert, Snackbar } from "@mui/material"
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { mainContainer, paper } from "./style";

export default function Home() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { signed } = useRouter().query;
    const [open, setOpen] = useState(signed);
    const route = useSelector(state => state.route);
    const { mutate, isLoading, isError, error } = useAuthenticate();

    const handleUsername = event => setUserName(event.target.value);
    const handlePassword = event => setPassword(event.target.value);
    const handleSubmit = event => {
        event.preventDefault();
        mutate({ username, password })
    }
    const handleClose = () => setOpen(false);

    return (
        <Authenticated>
            <Head>
                <title>Log In</title>
            </Head>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Account created successfully
                </Alert>
            </Snackbar>
            <Box sx={mainContainer}>
                <Paper elevation={12} sx={paper}>
                    <Box component="div">
                        <Typography variant="h4" mb={2}>LOG IN</Typography>
                        <form onSubmit={handleSubmit} style={{ minWidth: "25%" }}>
                            <Box variant="div" pb={2}>
                                <TextField
                                    error={isError}
                                    type="text"
                                    helperText={error?.response?.data?.message || ""}
                                    value={username}
                                    onChange={handleUsername}
                                    label="username"
                                    fullWidth
                                    required
                                />
                            </Box>
                            <Box variant="div" pb={2}>
                                <TextField 
                                    type="password" 
                                    value={password} 
                                    onChange={handlePassword} 
                                    label="password" 
                                    fullWidth
                                    required
                                />
                            </Box>
                            <LoadingButton 
                                type="submit"
                                loading={isLoading}
                                sx={{mb: 2}}
                                variant="contained" 
                                size="large"
                            >
                                Log In
                            </LoadingButton>
                        </form>
                        <Typography variant="caption" sx={{ width: "100%", display: "inline-block" }} textAlign="center">
                            Don't have an account ? 
                            <Link href="/signup">Sign Up</Link>
                        </Typography>
                        <Typography variant="caption" sx={{ width: "100%", display: "inline-block" }} textAlign="center">
                            Continue as
                            <span> </span>
                            <Link href={route}>guest</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Authenticated>
    );
}

Home.getLayout = (page) => <LayoutWithoutHeader>{page}</LayoutWithoutHeader>
