import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './homeMenu.css'
import logo from './logo-no-background.png'

import {
  Link
} from "react-router-dom";

const navItems = ['Home', 'Car Listings', 'Bookings', 'Account', 'Contact', 'Login'];
const links = ['/', '/carlisting', '/bookings', '/account', '/contact', '/login'];

function DrawerAppBar(props) {
  return (
    <Box sx={{ display: 'flex' }} class="homeMenu">
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <div className="logoImage">
              <img src={logo} alt='Carlord Logo' width='90'/>
            </div>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, index) => (
              <Button key={item} sx={{ color: '#fff' }}>
                <Link to={links[index]} className="homeMenuLinks">{item}</Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;