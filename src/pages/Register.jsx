import { Avatar, CssBaseline, TextField, Typography, Grid, Button, Link } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../firebase/Auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const { signUp } = useAuth();
    const navigate = useNavigate();

    async function registerUser(event) {
        event.preventDefault();
        // getting the data from the form
        const data = new FormData(event.target);
        await signUp(data.get("email"), data.get("password"), data.get("name"));
        navigate("/login");
    }

  return (
    <Container component={"main"} maxWidth="xs">
        {/* To get rid of normal browser specific styling */}
        <CssBaseline />
        <Box sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <Avatar sx={{
                m: 1,
                bgcolor: "secondary.main",
            }}>
                <LockIcon />
            </Avatar>
            <Typography component={"h1"} variant="h5">
                Sign Up
            </Typography>
            <Box component={"form"} sx={{
                mt: 3
            }} onSubmit={(event) => registerUser(event)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField name='name' id='name' autoFocus label="Name" fullWidth required autoComplete='give-name'></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='email' id='email' label="Email" fullWidth required autoComplete='email'></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='password' id='password' label="Password" fullWidth required autoComplete='new-password' type="password"></TextField>
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{
                    mt: 3,
                    mb: 2,
                }}>Register</Button>
                <Grid container justifyContent={"flex-end"}>
                    <Grid item>
                        <Link variant="body2" href="/login">Already have an account? Sign In</Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
  )
}
