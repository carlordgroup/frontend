import React from 'react'
import HomeMenu from '../shared/HomeMenu';
import Grid from '@mui/material/Grid';
import './contact.css'
import { Link } from 'react-router-dom'

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
          </div>
        </Grid>
      </Grid>
      <Grid xs={12} className="contactRedirect">
        <div>
          <Link to='/contact/contactsubmit' className="contactLink">Submit</Link>
        </div>
      </Grid>
    </>
  )
}

export default Contact