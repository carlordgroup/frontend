import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './login.css'
import {
  Link
} from "react-router-dom";

const Login = () => {
  return (
    <>
    <HomeMenu/>
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="loginForm"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Username"
              defaultValue=""
              className="loginSpacing"
            />
            <br></br>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <br></br>
            <div className="loginButton">
              <Button variant="outlined">Log in</Button>
            </div>
          </div>
        </Box>
      </Grid>
      <Grid xs={12} className="loginRedirect">
        <div>
          <Link to='/login/create' className="loginLink">Create new account</Link>
        </div>
      </Grid>
      <Grid xs={12} className="loginRedirect">
        <div>
          <Link to='/login/reset' className="loginLink">Forgot Password</Link>
        </div>
      </Grid>
    </Grid>
    </>
  )
}

export default Login