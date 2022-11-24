import React from 'react'
import HomeMenu from '../shared/HomeMenu';
import Grid from '@mui/material/Grid';
import './login.css'

const ForgotPassword = () => {
  return (
    <>
    <HomeMenu/>
    <Grid container spacing={3}>
      <Grid xs={12}>
        <p className='resetText'>
          An email has been sent with instructions to reset your password.
        </p>
      </Grid>
    </Grid>
    </>
  )
}

export default ForgotPassword