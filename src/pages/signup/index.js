import { useSignUp } from "@api/userHooks";
import Authenticated from "@component/Authenticated";
import LayoutWithoutHeader from "@layout/LayoutWithoutHeader";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography, TextField, Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { mainContainer, paper } from "../style";

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const { mutate, isError, error } = useSignUp();
    const onSubmit = (data, event) => {
        event.preventDefault();
        mutate(data);
    }
    return (
        <Authenticated>
            <Head>
                <title>Sign Up</title>
            </Head>
            <Box sx={mainContainer}>
                <Paper elevation={12} sx={paper}>
                <Box component="div">
                    <Typography variant="h4" mb={2}>SIGN UP</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box variant="div" pb={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        type="text"
                                        {...register("firstName", { required: true })}
                                        label="first name"
                                        sx={{width: "100%"}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField 
                                        type="text"
                                        {...register("lastName", { required: true })}
                                        label="last name"
                                        sx={{width: "100%"}}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box variant="div" pb={2}>
                            <TextField 
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                {...register("birthdate", { required: true })}
                                label="birthdate"
                                sx={{ width: "100%" }}
                            />
                        </Box>
                        <Box variant="div" pb={2}>
                            <TextField 
                                error={isError}
                                type="text"
                                {...register("username", { required: true })}
                                helperText={error?.response?.data?.message}
                                label="username"
                                sx={{ width: "100%" }}
                            />
                        </Box>
                        <Box variant="div" pb={2}>
                            <TextField 
                                type="password"
                                {...register("password", { required: true })}
                                label="password" 
                                sx={{ width: "100%" }}
                            />
                        </Box>
                        <LoadingButton 
                            type="submit"
                            sx={{mb: 2}}
                            variant="contained" 
                            size="large"
                        >
                            sign up
                        </LoadingButton>
                    </form>
                    <Typography variant="caption" sx={{ width: "100%", display: "inline-block" }} textAlign="center">
                    Already have an account ? 
                    <Link href="/">Log In</Link>
                    </Typography>
                </Box>
                </Paper>
            </Box>
        </Authenticated>
    )
}

SignUp.getLayout = (page) => <LayoutWithoutHeader>{page}</LayoutWithoutHeader>
export default SignUp;