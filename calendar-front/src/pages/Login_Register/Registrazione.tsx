import React, { useState } from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, createTheme, ThemeProvider, Container, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';

const defaultTheme = createTheme();

interface SignUpResponse {
    user: any;
    token: string;
}

export default function SignUp() {
    const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null);
    const { setUser, setToken } = useStateContext();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = new FormData(event.currentTarget);

        const data = {
            name: payload.get('name'),
            email: payload.get('email'),
            password: payload.get('password'),
            password_confirmation: payload.get('password_confirmation'), // Changed here
        };

        axiosClient.post<SignUpResponse>('/signup', data)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password_confirmation" // Changed here
                                    label="Conferma Password"
                                    type="password"
                                    id="password_confirmation" // Changed here
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {errors &&
                                    <div className="alert">
                                        {Object.keys(errors).map(key => (
                                            <p key={key}>{errors[key][0]}</p>
                                        ))}
                                    </div>
                                }
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/Login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
