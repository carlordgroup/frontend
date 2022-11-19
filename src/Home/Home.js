import React from 'react'
import HomeMenu from './HomeMenu'
import './home.css'
import Grid from '@mui/material/Grid';
import FilledInput from '@mui/material/FilledInput';

const Home = () => {
  return (
    <div>
      <HomeMenu/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2 className="centerText">Welcome to Carlord!</h2>
        </Grid>
        <Grid item xs={12}>
          <p className="centerText">Search below to rent the car of your choice</p>
        </Grid>
        <Grid item xs={12}>
          <div className="carSearch">
            <FilledInput
              id="filled-adornment-amount"
              value={"sample car"}
              // onChange={handleChange('amount')}
              // startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home