import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './homeMenu.css'
import logo from './logo-no-background.png'
import axios from 'axios';
import {
  Link
} from "react-router-dom";
import { useState, useEffect } from 'react';
import { useToken, useTokenUpdate, useAdmin, useAdminUpdate } from '../appContext'


function DrawerAppBar(props) {
  const token = useToken()
  const tokenContext = useTokenUpdate();
  const admin = useAdmin();
  const adminContext = useAdminUpdate();
  const [config, setConfig] = useState();

  const [navItems, setNavItems] = useState(['Home', 'Car Listings', 'Bookings', 'Account', 'Contact', 'Login']);
  const [links, setLinks] = useState(['/', '/carlisting', '/bookings', '/account', '/contact', '/login']);

  useEffect(() => {
    setConfig({
      headers: {
         'Authorization': "Bearer " + token
      }
   })
  }, [token])

  useEffect(()=>{
    if(token){
      setNavItems(['Home', 'Car Listings', 'Bookings', 'Account', 'Contact',  'Logout'])
      setLinks(['/', '/carlisting', '/bookings', '/account', '/contact',  '/login'])
    }
    else{
      setNavItems(['Home', 'Login'])
      setLinks(['/', '/login'])
    }
    if(admin){
      setNavItems(['Home', 'Bookings',  'Account', 'Contact', 'Management', 'Logout'])
      setLinks(['/',  '/bookings', '/account', '/contact', '/management', '/login'])
    }
  }, [token, admin])

  useEffect(() => {
    if(token){
      axios.get(`https://carlord.moki.cat/api/account/`, config)
        .then(res => {
          console.log(res);
          adminContext(res.data.is_admin)
        }).catch((error) => {
          console.log(error.response.data)
        })
    }
  }, [config, token, adminContext])

  return (
    <Box sx={{ display: 'flex' }} className="homeMenu">
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
            {navItems.map((item, index) => {
              let normal
              if(item !== "Logout")(
                normal = (<Button key={item} sx={{ color: '#fff' }}>
                  <Link to={links[index]} className="homeMenuLinks">{item}</Link>
                </Button>))
              else{
                normal = (<Button onClick={()=>{tokenContext(); localStorage.setItem("token", null); adminContext(false);}} key={item} sx={{ color: '#fff' }}>
                <Link to={links[index]} className="homeMenuLinks">{item}</Link>
              </Button>)
              }
              return normal
            })}
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
