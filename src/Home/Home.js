import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import './home.css'
import TextField from '@mui/material/TextField';

const Home = () => {
  return (
    <div>
      <HomeMenu/>
      <div className="homeBackgroundColor">
        <div className="homePageText">
          <h2 className="welcomeText">Welcome to Carlord!</h2>
          <p className="searchText">Search below to rent the car of your choice</p>
          <TextField id="outlined-basic" label="Search cars" variant="outlined" sx={{ m: 1, width: '50ch' }} />
        </div>
      </div>
    </div>
  )
}

export default Home