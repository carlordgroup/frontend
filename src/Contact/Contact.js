import React from 'react'
import HomeMenu from '../shared/HomeMenu';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './contact.css'

const Contact = () => {
  return (
    <>
    <HomeMenu/>
    <Grid container spacing={3}>
      <Grid xs={12}>
        <p className='contact'>
          Contact us below
        </p>
        <div className='contactTextBox'>
          <textarea rows='6' cols='90'>
          </textarea>
          <Button variant="outlined">Submit</Button>
        </div>
      </Grid>
    </Grid>
    </>
  )
}

export default Contact