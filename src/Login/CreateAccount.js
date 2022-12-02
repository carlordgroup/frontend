import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './login.css'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {isEmail} from "../utils/verify";

const CreateAccount = () => {
  //Set variables for creating an account
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const [attempt, setAttempt] = useState()
  const [error, setError] = useState("")
  const navigate = useNavigate();

  //Make sure the password matches and the email is valid
  const register=()=>{
    if (confirmPassword!==password){
      setError("Password does not match")
      return
    }
    if (!isEmail(email)){
      setError("Please input a valid Email")
      return
    }
    //Call the backend API to create the account
    axios.post(`https://carlord.moki.cat/api/account/register`, JSON.stringify({email: email, password: password}))
        .then(res => {
          navigate('/login')
        }).catch((error) => {
      setError("Email is used")
      console.log(error.response.data)

    })
  }

  return (
    <>
    <HomeMenu/>
    <Grid container spacing={3}>
      <Grid xs={12} className="loginGrid">
        <Typography variant="h3" style={{textAlign:"center"}}>Register</Typography>
        <div className="errorText">
          {attempt && <p>{error}</p>}
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
                type="email"
                onChange={(input)=>{
                  console.log(input)
                  setEmail(input.target.value)
                }}
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
              <Button onClick={() => {
                setAttempt(true)
                register()
              }} variant="outlined">Create Account</Button>
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
    </>
  )
}

export default CreateAccount
