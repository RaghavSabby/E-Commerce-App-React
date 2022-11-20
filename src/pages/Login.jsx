import { Avatar, CssBaseline, TextField, Typography, Button, Grid, Link } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { useTheme } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from "../firebase/Auth";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const theme = useTheme();

  const navigate = useNavigate()

  const { signIn } = useAuth();

  async function login(event) {
    event.preventDefault();
    const { email, password } = event.target;
    await signIn(email.value, password.value);
    navigate("/");
  }

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        mt: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Avatar sx={{
          backgroundColor: theme.palette.secondary.main,
          m: 1,
        }}>
          <LockIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">Log In</Typography>
        <form onSubmit={login} sx={{
            width: "100%",
            mt: 1,
          }}>
          <TextField label="Email" variant='outlined' margin='normal' required fullWidth id="email" name="email" autoFocus autoComplete='off' type="email"></TextField>
          <TextField label="Password" variant='outlined' margin='normal' required fullWidth id="password" name="password" autoComplete='current-password' type="password"></TextField>
          <Button type="submit" variant="contained" fullWidth color="primary" sx={{
            margin: theme.spacing(3,0,2)
          }}>Log In</Button>
        </form>
        <Grid container justifyContent={"flex-end"}>
          <Grid item>
            <Link variant="body2" href="/register">New user? Sign Up</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
