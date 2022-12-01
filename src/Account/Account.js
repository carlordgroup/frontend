import React, { useState, useEffect} from 'react'
import HomeMenu from '../shared/HomeMenu'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import './account.css'
import AvatarIcon from './AvatarIcon'
import Button from '@mui/material/Button'
import axios from 'axios';
import { useToken } from '../appContext'
import Cards from './Cards'

function AccountTextFields() {
    const [fName, setfName] = useState();
    const [lName, setlName] = useState();
    const [adr, setAdr] = useState();
    const [phone, setPhone] = useState();
    const [config, setConfig] = useState();

    const [prevFName, setPrevFName] = useState();
    const [prevLName, setPrevLName] = useState();
    const [prevAdr, setPrevAdr] = useState();
    const [prevPhone, setPrevPhone] = useState();

    const [userInfo, setUserInfo] = useState();

    const [updateInfo, setUpdateInfo] = useState(false);

    const token = useToken()

    useEffect(() => {
        setConfig({
        headers: {
            'Authorization': "Bearer " + token
        }
        })
    }, [token])

    useEffect(() => {
        axios.get(`https://carlord.moki.cat/api/user/`, config)
            .then(res => {
                console.log(res.data);
                setUserInfo(res.data);
            }).catch((error) => {
                console.log(error.response.data)
        })
    }, [config, setUserInfo])

    useEffect(() => {
        if(userInfo){
            setPrevFName(userInfo.first_name)
            setPrevLName(userInfo.last_name)
            setPrevAdr(userInfo.address)
            setPrevPhone(userInfo.tel)
            setfName(userInfo.first_name)
            setlName(userInfo.last_name)
            setAdr(userInfo.address)
            setPhone(userInfo.tel)
        }
    }, [userInfo])

    useEffect(() => {
        if(updateInfo){
            axios.post(`https://carlord.moki.cat/api/user/`, {"first_name": fName, "last_name": lName, "address": adr, "tel": phone}, config)
           
            .then(res => {
            setUserInfo(res.data);
            }).catch((error) => {
            console.log(error.response.data)
        })
        }
        setUpdateInfo(false)
    }, [config, fName, lName, adr, phone, updateInfo])

    return (
        <>
            <div className='textFields'>
                <div className="profileInfo">
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
                            type="firstName"
                            value={fName}
                            onChange={(e) => setfName(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            id="lastName"
                            label="Last Name"
                            type="lastName"
                            value={lName}
                            onChange={(e) => setlName(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            id="address"
                            label="Address"
                            type="address"
                            value={adr}
                            onChange={(e) => setAdr(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            id="phoneNumber"
                            label="Phone Number"
                            type="phoneNumber"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <div className="buttonPad">
                            <Button onClick={()=>{setUpdateInfo(true)}} variant="outlined" size="medium">Save</Button>
                        </div>
                    </div>
                    </Box>
                    <div className='userInfo'> 
                        <p>First Name: {prevFName}</p>
                        <p>Last Name: {prevLName}</p>
                        <p>Address: {prevAdr}</p>
                        <p>Phone Number: {prevPhone}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

const Account = () => {
  return (
    <div className="accountPad" >
        <HomeMenu />
        <h1 className="profile">Profile</h1>
        <AvatarIcon />
        <AccountTextFields />
        <Cards />
    </div>
  )
}
export default Account