import React, {useState, useEffect} from 'react'
import HomeMenu from '../shared/HomeMenu'
import { useToken } from '../appContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import {
  Link
} from "react-router-dom";
import './carListing.css';
import client from "../client/client";
import {InputLabel, MenuItem, Select} from "@mui/material";

const ConfirmPayment = () => {

  let { id } = useParams();
  const offline = document.location.toString().includes("offline/")

  const [selectedCar, setSelectedCar] = useState()
  const [config, setConfig] = useState()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [errorMessage, setErrorMessage] = useState()
  const [showError, setShowError] = useState()
  const [cards, setCards] = useState([])
  const [cardID, setCardID] = useState()

  const [successful, setSuccessful] = useState()
  const token = useToken()
  const navigate = useNavigate();

  const [user, setUser] = useState()
  const [name, setName] = useState()
  const [number, setNumber] = useState()
  const [expiry, setExpiry] = useState()

  useEffect(() => {
    setConfig({
      headers: {
        'Authorization': "Bearer " + token
      }
    })
  }, [token])

  useEffect(()=>{
    if (offline){
      client.createOneTimeUser().then(({data})=>setUser(data.id))
    }
  },[])

  useEffect(() => {
    if (id){
      client.getCar(parseInt(id)).then(({data})=>setSelectedCar(data))
    }
  }, [ id])

  useEffect(() => {
    client.getCards().then(({data})=>{
      setCards(data)
      if (data.length)setCardID(data[0].id)
    })
  }, [])

  const makeBooking = async ()=> {
    if (offline){
      await client.offlineBooking(parseInt(id), cardID, user, parseInt((endDate.$d.getTime()/1000).toFixed(0)),parseInt((startDate.$d.getTime()/1000).toFixed(0)),)
      navigate('/bookings')
      return
    }
    console.log(endDate)
    try {
      await client.addBooking(parseInt(id), cardID, parseInt((endDate.$d.getTime()/1000).toFixed(0)),parseInt((startDate.$d.getTime()/1000).toFixed(0)),)
      navigate('/bookings')
    }catch ({response:{data}}){
      setErrorMessage(data.error)
    }

  }

  const informationDisplay= (card)=>{
    if (!card)return
  return  <div>
      <p>Cardholder Name: {card.cardholder_name}</p>
      <p>Credit Card Number: {card.number}</p>
      <p>Expiry Date: {card.valid_until}</p>
    </div>
  }

  const validate=()=>{
    if (!startDate){
      setErrorMessage("You should select a start date")
      return false
    }
    if (!endDate){
      setErrorMessage("You should select a start date")
      return false
    }

    if (startDate.$d>=endDate.$d){
      setErrorMessage("Time is not valid")
      return false
    }
    if (!cardID){
      setErrorMessage("You should select a card")
    return false
    }
    if (!id){
      setErrorMessage("You should select a car")
      return false
    }
    setErrorMessage("")
  return true
  }

  const addCard=async ()=>{
    const {data} = await client.createOneTimeCard(user,number,name,expiry,)
    setCardID(data.id)
  }

  return (
    <div>
        <HomeMenu />
        <h1 className="confirmBookingTitle">Confirm Booking</h1>
        { selectedCar && <>
          <div className="carConfirm">
            <div className="carInfo">
              <h2>Car Information</h2>
              <p>Brand: {selectedCar.brand}</p>
              <p>Car Type: {selectedCar.car_type}</p>
              <p>Color: {selectedCar.color}</p>
              <p>Deposit: {selectedCar.deposit}</p>
              <p>Mileage: {selectedCar.mileage}</p>
              <p>Model: {selectedCar.model}</p>
              <p>Plate Country: {selectedCar.plate_country}</p>
              <p>Plate Number: {selectedCar.plate_number}</p>
              <p>Price: {selectedCar.price}</p>
              <p>Status: {selectedCar.status}</p>
              <p>Unit Price: {selectedCar.unit_price}</p>
              <p>Year: {selectedCar.year}</p>
            </div>
            <div className="rentalCost">
              <h2>Rental Cost</h2>
              <p>Cost per day: {(selectedCar.price/280).toFixed(2)}</p>
            </div>
          </div>
          <div className="creditCardContainer">
            <div className="creditCard">
              <div className="creditCardTitle">

              </div>
              {!offline&&<>
                <h2 className="creditCardSpacing">Credit Card</h2>
                <div>
                  <Button variant="outlined" size="medium"><Link to='/account' className="editCard">Edit</Link></Button>
                </div>
                <InputLabel id="demo-simple-select-label">Card</InputLabel>
                <Select
                    key={cardID}
                    value={cardID}
                    label="Card"
                    onChange={(e)=>{
                      setCardID(e.target.value)
                    }
                    }
                >
                  {cards.map(card=><MenuItem value={card.id} key={card.id}>{card.number} {card.cardholder_name} {card.valid_until}</MenuItem>)}
                </Select>
                {informationDisplay(cards.find(item=>item.id===cardID))}
              </>}
            </div>
          </div>
          <div className="confirmBooking">
            <div className="confirmBookingFields">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  defaultValue={""}
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="confirmBookingFields">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  defaultValue={""}
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            {offline&&<><div className="creditCardBox">

              <TextField
                  required
                  id="firstName"
                  label="Cardholder Name"
                  type="firstName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="creditCardTextBox"
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <TextField
                  required
                  id="lastName"
                  label="Credit Card Number"
                  type="lastName"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="creditCardTextBox"
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <TextField
                  required
                  id="address"
                  label="Expiry Date"
                  type="address"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="creditCardTextBox"
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <Button onClick={()=>{addCard()}} variant="outlined" size="medium">Save</Button>
            </div></>}
            <div className="confirmBookingFields">
              {errorMessage && <div className="errorMessage">{errorMessage}</div>}
              <Button className="confirmBookingButton" onClick={() => validate()&&makeBooking()} variant="outlined" size="medium">Confirm Booking</Button>
            </div>
          </div>


        </>
        }
    </div>
  )
}

export default ConfirmPayment
