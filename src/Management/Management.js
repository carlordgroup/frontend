import React, { useState, useEffect } from 'react'
import HomeMenu from '../shared/HomeMenu'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './management.css'

import { useToken } from '../appContext'
import Typography from "@mui/material/Typography";
import client from "../client/client";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Management = () => {

  const [config, setConfig] = useState();
  const [brand, setBrand] = useState();
  const [carType, setCarType] = useState();
  const [color, setColor] = useState();
  const [deposit, setDeposit] = useState();
  const [locationId, setLocationId] = useState(null);
  const [mileage, setMileage] = useState();
  const [model, setModel] = useState();
  const [plateCountry, setPlateCountry] = useState();
  const [plateNumber, setPlateNumber] = useState();
  const [price, setPrice] = useState();
  const [status, setStatus] = useState();
  const [unitPrice, setUnitPrice] = useState();
  const [year, setYear] = useState();

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [name, setName] = useState();

  const [submitCar, setSubmitCar] = useState();
  const [submitCarMessage, setSubmitCarMessage] = useState();

  const [submitLocation, setSubmitLocation] = useState();
  const [submitLocationMessage, setSubmitLocationMessage] = useState();
  const [locations, setLocations] = useState([]);

  const token = useToken();

  useEffect(() => {
    setConfig({
      headers: {
         'Authorization': "Bearer " + token
      }
   })
  }, [token])

  useEffect(() => {
    if(submitCar){
      axios.post(`https://carlord.moki.cat/api/management/car/`, JSON.stringify({
      brand: brand,
      car_type: carType,
      color: color,
      deposit: parseInt(deposit),
      location_id: parseInt(locationId),
      mileage: parseInt(mileage),
      model: model,
      plate_country: plateCountry,
      plate_number: plateNumber,
      price: parseInt(price),
      status: status,
      unit_price: parseInt(unitPrice),
      year: parseInt(year)
      }), config)
      .then(res => {
        console.log(res)
        if(res.status === 201){
          setSubmitLocationMessage(res.statusText)
        }
      }).catch((error) => {
        console.log(error.response.data)
        setSubmitCarMessage(error.response.data.error)
      })
    }
    setSubmitCar(false)
  }, [config, brand, carType, color, deposit, locationId, mileage, model, plateCountry, plateNumber, price, status, unitPrice, year, submitCar])

  useEffect(()=>{
      client.getLocations().then(({data})=>{
        setLocations(data)
        data.length&&setLocationId(data[0].id)
      })
  },[])

  useEffect(() => {
    if(submitLocation){
      axios.post(`https://carlord.moki.cat/api/management/location/`, JSON.stringify({
      latitude: parseInt(latitude),
      longitude: parseInt(longitude),
      name: name
      }), config)
      .then(res => {
        if(res.status === 201){
          setSubmitLocationMessage(res.statusText)
        }
      }).catch((error) => {
        console.log(error)
        console.log(error.response.data)
        setSubmitLocationMessage(error.response.data.error)
      })
    }
    setSubmitLocation(false)
  }, [config, latitude, longitude, name, submitLocation])
  const nav = useNavigate()
  return (
    <>
      <HomeMenu/>
      <div style={{width:"100%", textAlign:"center", marginTop:"90px"}}>

        <Typography variant="h3">Management</Typography>
        <Typography variant="h5">Go To Listings...</Typography>
        <div>
          <Button size="large"  onClick={()=>{nav(("/carlisting"))}}>Car List</Button>
          <Button size="large" onClick={()=>{nav(("/management/location"))}}>Location List</Button>
        </div>
      </div>
      <div>

      </div>
      <div className="managementPage">
        <div className="carInput">
          <h1>Add new car</h1>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Brand"
              value={brand}
              onChange={(input)=>{setBrand(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Car Type"
              value={carType}
              onChange={(input)=>{setCarType(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Color"
              value={color}
              onChange={(input)=>{setColor(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Deposit"
              value={deposit}
              onChange={(input)=>{setDeposit(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                  value={locationId}
                  label="Location"
                  onChange={(e)=>setLocationId(e.target.value)}
              >
                {locations.map(item=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}


              </Select>

          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Mileage"
              value={mileage}
              onChange={(input)=>{setMileage(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Model"
              value={model}
              onChange={(input)=>{setModel(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Plate Country"
              value={plateCountry}
              onChange={(input)=>{setPlateCountry(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Plate Number"
              value={plateNumber}
              onChange={(input)=>{setPlateNumber(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Price"
              value={price}
              onChange={(input)=>{setPrice(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Status"
              value={status}
              onChange={(input)=>{setStatus(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Unit Price"
              value={unitPrice}
              onChange={(input)=>{setUnitPrice(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Year"
              value={year}
              onChange={(input)=>{setYear(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          {submitCarMessage && <div>
            {submitCarMessage}
          </div>}
          <div className="">
            <Button onClick={()=>{setSubmitCar(true)}} variant="outlined">Add car</Button>
          </div>
        </div>
        <div className="locationInput">
          <h1>Add new location</h1>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Latitude"
              value={latitude}
              onChange={(input)=>{setLatitude(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Longitude"
              value={longitude}
              onChange={(input)=>{setLongitude(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          <div className="managementTextField">
            <TextField
              required
              id="outlined-password-input"
              label="Name"
              value={name}
              onChange={(input)=>{setName(input.target.value)}}
              autoComplete="current-password"
            />
          </div>
          {submitLocationMessage && <div>
            {submitLocationMessage}
          </div>}
          <div className="">
            <Button onClick={()=>{setSubmitLocation(true)}} variant="outlined">Add location</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Management
