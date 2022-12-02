import React, {useState} from 'react'
import HomeMenu from '../shared/HomeMenu';
import Grid from '@mui/material/Grid';
import './login.css'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {isEmail} from "../utils/verify";
import Typography from "@mui/material/Typography";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [click, setClicked] = useState(false)
  return (
    <>
    <HomeMenu/>
    <Grid container spacing={3}>
      <Grid xs={12}>
        <div
            className='resetText'
        >
          <Typography variant="h3" style={{textAlign:"center",paddingBottom:"30px", paddingTop:"30px"}}>Forget Password</Typography>

          <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=""
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              className="loginSpacing resetText"
          />
          <div style={{paddingTop:"30px"}}>
            <Button disabled={!isEmail(email)} onClick={() => setClicked(true)} variant="outlined">Send Email</Button>
          </div>
        </div>
        {click&&<p className='resetText'>
          An email has been sent with instructions to reset your password.
        </p>}
      </Grid>
    </Grid>
    </>
  )
}

export default ForgotPassword
