import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './login.css'

const CreateAccount = () => {
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
              id="outlined-required"
              label="Email"
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
            <TextField
              required
              id="outlined-password-input"
              label="Re-enter password"
              type="password"
              autoComplete="current-password"
            />
            <br></br>
            <div className="loginButton">
              <Button variant="outlined">Create Account</Button>
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
    </>
  )
}

export default CreateAccount