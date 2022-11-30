import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './login.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const [successful, setSuccessful] = useState()
  const [create, setCreate] = useState()

  const [attempt, setAttempt] = useState()
  const navigate = useNavigate();


  useEffect(() => {
    if(create && password === confirmPassword){
      axios.post(`https://carlord.moki.cat/api/account/register`, JSON.stringify({email: email, password: password}))
        .then(res => {
          if(res.status === 201){
            setSuccessful(true)
          }
        }).catch((error) => {
          console.log(error.response.data)
        })
    }
    if(password !== confirmPassword){
      setSuccessful(false)
    }
    setCreate(false)
  }, [create, email, password, confirmPassword])

  useEffect(()=>{
    if(successful){
      navigate('/login')
    }
  },[successful, navigate])

  return (
    <>
    <HomeMenu/>
    <Grid container spacing={3}>
      <Grid xs={12} className="loginGrid">
        <div className="errorText">
          {attempt && <p>Email is in use or passwords do not match*</p>}
        </div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="createAccountForm"
        >
          <div> 
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              value={email}
              onChange={(input)=>{setEmail(input.target.value)}}
              className="loginSpacing"
            />
            <br></br>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(input)=>{setPassword(input.target.value)}}
            />
            <br></br>
            <TextField
              required
              id="outlined-confirm-password-input"
              label="Re-enter password"
              type="password"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(input)=>{setConfirmPassword(input.target.value)}}
            />
            <br></br>
            <div className="loginButton">
              <Button onClick={() => {setCreate(true); setAttempt(true)}} variant="outlined">Create Account</Button>
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
    </>
  )
}

export default CreateAccount