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

const Login = () => {

  const [login, setLogin] = useState();
  const [config, setConfig] = useState();

  useEffect(() => {
    setLogin({email:"test2@gmail.com", password: "test"})
    setConfig({
      headers: {
         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njk3NzAyMzcsImlkIjoxMiwib3JpZ19pYXQiOjE2Njk2ODM4Mzd9.WUhLoGaNFDPW1qQhnd7pwZx99NrYKd1VBmJgpUj6stk"
      }
   })
  }, [])

  // useEffect(() => {
  //   console.log(config)
  //   axios.get(`https://carlord.moki.cat/api/account/`, config)
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //       }).catch((error) => {
  //         console.log(error.response.data)
  //       })
  // }, [config])

  // useEffect(() => {
  //   console.log(login)
  //   axios.put(`https://carlord.moki.cat/api/account/register`, JSON.stringify(login))
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //       }).catch((error) => {
  //         console.log(error.response.data)
  //       })
  // }, [login])

  useEffect(() => {
    axios.post(`https://carlord.moki.cat/api/account/login`, JSON.stringify(login))
        .then(res => {
          console.log(res);
          console.log(res.data);
        }).catch((error) => {
          console.log(error.response.data)
        })
  }, [login])


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