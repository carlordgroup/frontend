import React from 'react'
import HomeMenu from "../shared/HomeMenu"
import Grid from '@mui/material/Grid'

const ContactSubmit = () => {
  //Thank you message for submitting contact message
  return (
    <div>
        <Grid container spacing={3}>
            <Grid xs={12}>
                <p className='contactText'>
                    Thank you for your submission, we will get back to you shortly.
                </p>
            </Grid>
        </Grid>
        <HomeMenu />
    </div>
    
  )
}

export default ContactSubmit