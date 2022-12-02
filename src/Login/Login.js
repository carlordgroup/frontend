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
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTokenUpdate } from '../appContext'
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Login = () => {

  const [loginValue, setLoginValue] = useState();
  const [passValue, setPassValue] = useState();

  const [successful, setSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const tokenContext = useTokenUpdate();
  const navigate = useNavigate();

  const login=()=>{
    axios.post(`https://carlord.moki.cat/api/account/login`, JSON.stringify({email: loginValue, password: passValue}))
        .then(res => {
          if(res.status === 200){
            setSuccessful(true)
          }
          tokenContext(res.data.token)
          localStorage.setItem("token", res.data.token)
        }).catch((error) => {
          setErrorMessage("Password and Email does not match")
      console.log(error.response.data)
    })

  }

  useEffect(() => {
    if(successful){
      navigate('/')
    }
  }, [successful, navigate])

  return (
    <>
    <HomeMenu/>
    <Grid container spacing={3}>
      <Grid xs={12}>
        <div>
          <Typography variant="h3" style={{textAlign:"center", paddingTop:"60px"}}>Login</Typography>
        </div>

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
            {<div className="errorMessage">          {errorMessage&& <p>{errorMessage}</p>}</div>}
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              value={loginValue}
              onChange={(input)=>{setLoginValue(input.target.value)}}
              className="loginSpacing"
            />
            <br></br>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              value={passValue}
              onChange={(input)=>{setPassValue(input.target.value)}}
              autoComplete="current-password"
            />
            <br></br>
            <div className="loginButton">
              <Button onClick={login} variant="outlined">Log in</Button>
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
