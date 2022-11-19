import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import './account.css'

function AccountTextFields() {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <div className="accountInfo">
            <TextField
                required
                id="firstName"
                label="First Name"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                required
                id="lastName"
                label="Last Name"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
        <div>
            <TextField
                required
                id="password"
                label="Password"
                type="password"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="phoneNumber"
                label="Phone Number"
                InputLabelProps={{
                shrink: true,
                }}
            />
        </div>
        <div>
            <TextField
                id="email"
                label="Email"
                type="email"
                InputLabelProps={{
                shrink: true,
                }}
            />
        </div>
      </Box>
    );
}

const Account = () => {
  return (
    <div className="accountPad" >
        <h1 className="profile">Profile</h1>
        <AccountTextFields />
        <HomeMenu />
    </div>
  )
}
export default Account