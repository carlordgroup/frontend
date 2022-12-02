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

const ConfirmPayment = () => {

  let { id } = useParams();
  const [selectedCar, setSelectedCar] = useState()
  const [creditCardData, setCreditCardData] = useState()
  const [submit, setSubmit] = useState(false)
  const [config, setConfig] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [pickUp, setPickUp] = useState()
  const [dropOff, setDropOff] = useState()
  const [successful, setSuccessful] = useState()
  const token = useToken()
  const navigate = useNavigate();

  useEffect(() => {
    setConfig({
      headers: {
        'Authorization': "Bearer " + token
      }
    })
  }, [token])

  useEffect(() => {
    axios.get(`https://carlord.moki.cat/api/management/car/`,  config)
    .then(res => {
      setSelectedCar((res.data.filter(car => car.id === parseInt(id))[0]))
      console.log(res.data.filter(car => car.id === parseInt(id)))
    }).catch((error) => {
      console.log(error.response.data)
    })
  }, [config, id])

  useEffect(() => {
    axios.get(`https://carlord.moki.cat/api/card/`, config)
      .then(res => {
          console.log(res);
          setCreditCardData(res.data[0]);
      }).catch((error) => {
          console.log(error.response.data)
    })
  }, [config])

  useEffect(() => {
    if(submit && startDate && endDate && pickUp && dropOff){
      axios.post(`https://carlord.moki.cat/api/booking/`, JSON.stringify({
      booking_status: "Booked",
      deposit: "100",
      end_at: "December 9, 2022",
      exceed_rate: "70",
      fuel_level_at_begin: "80",
      fuel_level_at_end: "20",
      mileage_begin: "23000",
      mileage_end: "25000",
      rate: "50",
      return_car_at: dropOff,
      start_at: pickUp,
      car_id: parseInt(id),
      card_id: 1,
      start_time: parseInt(new Date(startDate.$y, startDate.$M, startDate.$D).getTime()/1000),
      end_time: parseInt(new Date(endDate.$y, endDate.$M, endDate.$D).getTime()/1000)
      }), config)
        .then(res => {
          console.log(res);
          if(res.status === 201){
            setSuccessful(true)
          }
        }).catch((error) => {
          console.log(error.response.data)
      })
    }
  }, [config, startDate, endDate, submit, id, pickUp, dropOff])
  
  useEffect(() => {
    if(successful){
      navigate('/bookings')
    }
  }, [successful, navigate])

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
                <h2 className="creditCardSpacing">Credit Card</h2>
                <div>
                  <Button variant="outlined" size="medium"><Link to='/account' className="editCard">Edit</Link></Button>
                </div>
              </div>
              <p>Cardholder Name: {creditCardData ? creditCardData.cardholder_name : ""}</p>
              <p>Credit Card Number: {creditCardData ? creditCardData.number : ""}</p>
              <p>Expiry Date: {creditCardData ? creditCardData.valid_until : ""}</p>
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
            <div className="confirmBookingFields">
              <TextField
                required
                id="address"
                label="Pickup Location"
                type="address"
                value={pickUp}
                onChange={(e) => setPickUp(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
              />
            </div>
            <div className="confirmBookingFields">
              <TextField
                required
                id="address"
                label="Dropoff Location"
                type="address"
                value={dropOff}
                onChange={(e) => setDropOff(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
              />
            </div>
            <div className="confirmBookingFields">
              <Button className="confirmBookingButton" onClick={() => {setSubmit(true); console.log(startDate.$y + "-" + startDate.$M + "-" + startDate.$D); console.log(endDate)}} variant="outlined" size="medium">Confirm Booking</Button>
            </div>
          </div>
        </>
        }
    </div>
  )
}

export default ConfirmPayment