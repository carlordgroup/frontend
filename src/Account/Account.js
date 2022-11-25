import React, { useState} from 'react'
import HomeMenu from '../shared/HomeMenu'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import './account.css'
import AvatarIcon from './AvatarIcon'
import Button from '@mui/material/Button'

function AccountTextFields() {
    const [fName, setfName] = useState(localStorage.getItem('firstName'));
    const [lName, setlName] = useState(localStorage.getItem('lastName'));
    const [adr, setAdr] = useState(localStorage.getItem('address'));
    const [number, setNumber] = useState(localStorage.getItem('phoneNum'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('firstName', fName)
        localStorage.setItem('lastName', lName)
        localStorage.setItem('address', adr)
        localStorage.setItem('phoneNum', number)
        localStorage.setItem('email', email)
        console.log(fName, lName, adr, number, email)

    }

    return (
        <div className='textFields'>
            <div className="profileInfo">
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >   
                <div className="accountInfo">
                    <TextField
                        required
                        onChange={(e) => setfName(e.target.value)}
                        id="firstName"
                        label="First Name"
                        type="firstName"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        required
                        onChange={(e) => setlName(e.target.value)}
                        id="lastName"
                        label="Last Name"
                        type="lastName"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        required
                        onChange={(e) => setAdr(e.target.value)}
                        id="address"
                        label="Address"
                        type="address"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        required
                        onChange={(e) => setNumber(e.target.value)}
                        id="phoneNumber"
                        label="Phone Number"
                        type="phoneNumber"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        label="Email"
                        type="email"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <div className="buttonPad">
                        <Button type="submit" variant="outlined" size="medium">Save</Button>
                    </div>
                </div>
                </Box>
                <div className='userInfo'> 
                    <p>
                        First Name: {fName}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        Last Name: {lName}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        Address: {adr}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        Phone Number: {number}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        Email: {email}
                    </p>
                </div>
            </div>
        </div>
    );
}

const Account = () => {
  return (
    <div className="accountPad" >
        <HomeMenu />
        <h1 className="profile">Profile</h1>
        <AvatarIcon />
        <AccountTextFields />
    </div>
  )
}
export default Account